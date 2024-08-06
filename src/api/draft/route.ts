import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { NotFound, errorResponse } from "../error-helper";

export async function GET(request: NextRequest) {
    const site = request.nextUrl.searchParams.get("site");
    const uri = request.nextUrl.searchParams.get("uri");
    const token = request.nextUrl.searchParams.get("token");
    const previewToken = request.nextUrl.searchParams.get("x-craft-live-preview");

    if (!uri || !site) {
        return errorResponse(NotFound);
    }

    const lang = site;

    if (!lang) {
        return errorResponse(NotFound);
    }

    // create draft preview if available, otherwise the live content will be displayed
    let preview;

    if (token && previewToken) {
        preview = {
            "x-craft-token": token,
            "x-craft-live-preview": previewToken,
        };
    }

    /* CRAFT_COMMENT_IN Needs generated types -> comment in when used in real project
    // check if the requested entry behind the url and site setting really exists
    const page = await checkEntryExists(lang, uri, preview);

    // if there is no result bail out
    if (!page.data?.entry?.title) {
        return errorResponse(NotFound);
    }
    */

    // check if it´s the home entry, it´s uri is __home__
    // create preview target url
    let previewTarget;
    if (uri == "__home__") {
        previewTarget = `/${site}`;
    } else {
        previewTarget = `/${site}/${uri}`;
    }

    // if we have a draft target, append draft tokens
    if (preview) {
        previewTarget = `${previewTarget}?token=${token}&x-craft-live-preview=${preview}`;
    }

    // enable next 14 draft mode, sets a cookie so next js cache is bypassed
    draftMode().enable();

    redirect(previewTarget);
}
