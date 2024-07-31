/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    trailingSlash: true,
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    poweredByHeader: false,

    // Configure image domains for next/image here
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: "https",
    //             hostname: "IMAGE_DOMAIN",
    //         },
    //     ],
    // },

    redirects: async () => {
        // Can't import from config, because next.config has to be a .mjs file
        const DEFAULT_LOCALE = "/de";
        return [
            {
                source: "/",
                destination: DEFAULT_LOCALE,
                permanent: false,
            },
        ];
    },

    // If using a custom cache handler, set the path here
    // cacheHandler: process.env.NODE_ENV === "production" ? "cache-handler.mjs" : undefined,

    // https://www.highlight.io/blog/lw5-next-js-server-sourcemaps
    // at least server-side sourcemaps should always be available for debugging purposes
    webpack: (config, { dev, isServer }) => {
        if (!dev && isServer) {
            config.devtool = "source-map";
        }
        return config;
    },
};

export default nextConfig;