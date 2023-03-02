export function removeTrashOutput(data: string) {
  if(data === 'G' || data === 'A' || data === '?25h' || data === "?25l" || data.includes("Pre-bundling them") ) return;
  return data;
}


