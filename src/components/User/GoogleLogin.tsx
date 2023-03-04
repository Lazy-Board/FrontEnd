import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { api } from "../../atom/signin";

export interface body {
  name: string;
  nickName: string;
  oauthId: string;
}

export default async function GoogleLogin(
  authCode: string,
  navigate: NavigateFunction
) {
  console.log(authCode);
  try {
    await api
      .post(
        // `user/login/oauth2/?code=${authCode}`
        `/user/login/oauth2/code/google?code=${authCode}`
        // `user/login/oauth2/${loginType}?code=${authCode}`
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        navigate("/");
      });
  } catch (err) {
    const { response } = err as unknown as AxiosError;
    console.log({ response });
    if (response) {
      const { name, oauthId } = response.data as body;
      localStorage.setItem("token", oauthId);
      navigate("/user/login/google");
    }
  }
}
