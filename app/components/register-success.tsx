import { useEffect, useState } from "react";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link";

const RegisterSuccess = () => {
    useEffect(() => {
        
    })

    return (
        <div className="login-register-main-card">
            
            <div className="register-success-top-section">
                <div className="register-success-top-inner">
                    <span className="flex justify-center text-white text-5xl mt-5">
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className="text-white mt-9 font-bold text-2xl">
                        Registration Successful!
                    </span>
                </div>
                
            </div>
            <div className="register-success-bottom-section">
                <div className="register-success-bot-inner">
                    <span className="register-success-message">Congratulations! Your registration is successful.</span>
                    <button className="login-register-button">
                        <Link href="/login">
                            Back to Login
                        </Link>
                    </button>
                </div>
               

                
            </div>
        </div>
    )
}

export default RegisterSuccess;