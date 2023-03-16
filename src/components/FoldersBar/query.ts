import { DirEnt } from "@webcontainer/api";
import { getWebContainerInstance } from "../../lib/webContainer";

export async function openFile(fileName: string) {
  const webContainer = await getWebContainerInstance();
  try{
    const code = await webContainer.fs.readFile(fileName, 'utf8');
    console.log(code);
    const extension = fileName.split('.').pop();
    const name = fileName.split('/').pop() as string;
    return {
      code: code.replace(/^\n/, ""),
      extension,
      name,
      completePath: fileName,
    };
  }catch(err) {
    console.log(err)
  }
}

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

