import Login from "./Login";

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
      <div className={styles.login_container}>
        <Login toggleLogin={toggleLogin} />
      </div>
    )
  }