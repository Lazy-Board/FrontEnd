import { accessTokenState, refreshTokenState } from "../atom/auth";
import { useRecoilState } from "recoil";
import { FormEvent, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../atom/signin";
import { GoogleAuth } from "../components/User/GoogleAuth";
import { VscLoading } from 'react-icons/vsc';
import { ErrorModal } from "../components/Modal/ErrorModal";
import styled from "styled-components";

const Save = styled.label`
    display:flex;
    justify-content:center;
    align-items:center;
    .load {
        margin-right:8px;
        animation: spin 1s linear infinite;
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
`

const Signin = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState('로그인');
  const navigate = useNavigate();

  const onLoginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading('로그인 중...')
      const response = await api.post("/user/login", {
        userEmail: userEmail,
        password: password,
      });
      setLoading('로그인 성공!')

      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      //   // setTime(response.data.expiredTime);

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      // navigate("/");

      if (response.data.moduleCode === true) {
        navigate("/");
      } else {
        navigate("/select-widget");
      }
      location.reload();
      //response.data.modulCode ? ture면 메인창 , false면 모듈 선택창 navigate//
    } catch (err: any) {
      setLoading('로그인')
      setError(err.response.data.msg);
    }
  };

  interface AuthResponse {
    accessToken: string;
    refreshToken: string;
  }
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await api.post<AuthResponse>("/user/reissue", {
            headers: {
              RefreshToken: `Bearer ${refreshToken}`,
            },
          });

          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          return api(originalRequest);
        } catch (e) {}
      }

      return Promise.reject(error);
    }
  );

  return (
    <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral h-screen">
        <div className="p-6 my-24">
          <h2 className="mt-8 title-font-only text-5xl text-center">lazier.</h2>
          <form
            className="mt-12 px-3"
            action="#"
            onSubmit={onLoginHandler}
          >
            <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-slate-100 text-left">
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

            <div className="mt-6">
              <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-slate-100 text-left">
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-8 mb-12 text-white btn btn-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:focus:ring-primary-800 disabled:bg-slate-300 disabled:bg-opacity-50 disabled:text-slate-400"
              disabled={loading === '로그인 중...' ? true : false}
            >
                <Save className="w-full cursor-pointer" >
                    {loading === '로그인 중...' && <VscLoading className="load"/>}
                    {loading}
                </Save>
            </button>
            <div className="divider text-sm">간편 로그인</div>
            <div className="flex justify-center">
              <a href={GoogleAuth} className="w-full p-3 mt-4 flex gap-4 items-center justify-center rounded-lg bg-white border border-slate-300 dark:border-slate-600 text-slate-800 font-medium hover:shadow-lg dark:hover:shadow-slate-700 transition-shadow">
                <img src='/images/googleIcon.png' className="w-6 h-6 object-contain"/>
                구글 아이디로 로그인
              </a>
            </div>
            <div className="mt-8 flex justify-center">
              <Link to="/signup">
                <span className="mr-4">회원가입</span>
              </Link>
              <span>|</span>
              <Link to="/find-password">
                <span className="ml-4">비밀번호 찾기 </span>
              </Link>
            </div>
          </form>
        </div>
        {error && (
          <ErrorModal
            title="Error"
            message={error}
            onClose={() => setError(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Signin;
