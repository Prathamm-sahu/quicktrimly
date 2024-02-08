"use client"

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(firstName === "" && lastName === "" && email === "" && password === "" && confirmPassword === "") {
      toast.error("Enter your details to Sign Up")
      return;
    }

    if(password !== confirmPassword) {
      toast.error("Password do not match")
    }
    try {
      await axios.post("/api/user/signup", {
        firstName,
        lastName,
        email,
        password
      })

      toast.success("Sign Up Successfull! ")
      router.push("/signin")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen container mx-auto pl-52 pr-52 flex w-full flex-col justify-center space-y-6">
      <div className="container pr-40 pl-40 flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
        <form onSubmit={onSignUp} className="text-left space-y-6">
          <div className="font-medium text-lg">
            <label htmlFor="">First Name</label>
            <Input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="font-medium text-lg">
            <label htmlFor="">Last Name</label>
            <Input type="text" placeholder="Name" onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="font-medium text-lg">
            <label htmlFor="">Email</label>
            <Input type="email" placeholder="eg:- xyz@random.com" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="font-medium text-lg">
            <label htmlFor="">Password</label>
            <Input type="password" placeholder="Confirm Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="font-medium text-lg">
            <label htmlFor="">Confirm Password</label>
            <Input type="password" placeholder="Password" onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
