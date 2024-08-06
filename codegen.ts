import { CodegenConfig } from "@graphql-codegen/cli";

const headers = {
    Authorization: "Bearer INSERT_CRAFT_GQL_TOKEN_HERE",
};

// Local codegen only works inside the DDEV container
const schemaLocal = {
    "https://LOCAL_CRAFT_BASE_URL/graphql/api": { headers },
};

const schemaRemote = {
    "https://REMOTE_CRAFT_BASE_URL/graphql/api": { headers },
};

export function createCodegenConfig(local: boolean): CodegenConfig {
    return {
        schema: local ? schemaLocal : schemaRemote,
        documents: ["src/**/*.ts"],
        ignoreNoDocuments: true, // for better experience with the watcher
        generates: {
            "./src/network/gql-generated/": {
                preset: "client",
                presetConfig: {
                    fragmentMasking: false,
                },
            },
        },
    };
}

export default createCodegenConfig(false);
