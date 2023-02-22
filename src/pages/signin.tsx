import google from "../assets/google.png";
import {
  accessTokenState,
  authTokenState,
  refreshTokenState,
} from "../atom/auth";
import { useRecoilState } from "recoil";
import { FormEvent, useState } from "react";
import { API_URL } from "../API/API";
import axios from "axios";
import { instance } from "../atom/signin";
import api from "./refresh";

const Signin = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useRecoilState(authTokenState);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);
  // const [time, setTime] = useRecoilState(timeState);

  const onLoginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        userEmail: userEmail,
        password: password,
      });
      setToken(response.data.token);
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      // setTime(response.data.expiredTime);
      localStorage.setItem("token", token);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("RefreshToken", refreshToken);
    } catch (err: any) {
      if (err.response.status === 400) {
        alert(err.response.msg);
      }
    }

    const onRefreshHandler = async () => {
      try {
        const response = await axios.post(`${API_URL}/user/reissue`, {
          refreshToken,
        });

        setAccessToken(response.data.accessToken);
      } catch (err: any) {
        console.log(err);
      }
    };
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const todolist = async () => {
    try {
      await api.post(
        "/todolist/write",
        {
          content: "1234",
        },
        {
          headers: headers,
        }
      );
    } catch (err: any) {}
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-1/3 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 h-screen">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 my-24">
          <span className="items-center mb-16 text-2xl font-semibold text-gray-900 dark:text-white">
            로그인
          </span>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={onLoginHandler}
          >
            <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white text-left">
              이메일
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@email.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <div>
              <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white text-left">
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              로그인
            </button>
            <div className="divider">간편 로그인</div>
            <div className="flex justify-center">
              <img src={google} />
            </div>
            <div className="flex justify-center text-gray-400">
              <span className="mr-4">회원가입</span>
              <span>|</span>
              <span className="ml-4">비밀번호 찾기</span>
            </div>
          </form>
        </div>
        <button onClick={todolist} className="btn">
          todo
        </button>
        {/* <button onClick={refresh} className="btn">
          리프레시
        </button> */}
      </div>
    </div>
  );
};

export default Signin;
