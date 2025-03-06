"use client";
import { getUserProfile, userIsLogged } from "@/utils/api";
import Login from "../login/app";

export default function Dashboard() {
  const isLoggedIn = userIsLogged();
  const profile = getUserProfile();

  if (!isLoggedIn) {
    return <Login />;
  } else {
    return <div>Welcome {profile?.display_name}.</div>;
  }
}
