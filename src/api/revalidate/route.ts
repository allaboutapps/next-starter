import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { NoToken, NotFound, Unauthorized, errorResponse } from "../error-helper";
import * as _ from "lodash";
import { getHostSettings } from "@/hostSettings";

const revalidate = (pathWithoutTrailingSlash: string) => {
    console.log("revalidate path: " + pathWithoutTrailingSlash);
    revalidatePath(pathWithoutTrailingSlash);

    const pathWithTrailingSlash = pathWithoutTrailingSlash + "/";

    console.log("revalidate path: " + pathWithTrailingSlash);
    revalidatePath(pathWithTrailingSlash);
};

export async function GET(request: NextRequest) {
    const hostSettings = getHostSettings();

    const site = request.nextUrl.searchParams.get("site");
    const uri = request.nextUrl.searchParams.get("uri");

    if (!site || !uri) {
        return errorResponse(NotFound);
    }

    const lang = site;

    if (!lang) {
        return errorResponse(NotFound);
    }

    const authorizationHeader = request.headers.get("Authorization")?.split(" ").at(1);

    // If no token was defined -> disable revalidation
    if (!hostSettings?.revalidationAccessToken) {
        console.log("no REVALIDATION_TOKEN defined");
        return errorResponse(NoToken);
    }

    if (authorizationHeader !== hostSettings?.revalidationAccessToken) {
        return errorResponse(Unauthorized);
    }

    const trimmedSite = _.trim(site, "/");
    const trimmedUri = _.trim(uri, "/");

    const pathWithoutTrailingSlash = `/${trimmedSite}/${trimmedUri}`;
    revalidate(pathWithoutTrailingSlash);

    return Response.json({
        revalidated: true,
        now: Date.now(),
    });
}
