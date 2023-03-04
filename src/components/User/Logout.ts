import { api } from "../../atom/signin";

export const Logout = async () => {
  api.post("user/logout");
};
