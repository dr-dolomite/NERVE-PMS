"use client";

import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const Social = () => {

  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
    <div className="mt-4">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => onClick("google")}
      >
        Login with Google
      </Button>
    </div>
  )
}

export default Social