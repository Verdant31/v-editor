import { DirEnt } from "@webcontainer/api";
import { getWebContainerInstance } from "../../lib/webContainer";

export async function openFile(fileName: string) {
  const webContainer = await getWebContainerInstance();
  try{
    const code = await webContainer.fs.readFile(fileName, 'utf8');
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
  res.push({
    name: 'root',
    dirs: rootFiles,
  })
  return res;
}

export async function createFile(name: string, content: string) {
  const webContainer = await getWebContainerInstance();
  return webContainer.fs.writeFile(name, content);
}

export async function renameFile(name: string, newName: string) {
  const webContainer = await getWebContainerInstance();
  const targetFileContent = await webContainer.fs.readFile(name, 'utf8');
  await webContainer.fs.rm(name).then(async () => {
    await webContainer.fs.writeFile(newName, targetFileContent).then(() => {
    });
  })
}

export async function renameFolder(name: string, newName: string, refetch: () => void) {
  const webContainer = await getWebContainerInstance();
  const pathWihoutName = name.split('/').slice(0, -1).join('/');
  const formattedNewName = pathWihoutName.length === 0 ? newName : pathWihoutName + '/' + newName;
  await webContainer.spawn('mv', [name, formattedNewName]).then(() => {
    setTimeout(() => refetch(), 200)
  })
}

export async function deleteFolder(name: string, refetch: () => void) {
  const webContainer = await getWebContainerInstance();
  await webContainer.spawn('rm', ['-rf', name]).then(() => {
    setTimeout(() => refetch(), 200)
  })
}

export async function createFolder(name: string, refetch: () => void) {
  const webContainer = await getWebContainerInstance();
  await webContainer.fs.mkdir(name).then(() => {
    setTimeout(() => refetch(), 200)
  });
}