import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { DEFAULT_LIMIT } from "@/constants";
import { getQueryClient, trpc } from "@/trpc/server";

import { LibraryView } from "@/modules/library/ui/views/library-views";

const Page = () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.library.getMany.infiniteQueryOptions({
        limit: DEFAULT_LIMIT,
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LibraryView />
        </HydrationBoundary>
    );
};

export default Page;
