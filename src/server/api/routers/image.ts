import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const imageRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ from: z.number(), count: z.number() }))
    .query(async (req) => {
      return req.ctx.prisma.image
        .findMany({
          take: req.input.count,
          skip: req.input.from,
        })
        .then((images) => {
          return { images };
        });
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (req) => {
      return req.ctx.prisma.image.findUnique({
        where: {
          id: req.input.id,
        },
      });
    }),
  addRequest: publicProcedure
    .input(z.object({ request: z.string(), id: z.string() }))
    .mutation((req) => {
      return req.ctx.prisma.image.update({
        where: { id: req.input.id },
        data: {
          requestedEdits: {
            create: {
              request: req.input.request,
            },
          },
        },
      });
    }),
});

export default imageRouter;
