"use client"

import { signOut } from "@/auth";


const LogoutButton = () => {
    const handleClick = async () => {
        await signOut({
            redirectTo: "/login",
        });
    };
  return (
    <button onClick={handleClick}>Cerrar Sesion</button>
  )
}
export default LogoutButton