import { File } from ".";

interface fetchAndUpdateFileProps {
  files: File[];
  setFile: React.Dispatch<React.SetStateAction<File[]>>;
  code: string;
  fileName: string;
}

export const fetchAndUpdateFile = ({ 
  files,
  setFile,
  code,
  fileName,
} : fetchAndUpdateFileProps) => {
  const targetFile = files.find((file) => file.name === fileName);
  if(targetFile) {
    setFile((state) => state.map((file) => {
      if(file.name === 'index.js') return {
        ...file,
        code,
      }
      return file
      }))
    return
  }
  setFile((state) => [...state, {
    name: 'index.js',
    code,
    current: true,
  }])
}