
import React, { useState, useEffect}  from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import img_logo from "../../../public/assets/logos/CC_Logo_no_bg.png";

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
export default function OTP({next, open, setOpen, type, setType, verifyEmailOTPFunc, verifynumberFunc, formState, setFormState}) {
  const  [code, setCode] = useState([])
 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOption = (title) => {
console.log(title)
  }

  const handleCodeChanges = ({target: {value}}, key) => {

    const _code =  code;

    _code[key] = value

    setCode(_code)
console.log('code', code)
  }

  useEffect(()=>{
  
  setFormState({...formState, code})}
  , [code])

  const handleSubmit = () => {

    if(type =='Email Address'){
      console.log(formState.email, code.reduce((a,b) =>a+b))
      verifyEmailOTPFunc({email: formState?.email, otp: code?.reduce((a,b) =>a+b)})
    }else {
      verifynumberFunc(request_id,code.reduce((a,b) =>a+b))
    }
    
  }

  return (
    <div> 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box  sx={style}>
          <div className='verification'>
            <div className='withbg withcolor' >
          <img    src="/assets/signup/tabler_mail-filled.svg" alt="Signup" /></div>
            <h3>Verify email address to create a<br />new account</h3>
            <small>An email with the verification code has been sent<br />to {formState?.email}</small>
           


<div className='options'>
   <small>Please Enter the code here</small>
   
 <div  className='otp-inputs'>
<input onChange={(e)=>handleCodeChanges(e,0)} />
<input onChange={(e)=>handleCodeChanges(e,1)} />
<input onChange={(e)=>handleCodeChanges(e,2)} />
<input onChange={(e)=>handleCodeChanges(e,3)} />
<input onChange={(e)=>handleCodeChanges(e,4)} />
<input onChange={(e)=>handleCodeChanges(e,5)} />
 </div>

 
<h4 style={{ marginLeft: 0, textAlign: 'center'}}>Didn’t receive code? <span>Resend</span> </h4>



<div className='otp-options'>
<button className='verification-button alt' onClick={handleClose}>Cancel</button>
 <button className='verification-button' onClick={handleSubmit}>Verify {type}</button>
 </div>
</div>
 
            </div>
        </Box>
      </Modal>
    </div>
  );
}
 