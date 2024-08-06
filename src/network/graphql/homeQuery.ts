export const homeQuery = /* GraphQL */ `
    query Home($site: [String]) {
        entry(section: "home", site: $site) {
            title
        }
    }
`;
