"use client";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { authSocial } from "@/services/api/auth";
import { setAccessToken } from "@/utils/api";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "../route";

const GoogleLoginButton = () => {
  const router = useRouter();

  const handleLogin = async (response: CredentialResponse) => {
    const { data } = await authSocial(response.credential);
    setAccessToken(data?.token);
    router.push(ROUTE_PATHS.ROOT);
  };

  return <GoogleLogin onSuccess={handleLogin} />;
};

export default GoogleLoginButton;
