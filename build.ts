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
  const paths = await allFilesNames("src");
  const cate = paths.filter((m) => /^src\\[^\\]+$/.test(m)).map((m) =>
    /[^\\]+$/.exec(m)?.toString()
  );
  const list = paths.filter((m) => /^src\\[^\\]+\\[^\\]+$/.test(m)).map(
    (m) => ({
      path: m,
      name: m.replace(/^src\\[^\\]+\\/, ""),
    }),
  );
  // console.log(cate, list);

  console.log(await writeJson("./cate.json", { cate, list }));
}

build();
