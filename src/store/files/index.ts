import { createStore } from "jotai";
import { atom } from "jotai/vanilla";
import { initialCode } from "../../components/File/utils";

export type File = {
  name: string;
  code: string;
  current: boolean;
}
export const filesStore = createStore();

export const filesAtom = atom<File[]>([{
  name: "index.js",
  code: initialCode,
  current: true,
}]);

