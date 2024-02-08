"use client"

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import axios from "axios";
import { FC, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["jwt"])

  const onSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(email === "" && password === "") {
      toast.error("Enter Email & Password to Sign In")
      return;
    }
    try {
      const { data } = await axios.post("/api/user/signin", {
        email,
        password
      })

      setCookies("jwt", data.token, {
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',
      })
      localStorage.setItem("userID", data.userID)
      toast.success("SignIn Successfull")
      window.location.pathname = "/"
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen container mx-auto pl-52 pr-52 flex w-full flex-col justify-center space-y-6">
      <div className="container pr-40 pl-40 flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
        <form onSubmit={onSignIn} className="text-left space-y-6">
          <div className="font-medium text-lg">
            <label htmlFor="">Email</label>
            <Input type="email" placeholder="eg:- xyz@random.com" onChange={(e) => setEmail(e.target.value)}  />
          </div>
          <div className="font-medium text-lg">
            <label htmlFor="">Password</label>
            <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
