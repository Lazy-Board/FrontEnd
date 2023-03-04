import { useNavigate } from "react-router-dom";
import { api } from "../../atom/signin";

export const Logout = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("RefreshToken");
  if (accessToken && refreshToken) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("RefreshToken");
    api
      .post("user/logout")
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    navigate("/login");
  }
};
