import { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "@/trpc/routers/_app";

export type ProductsGetManyQoutput = inferRouterOutputs<AppRouter>["products"]["getMany"];