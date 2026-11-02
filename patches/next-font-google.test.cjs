const assert = require("node:assert/strict");
const path = require("node:path");

const fontDirectory = path.resolve(
  __dirname,
  "../packages/web/node_modules/next/dist/compiled/@next/font/dist/google",
);
const cssFetcher = require(
  path.join(fontDirectory, "fetch-css-from-google-fonts.js"),
);
const fontFetcher = require(path.join(fontDirectory, "fetch-font-file.js"));
const loadFont = require(path.join(fontDirectory, "loader.js")).default;

const cases = [
  ["https://fonts.gstatic.com/l/font?kit=a=b&skey=c&v=v20", "woff2", "woff2"],
  ["https://fonts.gstatic.com/l/font?kit=a%2Bb&skey=c", "woff", "woff"],
  ["https://fonts.gstatic.com/l/font", "truetype", "ttf"],
  ["https://fonts.gstatic.com/l/font", "opentype", "otf"],
  ["https://fonts.gstatic.com/l/font", "embedded-opentype", "eot"],
  ["https://fonts.gstatic.com/l/font", undefined, "woff2"],
  ["https://fonts.gstatic.com/l/font", "unknown", "woff2"],
  ["https://fonts.gstatic.com/s/font.ttf?kit=a&v=1#font", "woff2", "ttf"],
  ["https://fonts.gstatic.com/l/font?kit=a.woff", "woff2", "woff2"],
  ["https://fonts.gstatic.com/s/font.woff2", "woff2", "woff2"],
];

async function main() {
  for (const [url, format, expectedExtension] of cases) {
    const formatHint = format ? `format('${format}')` : "";
    const css = `/* latin */\n@font-face {\n  font-family: 'Raleway';\n  src: url(${url}) ${formatHint};\n}`;
    let cssFetches = 0;
    let fontFetches = 0;
    cssFetcher.fetchCSSFromGoogleFonts = async () => {
      cssFetches += 1;
      return css;
    };
    fontFetcher.fetchFontFile = async requestedUrl => {
      assert.equal(requestedUrl, url);
      fontFetches += 1;
      return Buffer.from("font fixture");
    };

    // Next invokes the loader for both the server and client. Check both
    // outputs and ensure the original URL remains intact when downloading.
    for (const isServer of [true, false]) {
      const emitted = [];
      const result = await loadFont({
        functionName: "Raleway",
        data: [
          {
            subsets: ["latin"],
            weight: ["700", "800"],
            variable: "--next-font-family-raleway",
          },
        ],
        isDev: false,
        isServer,
        emitFontFile(buffer, extension, preload) {
          assert.equal(buffer.toString(), "font fixture");
          assert.equal(extension, expectedExtension);
          assert.equal(preload, true);
          const localUrl = `/_next/static/media/fixture.${extension}`;
          emitted.push(localUrl);
          return localUrl;
        },
      });
      assert.equal(emitted.length, 1);
      assert.ok(result.css.includes(emitted[0]));
      assert.ok(!result.css.includes(url));
      assert.equal(result.variable, "--next-font-family-raleway");
    }
    assert.equal(cssFetches, 1);
    assert.equal(fontFetches, 1);
  }
  console.log(
    `PASS: ${cases.length} URL/format cases, server and client loaders`,
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
