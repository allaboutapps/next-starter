import { CraftPreview } from "@/util/craft";
import { buildServerUrqlClient } from "../serverUrqlClient";

// import { checkEntryExistsQuery } from "./checkEntryExistsQuery";
// import { seoQuery } from "./seoQuery";
// import { graphql } from "../gql-generated/gql";

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
