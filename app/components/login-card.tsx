import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const LoginCard = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const LOGIN_API_URL = "http://localhost:8080/api/v1/user/login";
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!username || !password) {
        setError('Please enter both username and password.');
      } else {
        setError("");
        try {
            const response = await fetch(LOGIN_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const res = await response.json();
            if (res.status !== 200) {
                setError(res.message)
            }

            sessionStorage.setItem('userId', res.userId);
            console.log(sessionStorage.getItem('userId'));
            router.push("/home");
        } catch (error) {
            console.error(error);
        }
      }
      
        
    }
    

    return (
        <div className="w-96 rounded-[20px] overflow-hidden shadow-lg bg-pink-200">
            <div className="px-6 py-4">
                <div className="flex w-full justify-center p-2">
                    <img className="rounded-full max-h-40"src="https://kpopping.com/documents/35/1/1440/211019-ITZY-Instagram-Update-Yeji-documents-3.jpeg?v=c7f9c"></img>
                </div>
                
                <form>
                    
                    <div className="py-2 font-bold">Username</div>
                    <div className="w-full">
                        <input className="p-2 rounded-md w-full" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="py-2 font-bold">Password</div>
                    <div className="w-full">
                        <input className="p-2 rounded-md w-full" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="max-w w-full pt-1 pb-1 flex justify-start">
                        <span className="text-red-500">
                            {error}
                        </span>
                        
                    </div>
                    <div className="w-full pt-5 pb-1 ">
                        <button className="rounded-md bg-black w-full h-10 text-white hover:bg-gray-800" onClick={handleLogin}>Login</button>
                    </div>
                    <div className="flex justify-end w-full pt-3 pb-1 ">
                        <Link className="hover:underline" href="https://google.com">Don&apos;t have an account?</Link>
                    </div>

                </form>
                {/* <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                    <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div> */}
            </div>
            
        </div>
        
    )
}


export default LoginCard;