export const getFolderColor = (folderName: string) => {
  switch(folderName) {
    case 'node_modules':
      return '#a3e635';
    case 'assets':
      return '#f5d60b';
    case 'src':
      return '#4ade80';
    case 'pages':
      return '#b91c1c';
    case 'public':
      return '#0284c7';
    default:
      return '#fff';
  }
}