import { IS_SERVER } from "@/config";
import { useDebugStore } from "../stores/debugStore";

// Hook that binds various debug commands to the window object
// Only use this in your top-level component e.g. App.tsx
export function useDebugCommands() {
    const enableDebug = useDebugStore((state) => state.enable);

    if (IS_SERVER) {
        return;
    }

    // Bind debug commands to window object
    // Use syntax debugXyz() when adding new commands
    (window as any).debugShowStringKeys = () => {
        // toggle showStringKeys query param
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        const showStringKeys = searchParams.get("showStringKeys");
        if (showStringKeys) {
            searchParams.delete("showStringKeys");
        } else {
            searchParams.set("showStringKeys", "true");
        }
        url.search = searchParams.toString();

        // Now navigate to new URL
        window.location.href = url.toString();
    };
    (window as any).debugEnable = enableDebug;
}
