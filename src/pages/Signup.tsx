import { FormEvent, useState } from "react";
import { AiFillLeftCircle } from "react-icons/ai";
import axios, { AxiosError } from "axios";
import { API_URL } from "../API/API";
import { atom, useRecoilState } from "recoil";
import {
  emailState,
  passwordState,
  confirmpasswordState,
  usernameState,
  nicknameState,
  phonenumberState,
} from "../atom/signup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [confirmPassword, setConfirmPassword] =
    useRecoilState(confirmpasswordState);
  const [username, setUserName] = useRecoilState(usernameState);
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [phonenumber, setPhonenumber] = useRecoilState(phonenumberState);
  const [error, setError] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/user/signUp`, {
        email,
        password,
        username,
        nickname,
        phonenumber,
      });
    } catch (err: any) {
      if (err) {
        const axiosError: any = err as AxiosError;
        setError(axiosError.response.data.message);
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 h-screen">
        <Link to="/">
          <AiFillLeftCircle className="mt-4 ml-4" size="2.5rem" />
        </Link>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 my-24">
          <span className="items-center mb-16 text-2xl font-semibold text-gray-900 dark:text-white">
            회원가입
          </span>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={onSubmitHandler}
          >
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
              이메일
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
              이름
            </label>
            <input
              type="id"
              name="id"
              id="id"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="김철수"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
              닉네임
            </label>
            <input
              type="id"
              name="id"
              id="id"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="김철수"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
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
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
              비밀번호 확인
            </label>
            <input
              type="password"
              name="password"
              id="confirmpassword"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center font-bold"
              disabled={isLoading}
            >
              시작하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
