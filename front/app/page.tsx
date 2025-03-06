"use client";
import Dashboard from "./dashboard/page";
import Login from "./login/app";
import {
  userIsLogged,
} from "@/utils/api";

export default function Home() {
  const isLoggedIn = userIsLogged();

  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Login /> 
  } else {
    return <Dashboard />
  }
}
