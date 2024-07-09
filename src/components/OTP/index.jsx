
import React, { useState, useEffect, useRef}  from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import img_logo from "../../../public/assets/logos/CC_Logo_no_bg.png";
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Adjusted width for responsiveness
  maxWidth: 500, // Maximum width for larger screens
  bgcolor: 'background.paper',
  borderRadius: '8px',
};
export default function OTP({next,  open, setOpen, type, setType, verifyEmailOTPFunc, verifynumberFunc, formState, setFormState, sendEmailOTPFunc,requestnumberFunc}) {
  
  //const {}= useSelector( state => state.Auth);
  //const {isVerified}= useSelector( state => state.Common)

  let MaxLength = 6;
  const  [password, setPassword] = useState(Array(MaxLength).fill(-1))
  const inpRefs = useRef(null);
  const [activeInput, setActiveInput] = useState(-1);
  //const [open, setOpen] = useState(true);
 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
//   const handleOption = (title) => {
// console.log(title)
//   }

//   const handleCodeChanges = ({target: {value}}, key) => {

//     const _code =  code;

//     _code[key] = value

//     setCode(_code)
// console.log('code', code)
//   }



  // useEffect(()=>{
  // if(isVerified){
  //   next();
  // }
  // }
  // , [isVerified])
  
  const handleKeyDown = (e, i)=>{
     if (e.key == "Backspace") {
       let pass = password
       pass[i] = -1
       setPassword(pass)  
       setActiveInput(i - 1)
       if (i != 0) {
         let nextInput = inpRefs?.current?.[i - 1]
         //@ts-ignore
         nextInput?.focus()
       } else {
          //@ts-ignore
          inpRefs?.current?.[i].blur()
       }
    }
  }
    const handleChange=(e, i)=>{
      // @ts-ignore
      //let v = e.nativeEvent["data"]
      const {value} = e.target;
      let pass = password
      //let value = parseInt(v)
      if (!isNaN(value)) {
        pass[i] = value
        setPassword(pass)
        setActiveInput(i + 1)
        
        // Once the input finishes it focuses button which is the next element in the form
        let nextInput = inpRefs?.current?.[i + 1]
        //@ts-ignore
        nextInput?.focus()
      }
                                  
  }
  
  const handleSubmit = () => {

    if(type =='Email Address'){
      console.log(formState.email, password.reduce((a,b) =>a+b))
      verifyEmailOTPFunc({email: formState?.email, otp: password?.reduce((a,b) =>a+b)})
    
     
      
    }else {
      verifynumberFunc(request_id,password.reduce((a,b) =>a+b))
     
      
    }
    
    
  }

  const handleResendOtp = () => {
    if(type == 'Email Address'){
      sendEmailOTPFunc({email: formState?.email})
    }else{
      requestnumberFunc({number: formState?.phone_number})
    }
    
  }

  return (
    <div> 
      <Modal
        open={open}
        onClose=""
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box  sx={style}>
          <div className='verification'>
            <div className='withbg withcolor' >
          <img    src="/assets/signup/tabler_mail-filled.svg" alt="Signup" /></div>
            <h3>Verify {type == "Email Address" ? "email address" : "your phone number"} to create a<br />new account</h3>
            <small>{type == "Email Address" ? "An email" : "A message"} with the verification code has been sent<br />to {type == "Email Address" ? formState?.email : formState?.phone_number}</small>
           


<div className='options'>
   <small>Please Enter the code here</small>
   
 <div  className='otp-inputs' >
{/* <input onChange={(e)=>handleCodeChanges(e,0)} />
<input onChange={(e)=>handleCodeChanges(e,1)} />
<input onChange={(e)=>handleCodeChanges(e,2)} />
<input onChange={(e)=>handleCodeChanges(e,3)} />
<input onChange={(e)=>handleCodeChanges(e,4)} />
<input onChange={(e)=>handleCodeChanges(e,5)} /> */}
<form  ref={inpRefs}>
  {password.map((digit, i) => (
                           
    <input  type='text' key={i}
        value={digit !== -1 ? digit : ""}
        onKeyDown={(e) => handleKeyDown(e, i)}
        onChange={(e) => handleChange(e, i)}
        onFocus={() => setActiveInput(i)}
        onBlur={() => setActiveInput(-1)}
    ></input>
      
  ))}
  <div className='otp-options'>

  <button className='verification-button' onClick={handleSubmit} >Verify {type}</button>
   <button className='verification-button alt' onClick={handleClose}>Cancel</button>
</div>

  </form>
 </div>

 
<h4 style={{ marginLeft: 0, textAlign: 'center',  cursor:"pointer"} }>Didn’t receive code? <span onClick={handleResendOtp}>Resend</span> </h4>




 
</div>
 
            </div>
        </Box>
      </Modal>
      {/* {isVerified &&  next()} */}
    </div>
  );
}
 