'use client'

import { useRouter } from "next/navigation";
import LoginCard from "../components/login-card";
import { useEffect } from "react";


const Login = () => {
    const router = useRouter();
    useEffect(() => {
        if (sessionStorage.getItem("userId") !== null) {
            router.push("/home")
        } 
    }, [])
 
    return (
        <div className="flex justify-center items-center w-full h-full">
            <LoginCard />
        </div>
    )
}

export default Login;
