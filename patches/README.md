# Next.js Google font loader patch

`next@14.1.3.patch` backports the Webpack font URL handling from
[Next.js PR #100158](https://github.com/vercel/next.js/pull/100158).

Google Fonts can return extensionless `/l/font?kit=...` URLs. Next.js 14.1.3
assumes the URL ends in a font extension and throws
`TypeError: Cannot read properties of null (reading '1')` during production builds.
The patch obtains the extension from the URL pathname or the CSS `format(...)`
hint, with WOFF2 as the default for Next.js's Chrome user agent. Download URLs
and the existing Raleway family, weights, and CSS variable stay unchanged.

pnpm applies the patch during installation using the root `patchedDependencies`
configuration and `pnpm-lock.yaml`. Commit those files together with the patch.
`.gitattributes` keeps patch line endings consistent across Windows and Linux.
Builds still need network access to Google Fonts.

Run the offline regression check from the repository root:

```sh
node patches/next-font-google.test.cjs
```

The check exercises the installed production loader with extensionless URLs,
query strings, fragments, CSS format hints, and ordinary WOFF2 URLs. It verifies
server/client output and caching without depending on Google's current response.

The upstream fix is included in
[Next.js 16.4.3](https://github.com/vercel/next.js/releases/tag/v16.4.3).
Remove the patch when upgrading to a version with that fix, after running the
regression check and the application build.
