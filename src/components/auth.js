import { useState } from "react";
import Login from "./Login";
import { login_container } from "./Login/style.module.css";

export function Auth(props){
    const [forgetPassword, setForgetPasswordState] = useState(false);
    const [signUp, setSignUpState] = useState(false);
  
    function openForgetPassword (){
      setForgetPasswordState(true)
    }
  
    function closeForgetPassword (){
      setForgetPasswordState(false)
    }
  
    function openSignUp (){
      setSignUpState(true)
    }
  
    function closeSignUp (){
      setSignUpState(false)
    }
  
    return(
      <div className={login_container}>
        <Login toggleLogin={props.toggleLogin} />
      </div>
    )
  }