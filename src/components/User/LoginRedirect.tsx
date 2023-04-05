import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
// import axios, { AxiosError } from "axios";
// import { useForm } from "react-hook-form";
// import { inputStyle } from "../../components/spaceRent/register/style";

import GoogleLogin from "./GoogleLogin";
// import { getCookie, setCookie } from "../../components/login/cookie";
// import { useCookies } from "react-cookie";

interface formData {
  name: string;
  nickName: string;
  phone: string;
}
export default function LoginRedirect() {
  const location = useLocation();
  const [param] = useSearchParams();
  const authCode = param.get("code");
  const navigate = useNavigate();

  console.log(authCode);
  useEffect(() => {
    console.log(location);
    if (location.pathname === "/user/login/google") {
      GoogleLogin(authCode as string, navigate);
      console.log(authCode);
    }
  }, []);
  return <div></div>;
}
