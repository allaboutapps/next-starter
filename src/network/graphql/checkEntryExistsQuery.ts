export const checkEntryExistsQuery = /* GraphQL */ `
    query CheckEntryExists($uri: [String], $site: [String]) {
        entry(uri: $uri, site: $site) {
            title
        }
    }
`;
