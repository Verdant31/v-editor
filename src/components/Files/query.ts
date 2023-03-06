import { DirEnt } from "@webcontainer/api";
import { getWebContainerInstance } from "../../lib/webContainer";

async function getDirectories(folder: DirEnt<string>) {
  const webContainer = await getWebContainerInstance();
  const result : any = {};

  const items = await webContainer.fs.readdir(folder.name, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      const subfolder = {
        isDirectory:() => true,
        isFile: () => false,
        name: `${folder.name}/${item.name}`,
      };
      result[item.name] = await getDirectories(subfolder);
    } else {
      result[item.name] = item;
    }
  }
  return result;
}

export async function getFiles() {
  const webContainer = await getWebContainerInstance();
  const folders = (await webContainer.fs.readdir('/', { withFileTypes: true })).filter((dir) => dir.isDirectory());
  const rootFiles = (await webContainer.fs.readdir('/', { withFileTypes: true })).filter((dir) => !dir.isDirectory());
  const res = await Promise.all(folders.map(async (folder) => ({name: folder.name, dirs: await getDirectories(folder)})))
  // res.push({
  //   name: 'root',
  //   dirs: rootFiles,
  // })
  return res;
}

