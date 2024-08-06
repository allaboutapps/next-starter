import { getHostSettings } from "../hostSettings";
import { locales } from "../i18n/locales";

export type CraftPreview = {
    "x-craft-token": string;
    "x-craft-live-preview": string;
};

/*
 * Build CraftPreview from search params
 */
export const getCraftPreviewParams = (searchParams?: {
    [key: string]: string | string[] | undefined;
}): CraftPreview | undefined => {
    const token = searchParams?.["token"];
    const preview = searchParams?.["x-craft-live-preview"];
    if (typeof token == "string" && typeof preview == "string") {
        return {
            "x-craft-token": token,
            "x-craft-live-preview": preview,
        };
    }
};

// /*
//  * Maps the query result of SEO Metadata to Next Metadata
//  */
// export const mapSEOData = (
//     queryResult: OperationResult<
//         SeoQuery,
//         {
//             uri: string;
//             site: string;
//         }
//     >,
// ) => {
//     let seoTitle: string = "";
//     let seoData: any = {};
//     let seoLinks: any = {};

//     try {
//         seoTitle = (JSON.parse(queryResult.data?.seomatic?.metaTitleContainer || "{}") as any)?.title?.title; // title is nested multiple times
//     } catch (e) {
//         console.error("Error parsing seoTitle, falling back to default", e);
//     }

//     try {
//         seoData = JSON.parse(queryResult.data?.seomatic?.metaTagContainer || "{}") as any;
//     } catch (e) {
//         console.error("Error parsing seoData, falling back to empty object", e);
//     }

//     try {
//         seoLinks = JSON.parse(queryResult.data?.seomatic?.metaLinkContainer || "{}") as any;
//     } catch (e) {
//         console.error("Error parsing seoLinks, falling back to empty object", e);
//     }

//     const openGraphTags = {} as any;
//     const twitterTags = {} as any;
//     const metaData = {} as any;
//     const verificationTags = {
//         other: {} as any,
//     } as any;
//     const alternates = {} as any;
//     const ogImage = {} as any;
//     const twitterImage = {} as any;

//     Object.keys(seoData).forEach((key) => {
//         if (key.indexOf("twitter:") > -1) {
//             // its a twitter meta tag
//             const twitterKey = key.split("twitter:")[1];
//             if (key.indexOf("twitter:image") > -1) {
//                 mapSEOImage(twitterImage, twitterKey, seoData[key].content);
//             } else {
//                 twitterTags[twitterKey] = seoData[key].content;
//             }
//         } else if (key.indexOf("og:") > -1) {
//             // its a open graph meta tag
//             const ogKey = key.split("og:")[1];
//             if (key.indexOf("og:image") > -1) {
//                 mapSEOImage(ogImage, ogKey, seoData[key].content);
//             } else {
//                 openGraphTags[ogKey] = seoData[key].content;
//             }
//         } else if (key.indexOf("-verification") > -1) {
//             // its a verification tag
//             verificationTags.other[key] = [seoData[key].content]; // we use nextJS "other" so we don´t have to assign each social media platform by hand
//         } else {
//             metaData[key] = seoData[key].content;
//         }
//     });

//     openGraphTags.images = [ogImage];
//     twitterTags.images = [twitterImage];

//     Object.keys(seoLinks).forEach((key) => {
//         if (key === "canonical") {
//             const href = seoLinks[key].href;
//             if (href) {
//                 alternates[key] = craftToNextAbsoluteUrl(href);
//             }
//         } else if (key === "alternate") {
//             const cmsAlternateList = seoLinks[key] as any[];
//             const languages = {} as any;
//             cmsAlternateList?.forEach((entry) => {
//                 const hrefLang = entry.hreflang;
//                 const href = entry.href;
//                 if (!!hrefLang && !!href) {
//                     languages[hrefLang] = craftToNextAbsoluteUrl(href);
//                 }
//             });
//             alternates["languages"] = languages;
//         }
//     });

//     return {
//         title: seoTitle,
//         twitter: twitterTags,
//         openGraph: openGraphTags,
//         verification: verificationTags,
//         alternates: alternates,
//         ...metaData,
//     };
// };

// const mapSEOImage = (image: any, key: string, content: string) => {
//     if (key === "image") {
//         image.url = content;
//     } else if (key === "image:width") {
//         image.width = content;
//     } else if (key === "image:height") {
//         image.height = content;
//     } else if (key === "image:alt") {
//         image.alt = content;
//     }
// };

export const craftToNextUrl = (url?: string | null) => {
    if (!url) {
        return url;
    }

    const craftBaseUrl = getHostSettings()?.craftBaseUrl;
    if (craftBaseUrl && url.indexOf(craftBaseUrl) > -1) {
        return url.replace(craftBaseUrl, "");
    }

    return url;
};

export const craftToNextAbsoluteUrl = (url?: string | null) => {
    if (!url) {
        return url;
    }

    const craftBaseUrl = getHostSettings()?.craftBaseUrl;
    const nextBaseUrl = getHostSettings()?.nextBaseUrl;
    if (craftBaseUrl && nextBaseUrl && url.indexOf(craftBaseUrl) > -1) {
        return url.replace(craftBaseUrl, nextBaseUrl);
    }

    return url;
};

// Converts absolute craft urls to relative urls
export const toRelativeUrl = (url: string) => {
    if (!url) {
        return url;
    }

    let found = false;
    for (const lang of locales) {
        if (url.includes(`allaboutapps.at/${lang}`) || url.includes(`waagner-biro-stage.com/${lang}`)) {
            found = true;
            break;
        }
    }

    // return, if url does not contain allaboutapps.at or waagner-biro-stage.com
    if (!found) {
        return url;
    }

    // Get rid of the base url if possible
    // Code below strips the base url from the url
    // "https://waagner-biro-craft-dev.allaboutapps.at/de/projects/the-salzburg-state-theater/"" ->
    // "/de/projects/the-salzburg-state-theater/"
    return url.startsWith("http") ? "/" + url.split("/").splice(3).join("/") : url;
};
