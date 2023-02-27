import { atom, selector } from "recoil";
import { api } from "./signin";

export interface ITodoTypes {
  id: number;
  contents: string;
}

export const inputState = atom<string>({
  key: "inputState",

  default: "",
});
export const todoSelector = selector({
  key: "getNewsSelector",
  get: async ({ get }) => {
    const response = await api.get(`/todolist/search`);
    return response.data;
  },
});

export const todosState = atom<ITodoTypes[]>({
  key: "todos",

  default: todoSelector,
});
