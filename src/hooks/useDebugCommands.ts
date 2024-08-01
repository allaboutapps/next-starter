import { IS_SERVER } from "@/config";
import { useDebugStore } from "../stores/debugStore";

// Hook that binds various debug commands to the window object
// Only use this in your top-level component e.g. App.tsx/layout.tsx
export function useDebugCommands() {
    const enableDebug = useDebugStore((state) => state.enable);

    if (IS_SERVER) {
        return;
    }

    // Bind debug commands to window object
    // Use syntax debugXyz() when adding new commands
    (window as any).debugShowStringKeys = (enabled: boolean) => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        const showStringKeys = searchParams.get("showStringKeys");
        let changed = false;
        if (showStringKeys && !enabled) {
            searchParams.delete("showStringKeys");
            changed = true;
        }
        if (!showStringKeys && enabled) {
            searchParams.set("showStringKeys", "true");
            changed = true;
        }

        if (changed) {
            url.search = searchParams.toString();

            // Now navigate to new URL
            window.location.href = url.toString();
        }
    };
    (window as any).debugEnable = enableDebug;
    (window as any).debugHelp = () => {
        console.log("Available debug commands:");
        console.log("    debugShowStringKeys(enabled: boolean) - Show string keys instead of translations");
        console.log("    debugEnable(enabled: boolean) - Enable or disable debug mode");
    };
}
