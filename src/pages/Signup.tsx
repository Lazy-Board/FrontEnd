import { FormEvent, useCallback, useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { api } from "../atom/signin";
import { useRecoilState } from "recoil";
import {
  emailState,
  passwordState,
  confirmpasswordState,
  usernameState,
  phonenumberState,
} from "../atom/signup";
import { Link, useNavigate } from "react-router-dom";
import { userIdatom } from "../atom/auth";
import { ErrorModal } from "../components/Modal/ErrorModal";
import EmailModal from "../components/Modal/EmailModal";

const Signup = () => {
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [confirmPassword, setConfirmPassword] =
    useRecoilState(confirmpasswordState);
  const [username, setUserName] = useRecoilState(usernameState);
  const [phonenumber, setPhonenumber] = useRecoilState(phonenumberState);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useRecoilState(userIdatom);
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [PasswordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [success, setSuccess] = useState<String | null>(null);

  const navigate = useNavigate();

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post(`/user/signup`, {
        userEmail: email,
        password: password,
        userName: username,
        phoneNumber: phonenumber,
      });
      localStorage.setItem("userId", response.data.userId);
      setUserId(response.data.userId);
      //이메일 인증 해달라고 알람 띄우기//
      setSuccess("이메일 인증을 진행해주세요!");
    } catch (err: any) {
      console.log(err);
      setError(err.response.data.msg);
    }
  };

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요 😅");
        setIsEmail(false);
      } else {
        setEmailMessage("올바른 이메일 형식이에요 😄");
        setIsEmail(true);
      }
    },[]);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage("영문 + 숫자 조합으로 8자리 이상 입력해주세요 😅");
        setIsPassword(false);
      } else {
        setPasswordMessage("안전한 비밀번호에요 😄");
        setIsPassword(true);
      }
    },
    []
  );

  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setConfirmPassword(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 😄");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요 😅");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  return (
    <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
      <div className="w-full relative bg-white shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral h-screen">
        <button className="absolute top-5 left-4" onClick={() => navigate(-1)}>
            <BsArrowLeftCircleFill size={30} color={"#00a7e9"} />
        </button>
        <div className="p-6 mt-24 text-center">
          <span className="items-center text-2xl font-semibold text-gray-900 dark:text-white">
            회원가입
          </span>
          <form
            className="mt-16 px-2"
            action="#"
            onSubmit={onSubmitHandler}
          >
            <div className="relative">
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
                onChange={onChangeEmail}
                required
                />
                {email.length > 0 && (
                <span
                    className={`absolute -bottom-6 left-0 right-0 text-sm ${
                    isEmail ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {emailMessage}
                </span>
                )}
            </div>
            
            
            <label className="block mt-9 mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
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

            <div className="relative">
                <label className="block mt-9 mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                비밀번호
                </label>
                <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={password}
                onChange={onChangePassword}
                />
                {password.length > 0 && (
                <span
                    className={`absolute -bottom-6 left-0 right-0 text-sm ${
                    isPassword ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {passwordMessage}
                </span>
                )}
            </div>
            
            <div className="relative">
                <label className="block mt-9 mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                비밀번호 확인
                </label>
                <input
                type="password"
                name="password"
                id="confirmpassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={confirmPassword}
                onChange={onChangePasswordConfirm}
                />
                {confirmPassword.length > 0 && (
                <span
                    className={`absolute -bottom-6 left-0 right-0 text-sm ${
                    isPasswordConfirm ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {PasswordConfirmMessage}
                </span>
                )}
            </div>
            
            <label className="block mt-9 mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
              전화번호
            </label>
            <input
              name="phonenumber"
              id="phonenumber"
              placeholder="010-0000-0000"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            <button
              type="submit"
              className="w-full mt-16 text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center font-bold disabled:bg-slate-300"
              disabled={!(isEmail && isPassword && isPasswordConfirm)}
            >
              다음
            </button>
          </form>
        </div>

        {error && (
          <ErrorModal
            title="Error"
            message={error}
            onClose={() => setError(null)}
          />
        )}
        {success && (
          <EmailModal
            message={success}
            onClose={() => setSuccess(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Signup;
