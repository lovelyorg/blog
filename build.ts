import { walk } from "https://deno.land/std@0.74.0/fs/mod.ts";

async function allFilesNames(root: string) {
  const data = [];
  for await (const entry of walk(root)) {
    data.push(entry.path);
  }
  return data;
}

async function writeJson(path: string, data: unknown): Promise<string> {
  try {
    Deno.writeTextFileSync(path, JSON.stringify(data));
    return "Written to " + path + " SUCCESS";
  } catch (e) {
    return e.message;
  }
}

async function build() {
  const paths = await allFilesNames("src"); //
  const files = paths.filter((m) => /^src\\[^\\]+\\[^\\]+$/.test(m));
  const cates = new Map<string, string[]>();
  files.forEach((m) => {
    const cate = /^src\\[^\\]+/.exec(m)?.toString().replace(/^src\\/, "") || "";
    if (!cates.has(cate)) cates.set(cate, []);
    cates.get(cate)?.push(m);
  });
  const result = Array.from(cates).map((m) => ({ cate: m[0], list: m[1] }));

  // console.log(paths, cates, result);
  console.log(await writeJson("./cates.json", result));
}

build();
