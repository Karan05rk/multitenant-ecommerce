import { createTRPCRouter } from '../init';

import { authRouter } from '@/modules/auth/server/procedures';
import { categoryiesRouter } from '@/modules/categories/server/procedures';

export const appRouter = createTRPCRouter({
    auth: authRouter,
    categories: categoryiesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;