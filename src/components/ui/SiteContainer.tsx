export const SiteContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <main
            className="
                flex flex-col
                gap-2
                grow min-h-screen
                items-center
                p-24
            "
        >
            {children}
        </main>
    );
};
