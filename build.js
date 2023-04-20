import fs from "fs";
import zlib from "zlib";
import ug from "uglify-js";

const NAME = "kiloman-showdown-network";

const text2gzip = async (text) =>
  new Promise((resolve, reject) => {
    zlib.gzip(text, { level: 9 }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

const gzip2base = async (gzip) => gzip.toString("base64");

const getPrice = (text) => {
  const freq = {};
  for (const c of text) {
    freq[c] = (freq[c] || 0) + 1;
  }

  const pq = Object.entries(freq).map(([char, freq]) => [freq, char]);
  while (pq.length > 1) {
    const [freq1, char1] = pq.shift();
    const [freq2, char2] = pq.shift();
    pq.push([freq1 + freq2, [char1, char2]]);
    pq.sort((a, b) => a[0] - b[0]);
  }
  const tree = pq[0][1];

  const codeMap = {};
  (function trav(node, code) {
    if (typeof node === "string") {
      return (codeMap[node] = code);
    }
    [0, 1].forEach((x) => trav(node[x], code + x));
  })(tree, "");

  return Object.keys(freq).sort(
    (a, b) => codeMap[b].length * freq[b] - codeMap[a].length * freq[a]
  );
};

const kb = (text) => Buffer.byteLength(text, "utf8") / 1024;
const load = (path) => fs.readFileSync(path, { encoding: "utf8" });

(async () => {
  const js = [
    load("./src/zzfx.js"),
    `const music = ${load("./src/music.js")};`,
    load("./src/player.js"),
  ].join("\n");
  const uglified = ug.minify(js, {
    mangle: {
      eval: true,
      toplevel: true,
    },
    toplevel: true,
    compress: {
      passes: 5,
      reduce_funcs: false,
      reduce_vars: false,
      // バグったらこの辺を疑う
      unsafe_Function: true,
      unsafe_math: true,
      unsafe_proto: true,
      unsafe_regexp: true,
      unsafe_undefined: true,
    },
    output: {
      beautify: false,
      ascii_only: true,
      shebang: false,
    },
  }).code;

  console.log(uglified);
  console.log(getPrice(uglified).join(" "));
  console.log("ORGN:", kb(uglified), "KB");

  // const safe = `<body>\n<script type="text/javascript">\n${
  //   ug.minify(js, {
  //     mangle: false,
  //     compress: false,
  //     output: { beautify: true },
  //   }).code
  // }\n</script>\n</body>`;
  // fs.writeFileSync(`./dist/${NAME}-source.html`, safe);
  // console.log("SAFE:", kb(safe), "KB", `${NAME}-source`);

  const gzip = await text2gzip(uglified);
  // fs.writeFileSync("./dist/gzip.ignore.gz", gzip);
  console.log("GZIP:", kb(gzip), "KB");

  const base = await gzip2base(gzip);
  // fs.writeFileSync("./dist/gzip.ignore.txt", base);
  console.log("BASE:", kb(base), "KB");

  const loader = `(async()=>new Response((await(await fetch('data:application/octet-stream;base64,${base}')).blob()).stream().pipeThrough(new DecompressionStream('gzip'))).text().then(eval))()`;
  const html = `<body onload="${loader}">`;
  fs.writeFileSync(`./dist/${NAME}.html`, html);
  console.log("LCAL:", kb(html), "KB", `${NAME}`);
})();
