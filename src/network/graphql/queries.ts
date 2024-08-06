import { CraftPreview } from "@/util/craft";
import { buildServerUrqlClient } from "../serverUrqlClient";

// This file contains all GQL queries used on the server side in RSC (React Server Components).
// Queries in client side components should be done using the "useQuery" hook from "@urql/next".
//
// Example:
// const [{ data, fetching, stale, error }] = useQuery({
//     query: graphql(productsQuery),
//     variables: {
//         site: locale,
//         limit: PAGINATION_LIMIT,
//         offset: pagination.offset,
//         productType: filters.filterCategories,
//     },
// });

/* CRAFT_COMMENT_IN
// import { checkEntryExistsQuery } from "./checkEntryExistsQuery";
// import { homeQuery } from "./homeQuery";
// import { seoQuery } from "./seoQuery";
// import { graphql } from "../gql-generated/gql";
*/

const getClient = ({ craftPreview }: { craftPreview?: CraftPreview } = {}) => {
    return buildServerUrqlClient({ craftPreview });
};

// Example query function. For this to work you need to generate the query types using "yarn gql"
export async function fetchSEOData(uri: string, lang: string, craftPreview?: CraftPreview) {
    return getClient({ craftPreview }); // .query(graphql(seoQuery), { uri, site: lang });
}

// Check if entry exists
export async function checkEntryExists(lang: string, uri: string, craftPreview?: CraftPreview) {
    return getClient({ craftPreview }); //.query(graphql(checkEntryExistsQuery), { uri, site: lang });
}

export async function fetchHome(lang: string, craftPreview?: CraftPreview) {
    return getClient({ craftPreview }); //.query(graphql(homeQuery), { site: lang });
}
