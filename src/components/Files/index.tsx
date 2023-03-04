import { useQuery } from "react-query";
import { getFiles } from "./query";

export function FoldersBar() {
  const { data } = useQuery('getFilesNames', async () => await getFiles())

  return (
    <div className="h-[100vh] w-56 bg-[#151518]">

    </div>
  )
}
