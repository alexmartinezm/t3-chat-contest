import { desc } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schemas/app.schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db
        .insert(posts)
        .values({
          name: input.name,
        })
        .returning();

      return post;
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const [post] = await ctx.db
      .select()
      .from(posts)
      .orderBy((posts) => [desc(posts.createdAt)])
      .limit(1);

    if (!post) {
      return null;
    }

    return post;
  }),
});
