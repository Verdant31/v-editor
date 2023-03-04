import { getWebContainerInstance } from "../../lib/webContainer";

type File = {
  name: string;
  content: string;
}

export async function getFilesNames() {
  const webContainer = await getWebContainerInstance()
  const ls = await webContainer.spawn('ls')
  let files = ''
  ls.output.pipeTo(
    new WritableStream({
      write(data) {
        files = data;
      },
    })
  );
  await ls.exit;
  return files.split(' ')
    .filter((fileName) => fileName !== '')
    .map((fileName) => fileName.trim())
    .filter((fileName) => fileName !== '')
}

export async function getFiles() {
  const webContainer = await getWebContainerInstance();

  const folders = (await webContainer.fs.readdir('/', {
    withFileTypes: true,
  })).filter((dir) => dir.isDirectory())

  const files = (await webContainer.fs.readdir('/', {
    withFileTypes: true,
  })).filter((dir) => !dir.isDirectory())

  console.log("Folders: ", folders);
  console.log("Files: ", files);
}