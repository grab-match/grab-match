import Image from "next/image";

import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./signin-button";

export function SignInPageView() {
  return (
    <GoogleOAuthProvider clientId={process.env.AUTH_GOOGLE_ID || ""}>
      <div className="flex flex-col justify-center">
        <Image
          alt="Login"
          src="/images/illustration-primary.svg"
          width={500}
          height={500}
          className="mx-auto"
        />

        <div className="mx-auto flex flex-col justify-center">
          <p className="text-center text-white font-bold text-[36px] mb-[36px]">
            GrabMatch
          </p>

          <div className="flex justify-center">
            <GoogleLoginButton />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
