// Example query
export const seoQuery = /* GraphQL */ `
    query SEO($uri: String, $site: String) {
        seomatic(uri: $uri, asArray: true, site: $site) {
            metaTitleContainer
            metaTagContainer
            metaLinkContainer
            metaScriptContainer
            metaJsonLdContainer
            metaSiteVarsContainer
            frontendTemplateContainer
        }
    }
`;
