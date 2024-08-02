# allaboutapps `react-starter`

This is the [allaboutapps](https://allaboutapps.at/) TypeScript template for React NextJS applications.

## How to use this template
- run `npm_config_yes=true npx tiged github:allaboutapps/next-starter my-project-name` to scaffold a new app, where `my-project-name` is the name of the target folder where you want to create your project.
- change the "name" to your project name in `package.json`.
- run `git init` if you want to initialize a repository.
- run `yarn && yarn dev` to install packages and start the dev server
- You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Builds
- Builds are configured as `standalone` in next.config.mjs. SPA style builds (aka `output: "export"`) are not practical,
since dynamic routes without `generateStaticParams()` are not supported (see https://nextjs.org/docs/app/building-your-application/deploying/static-exports#unsupported-features). This limitation would not allow any detail sites like `product/[productId]` because those cannot be generated statically.
- Local production builds can be tested using `yarn build:local` and `yarn start:local`
- Support for aaa build pipeline using woodpecker CI is provided in .drone.yml
- Dockerfile ist provided and can be tested locally using `yarn docker:build` and `yarn docker:run`. The app is then reachable under [http://localhost:3000](http://localhost:3000)

## Env vars
- We don't use `NEXT_PUBLIC_` env vars on client side, because those are baked at build time. Since we only want to build a single
docker image we use a different approach by using server side env vars for configuration (currently only `RUNTIME_ENVIRONMENT`) 
and forwarding them to our client components. Use the global `publicEnvVars` variable to access the env vars on the client side.
- `RUNTIME_ENVIRONMENT`

## Build configuration
- Configure build variants `hostSettings.ts`. Put in public configs like api base urls directly. Secrets that 
are only used in react server components or API endpoints should not
be exposed and MUST be set via environment variables (do NOT forward those to the client using `publicEnvVars`).

## Git version
- When the project is built in woodpecker CI, the commit hash will automatically be inserted into the <head> as comment.

## Debug commands

### Debug string keys

When you have many strings in your application it can be hard for QA and translators to figure out which string key in your language file (e.g. en.json) is used for which on screen text.

For this you can open your browser console (CMD+ALT+i in Mac Chrome or CTRL+SHIFT+i in Windows Chrome), enter `debugShowStringKeys(true)` and then press RETURN. This will display the string keys additionally to the translated text. Toggle this off again by using `debugShowStringKeys(false)`.

### Other debug commands

You can add additional debug commands later in `useDebugCommands.ts`. To list all available debug commands use `debugHelp()` in the browser console.

## Icons

Icons are located and defined in `src/component/ui/Icon.tsx`.

To add new ones following steps are necessary:

- Copy SVG content
- Add content to path, set filename (Replace <svg> with a <g> if you want to set transformations for all child elements)
- Camel case the attributes inside the SVG

## Licenses
You can generate a file containing used third party licenses using `yarn license-check`. **CC-BY-4.0** is included because of NextJS including caniuse-lite which is using CC-BY-4.0. So the license file is mandatory for attribution. 
`yarn build` will automatically generate a license file.


