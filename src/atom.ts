import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark", //고유키값
  default: false, //기본값
});
