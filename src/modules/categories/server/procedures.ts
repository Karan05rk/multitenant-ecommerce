import { Category } from '@/payload-types';
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoryiesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async({ ctx }) => {

        const data = await ctx.db.find({
            collection: "categories", // Populate subcategories, subcategories.[0] will be a type of "Category"
            depth: 1,
            pagination: false,
            where: {
                parent: {
                    exists: false,
                },
            },
            sort: "name"
        });

        const formattedData = data.docs.map((doc) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                // Because of 'depth: 1' we are confident doc will be a type of "Category"
                ...(doc as Category),
                subcategories: undefined,
            }))
        }));

        return formattedData;
    }),
});
