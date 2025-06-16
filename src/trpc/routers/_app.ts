import { createTRPCRouter } from '../init';

import { authRouter } from '@/modules/auth/server/procedures';
import { tagsRouter } from '@/modules/tags/server/procedures';
import { productsRouter } from '@/modules/products/server/procedures';
import { categoryiesRouter } from '@/modules/categories/server/procedures';

export const appRouter = createTRPCRouter({
    auth: authRouter,
    tags: tagsRouter,
    products: productsRouter,
    categories: categoryiesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;