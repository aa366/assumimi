"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormFields from "./FormFields";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const isSignIn = type === "sign-in";
  const router = useRouter()

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    
    try{
       if (type == "sign-up"){
const {name , email , password} = values;
       const userCredentials = await createUserWithEmailAndPassword(auth,email,password) 
       const result = await signUp({
        uid:userCredentials.user.uid,
        name:name!,
        email:email,
        password:password
       })

       if (!result.success) {
        toast.error(result.message)
        return
       }

       toast.success("Account created successfully. Please sign in")
       router.push("/sign-in")
     }else{
        const {email,password}= values
        const userCredentials = await signInWithEmailAndPassword(auth,email,password)

        const idToken = await userCredentials.user.getIdToken()

        if (!idToken) {
          toast.error("Sign in failed")
          return ;
          
        }

        await signIn({
          email,idToken
        })

        toast.success("Sign in successfully")
        router.push("/")

     }
     

    }catch(error){
      console.error(error);
      
      toast.error(`There was an error : ${error}`)
    }
      

  }

  return (
    <div className=" card-border  lg:min-w-[556px] ">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image alt="Assummi" src={`/logo.svg`} width={32} height={32} />
          <h2 className="text-primary-100">Assumimi</h2>
        </div>
        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormFields
               name="name" 
               placeholder="Name" 
               control={form.control} label="Name"
                />
            )}

            <FormFields
               name="email" 
               placeholder="Email" 
               control={form.control} label="Email"
                />
            <FormFields
               name="password" 
               placeholder="Password" 
               control={form.control} label="Password"
               type="password"
                />
            <Button className="btn" type="submit">
              {isSignIn ? "Sign in" : "Create an Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "No Account yet? " : "Have an account already? "}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
