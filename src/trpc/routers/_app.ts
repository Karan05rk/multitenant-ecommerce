import { createTRPCRouter } from '../init';

import { authRouter } from '@/modules/auth/server/procedures';
import { tagsRouter } from '@/modules/tags/server/procedures';
import { reviewsRouter } from '@/modules/reviews/server/procedures';
import { tenantsRouter } from '@/modules/tenants/server/procedures';
import { libraryRouter } from '@/modules/library/server/procedures';
import { checkoutRouter } from '@/modules/checkout/server/procedures';
import { productsRouter } from '@/modules/products/server/procedures';
import { categoryiesRouter } from '@/modules/categories/server/procedures';

export const appRouter = createTRPCRouter({
    auth: authRouter,
    tags: tagsRouter,
    reviews: reviewsRouter,
    tenants: tenantsRouter,
    library: libraryRouter,
    checkout: checkoutRouter,
    products: productsRouter,
    categories: categoryiesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;