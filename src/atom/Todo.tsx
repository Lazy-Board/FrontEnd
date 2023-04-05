import { atom, selector } from "recoil";
import { api } from "./signin";

export interface ITodoTypes {
  id: number;
  content: string;
}

export const inputState = atom<string>({
  key: "inputState",

  default: "",
});

const data = async () => {
  const response = await api.get(`/todolist/search`);
  return response.data;
};
// export const todoSelector = selector<ITodoTypes[]>({
//   key: "getNewsSelector",
//   get: async ({ get }) => {
//     const response = await api.get(`/todolist/search`);
//     return response.data;
//   },
// });

export const todosState = atom<ITodoTypes[]>({
  key: "todos",
  default: data(),
});
