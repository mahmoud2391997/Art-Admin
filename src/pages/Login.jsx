import React from "react";
import { replace, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Input, Typography } from "@material-tailwind/react";
import MainButton from "../components/button/MainButton";
import axios from "axios";


export default function Login() {
  const navigate = useNavigate();
  async function loginAuthentication(email, password) {
    
    await axios
    .post(`https://art-ecommerce-server.glitch.me/admin/auth/login`, {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response.data);
      sessionStorage.setItem("token", response.data.token);
        navigate("/home",{ replace:true});
        
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const schema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      )
      .required("Email is required"),
    password: yup
      .string()
      .required("Password name is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    loginAuthentication( data.email,
          data.password,);

    // loginAuthentication(
    //   data.email,
    //   data.password,
    //   //   data.rememberMe,
    //   navigate
    //   //   location
    // );
    console.log(data);
  };
  return (
    <div className="text-[var(--main-font)] flex flex-col gap-[10%] lg:gap-10 justify-center items-center h-[100vh] w-[100%] py-auto lg:py-[5%] ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:justify-center  gap-2 lg:gap-5 w-[30%] lg:h-[100%]"
      >
        <div className="flex flex-col gap-2">
          <Input
            variant="standard"
            label="Email"
            type="text"
            placeholder="Please Enter Your Email ..."
            {...register("email")}
          />
          {errors.email && (
            <Typography className="pl-2 text-red-500 text-sm">
              {errors.email.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Input
            variant="standard"
            label="Password"
            type="password"
            placeholder="Please Enter Your Password ..."
            {...register("password")}
          />
          {errors.password && (
            <Typography className="pl-2 text-red-500 text-sm">
              {errors.password.message}
            </Typography>
          )}
        </div>

        <Button
          type="submit"
          className="self-center lg:self-end w-fit p-0 bg-transparent shadow-none hover:shadow-none"
        >
          <MainButton title={"log in"} />
        </Button>
      </form>
    </div>
  );
}