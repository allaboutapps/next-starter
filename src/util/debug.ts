import * as config from "../config";

function nilLog(message?: any, ...optionalParams: any[]) {
    // pass
}

// For debugging purposes -> prefix message with "###", so they are easier to find in the console and to differentiate from other logs
function debugLog(message?: any, ...optionalParams: any[]) {
    console.log(`### ${message}`, ...optionalParams);
}

// debug.log can be toggled on/off via config.DEBUG
export const debug = {
    log: config.DEBUG ? debugLog : nilLog,
    error: config.DEBUG ? console.error.bind(console) : nilLog,
};
