import { Category } from '@/payload-types';
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SearchFilters } from "./search-filters";

interface Props {
    children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
    const payload = await getPayload({
        config: configPromise,
    });

    const data = await payload.find({
        collection: "categories", // Populate subcategories, subcategories.[0] will be a type of "Category"
        depth: 1,
        pagination: false,
        where: {
            parent: {
                exists: false,
            },
        },
    });

    const formattedData = data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc: Category) => ({
            // Because of 'depth: 1' we are confident doc will be a type of "Category"
            ...(doc as Category),
            subcategories: undefined,
        }))
    }));

    console.log({
        data, 
        formattedData,
    });

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <SearchFilters data={formattedData} />
            <div className="flex-1 bg-[#F4F4F0]">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
