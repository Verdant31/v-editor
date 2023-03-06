import { SicssThree, Sijavascript, Sijson, Sireact, Sisvg, Sitypescript } from '@icons-pack/react-simple-icons';

export const getIconFromExtension = (name: string) => {
  const words = name.split('.');
  const extension = words[words.length - 1];

  switch(extension) {
    case 'js':
      return <Sijavascript style={{minWidth: 16, height: 16}} size={16} color="#fcdc00" />
    case 'mjs':
      return <Sijavascript style={{minWidth: 16, height: 16}} size={16} color="#fcdc00" />
    case 'map':
      return <Sijavascript style={{minWidth: 16, height: 16}} size={16} color="#fcdc00" />
    case 'tsx':
      return <Sireact style={{minWidth: 16, height: 16}} size={16} color="#61dafb" />
    case 'css': 
      return  <SicssThree style={{minWidth: 16, height: 16}} size={16} color="#0398e1" />
    case 'ts': 
      return <Sitypescript style={{minWidth: 16, height: 16}} size={16} color="#2f74c0" />
    case 'svg':
      return <Sisvg style={{minWidth: 16, height: 16}} size={16} color="#bea500"  />
    case 'json':
      return <Sijson style={{minWidth: 16, height: 16}} size={16} color="#fcdc00" />
  }
}