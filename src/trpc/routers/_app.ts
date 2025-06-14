import { createTRPCRouter } from '../init';

import { categoryiesRouter } from '@/modules/categories/server/procedures';

export const appRouter = createTRPCRouter({
    categories: categoryiesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;