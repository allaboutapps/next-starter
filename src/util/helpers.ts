export function sleep(timeMs: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeMs);
    });
}

// Remove duplicate slashes from URL, but keep double slashes in the protocol part
export function cleanupUrl(url: string) {
    // Regex to match the protocol (e.g., http://, https://, etc.)
    const urlPattern = /^([a-zA-Z][a-zA-Z\d+\-.]*:\/\/)/;

    // Find if the string starts with a valid URL scheme
    const match = url.match(urlPattern);

    // If there's a match, we keep the protocol part and process the rest
    if (match) {
        const protocol = match[0];
        const restOfString = url.slice(protocol.length);
        // Remove duplicate slashes in the rest of the string
        const cleanedRest = restOfString.replace(/\/+/g, "/");
        return protocol + cleanedRest;
    } else {
        // If there's no protocol, just remove duplicate slashes everywhere
        return url.replace(/\/+/g, "/");
    }
}
