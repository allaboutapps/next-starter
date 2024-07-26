import { notFound } from "next/navigation";

// Here's an explanation how NextJS 404 handling works.
// - If a page URL is not found, NextJS will render app/not-found.tsx
// - If that does not exist then it renders the default not found page
// - Having an app/not-found.tsx is not possible when we nest everything under [lang].
//   The reason ist that this would need a root layout.tsx outside of [lang] to wrap the not found page.
//   But you are only allowed to have one root layout in your app.
// - An app/not-found.tsx that only redirects to DEFAULT_LANG/not-found doesn't work. You still need a root layout.
// - So this is the solution -> catch all route that triggers notFound() which bubbles up the the neares not-found.tsx
export default function NotFoundRedirect() {
    return notFound();
}
