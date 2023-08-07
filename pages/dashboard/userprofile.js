import { useEffect, useState } from 'react';
import Head from "next/head";
import {container, col2, left, empty, center } from '../../src/components/dashboard/dashboard.module.css'
import styles from '../../src/components/dashboard/profile.module.css'
import Header from '../../src/components/Header/Header';
import SideNav from '../../src/components/Header/sidenav';
import cardImage from "../../public/assets/logos/cardImage.png"
import sezzle from "../../public/assets/logos/sezzle.png"
import paypal from "../../public/assets/logos/paypal.png"
import mastercard from "../../public/assets/logos/mastercard.png"
import visa from "../../public/assets/logos/visa.png"
import american from "../../public/assets/logos/american.png"
import Image from 'next/image';
import Link from 'next/link';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Sidenav2 from '../../src/components/Header/sidenav2';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { UserIcon } from '../../src/components/icons';
import axios from '../../src/util/Api';
import PhoneInput from 'react-phone-input-2';
import { getUser } from '../../src/actions';
import AddIcon from '@mui/icons-material/Add';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 58,
    height: 27,
    padding: 0,
    borderRadius: 15,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(28px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#ffffff',
        },
        '& > .MuiSwitch-thumb': {
            backgroundColor:
        theme.palette.mode === 'dark' ? '#949494' : '#04D505',
          },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 26.22,
      height: 23,
      borderRadius: 11,
      backgroundColor:
        theme.palette.mode === 'dark' ? '#04D505' : '#949494',
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
        width: 58,
        height: 27,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        '#ffffff',
      boxSizing: 'border-box',
    },
  }));


const UserProfile = (props) => {
    const router = useRouter()
    const [status, setStatusState] = useState('');
    const [message, setMessageState] = useState('');
    const [formState, setFormState] = useState({
        email: "",
        phone_number: "",
        first_name: "",
        last_name: "",
        password: "",
        address: "",
        new_password: '',
        card_type: '',
        profileImage: '',
        profileImageName: '',
        profileImageData: '',
        city: '',
        country: '', state: '', zip_code: '', 
        billing_address: '', billing_address2: '', billing_city: '', billing_country: '',
        billing_state: '', billing_zip_code: '', driver_car_model: '', vin: '', driver_car_color: '', driver_car_plate_number: '', driver_car_picture: {}
      });
    const { email, phone_number, first_name, last_name, password, 
        address, new_password, profileImageData, country, state, city, zip_code, 
        billing_address, billing_address2, billing_city, billing_country,
        billing_state, billing_zip_code, driver_car_model, vin, driver_car_color, driver_car_plate_number, driver_car_picture } = formState;
    const [times, setTimes] = useState({
        sunday: {from:'2018-01-01T00:00:00.000Z',to:'2018-01-01T00:00:00.000Z', open: true},
        monday: {from:'2018-01-01T00:00:00.000Z',to:'2018-01-01T00:00:00.000Z', open: true},
        tuesday: {from:'2018-01-01T00:00:00.000Z',to:'2018-01-01T00:00:00.000Z', open: true},
        wednesday: {from:'2018-01-01T00:00:00.000Z',to:'2018-01-01T00:00:00.000Z', open: true},
        thursday: {from:'2018-01-01T00:00:00.000Z',to:'2018-01-01T00:00:00.000Z', open: true},
        friday: {from:'2018-01-01T00:00:00.000Z',to:'2018-01-01T00:00:00.000Z', open: true},
        saturday: {from:'2018-01-01T00:00:00.000Z',to:'2018-01-01T00:00:00.000Z', open: true}
    });
    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
      ];

    useEffect(() => {
        if(props.auth.authUser){
            setFormState({ ...formState,
                ['email']: props.auth.authUser.email,
                ['first_name']: props.auth.authUser.first_name,
                ['last_name']: props.auth.authUser.last_name,
                ['phone_number']: props.auth.authUser.phone_number,
                ['driver_car_color']: props.auth.authUser.driver_car_color,
                ['driver_car_model']: props.auth.authUser.driver_car_model,
                ['driver_car_plate_number']: props.auth.authUser.driver_car_plate_number,
                ['driver_car_picture']: {carContentURL: props.auth.authUser.driver_car_picture}
            })

            if(props.auth.authUser.driver_hours.length>0){
                setTimes(props.auth.authUser.driver_hours[0])
            }
        }
      },[props.auth.authUser]);

    function handleChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    function handlePhoneChange(e) {
        setFormState({ ...formState, ['phone_number']: e });
      }

    function onUpdateProfileImage(event){
        if (event.target.files[0] === undefined) return;
        var allowedImageExtensions = /(\.jpg|\.jpeg|\.png|\.)$/i;
    
        if (allowedImageExtensions.exec(event.target.files[0].name)) {
            setFormState({ ...formState,
                ['profileImage']: event.target.files[0],
              ['profileImageName']: event.target.files[0].name,
              ['profileImageData']: URL.createObjectURL(event.target.files[0])
            })
            var image = document.getElementById("profile_image");
            image.style.display = "block";
            image.src = URL.createObjectURL(event.target.files[0]);
        }
        else {
          alert("Invalid image type");
        }
    
    };

    function uploadProfileImage() {
        // <input accept="image/*,video/mp4,video/mov,video/x-m4v,video/*" id="ProfileImage" name="ProfileImage" type="file" className="mb-2 pr-4" onChange={(ev) => this.onUpdateProfileImage(ev)} />
        const input = document.createElement("input");
        input.accept = "image/*,video/mp4,video/x-m4v,video/*";
        input.id = "profileImage";
        input.name = "profileImage";
        input.type = "file";
        input.onchange = (ev) => onUpdateProfileImage(ev);
        input.hidden = true;
        input.click()
    }

    function handleTime(time, day, when){
        console.log(time)
        // times[day][when] = time;
        let newTimes = {...times,[day]: {...times[day], [when]: time}}
        console.log(newTimes)
        setTimes({...times,[day]: {...times[day], [when]: time}})
        saveChange(newTimes)
    }

    function handleDayAvailabiltyChange(value,day,when) {
        let newTimes = {...times,[day]: {...times[day], [when]: value}}
        console.log(newTimes)
        setTimes({...times,[day]: {...times[day], [when]: value}})
        saveChange(newTimes)
    };

    function saveChange(times){
        let fields = {driver_hours: times}
        axios.put('/user/updateuserprofile/'+props.auth.authUser._id, fields).then(res => {
            console.log(res.data)
            props.getUser(props.auth.authUser._id)
        })
    }

    function saveChanges(e){
        e.preventDefault()
        let {
            phone_number,
            first_name,
            last_name,
            profileImage,
        billing_address, billing_city, billing_country,
        billing_state, billing_zip_code} = formState;

        let delivery_addresses={
            phone_number: phone_number,
            street: billing_address + billing_state,
            city: billing_city,
            zip_code: billing_zip_code,
            country: billing_country
        }
        const formData = new FormData();
        if(profileImage){
            console.log('dddd')
            formData.append('profile_picture', profileImage);
        }
        formData.append('first_name', first_name);
        formData.append('last_name', last_name); driver_car_picture
        formData.append('driver_car_model', driver_car_model);
        formData.append('driver_car_color', driver_car_color);
        formData.append('driver_car_plate_number', driver_car_plate_number);
        console.log(driver_car_picture.carContent)
        if(driver_car_picture.carContent){
            formData.append('driver_car_picture', driver_car_picture.carContent);
        }
        // formData.append('delivery_addresses', delivery_addresses);

        axios.put('/user/updateuserprofile/'+props.auth.authUser._id, formData).then(res => {
            console.log(res.data)
            setStatusState('success')
            setMessageState('User updated')
            setTimeout(() => {
                setStatusState('')
                setMessageState('')
            },5000)
            props.getUser(props.auth.authUser._id)
            
        }).catch(() => {
            setStatusState('error')
            setMessageState('Error updating user')
            setTimeout(() => {
                setStatusState('')
                setMessageState('')
            }, 5000)
        })
    }

    function uploadCarImage () {
        // <input accept="image/*,video/mp4,video/x-m4v,video/*" id="instructionChunkContent1" name="instructionChunkContent1" type="file" className="mb-2" onChange={(ev) => this.onhandleInstructionImg(ev, 1)} />
        const input = document.createElement("input");
        input.accept = "image/*,video/mp4,video/x-m4v,video/*";
        input.id = "carImage";
        input.name = "carImage";
        input.type = "file";
        input.onchange = (ev) => onhandleCarImg(ev);
        input.hidden = true;
        input.click()
    }

    function onhandleCarImg (event) {
        if (event.target.files[0] === undefined) return;
    
        // Allowing file type
        var allowedImageExtensions = /(\.jpg|\.jpeg|\.png|\.)$/i;

        if (allowedImageExtensions.exec(event.target.files[0].name)) {

          setFormState({ ...formState, ['driver_car_picture']: {
            carContent: event.target.files[0],
            carContentURL: URL.createObjectURL(event.target.files[0])
          } });
        }
        else {
          alert('Invalid file type');
        }
      };

    return (
        <div className={container + " " + col2}>
            <div className="alert">
                {status === "error" && <div className="alert-danger">{message}</div>}
                {status === "success" && <div className="alert-success">{message}</div>}
            </div>
        <Head>
            <title>User Profile</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        <SideNav />
        <div className={left}>
            <Sidenav2 showBottom={false} />
        </div>
        <div className={empty}></div>
        <div className={center}>
            <h3 className={styles.center_h3}>My Profile</h3>
            <div className={styles.profile_con}>
                <div className={styles.empty}></div>
                <div className={styles.profile_summary_con}>
                    <h3>Summary</h3>
                    {props.auth.authUser &&
                    <div className={styles.profile_summary}>
                        <div className={styles.profile_summary_link}>
                            <Link href='#basic-information' >
                                <a>Basic Information</a>
                            </Link>
                        </div>
                        <div className={styles.profile_summary_link}>
                            <Link href='#change-password' >
                                <a>Change Password</a>
                            </Link>
                        </div>
                        <div className={styles.profile_summary_link}>
                            <Link href='#billing-address' >
                                <a>Billing Address</a>
                            </Link>
                        </div>
                        {props.auth.authUser.user_type === 'driver' &&
                        <div className={styles.profile_summary_link}>
                            <Link href='#car-details' >
                                <a>Car Details</a>
                            </Link>
                        </div>
                        }
                        <div className={styles.profile_summary_link}>
                            <Link href='#payment-method' >
                                <a>Payment Method</a>
                            </Link>
                        </div>
                        <div className={styles.profile_summary_link}>
                            <Link href='#notification' >
                                <a>Notification</a>
                            </Link>
                        </div>
                        {(props.auth.authUser.user_type === 'supplier' || props.auth.authUser.user_type === 'customer') &&
                        <div className={styles.profile_summary_link}>
                            <Link href='#food-preference' >
                                <a>Food Preference</a>
                            </Link>
                        </div>
                        }
                        {(props.auth.authUser.user_type === 'driver' || props.auth.authUser.user_type === 'customer') &&
                        <div className={styles.profile_summary_link}>
                            <Link href='#upgrade-chopChow-plan'>
                                <a>Upgrade ChopChow Plan</a>
                            </Link>
                        </div>
                        }
                        {props.auth.authUser.user_type === 'driver' &&
                        <div className={styles.profile_summary_link}>
                            <Link href='#working-hours'>
                                <a>Working Hours</a>
                            </Link>
                        </div>
                        }
                        <div className={styles.profile_summary_link}>
                            <Link href='#account-type'>
                                <a>Account Type</a>
                            </Link>
                        </div>
                        {props.auth.authUser.user_type !== 'admin' &&
                        <div className={styles.profile_summary_link}>
                            <Link href='#close-account' >
                                <a>Close Account</a>
                            </Link>
                        </div>}
                    </div>
                    }
                </div>
                <div className={styles.profile_details}>
                    {props.auth.authUser &&
                    <>
                        <div id='basic-information' className={styles.profile_basic_info_con}>
                            <h3>Basic Information</h3>
                            <div className={styles.profile_basic_info}>
                                <div className={styles.profile_image_con}>
                                    <div className={styles.profile_image}>
                                        
                                        {(profileImageData === '' && props.auth.authUser.profile_picture === undefined) && <UserIcon />}
                                        {(profileImageData === '' && props.auth.authUser.profile_picture !== undefined) && 
                                        <Image width={500} height={500} src={props.auth.authUser.profile_picture} />
                                        }
                                        <img id="profile_image" width='100%' alt="profile" style={{ display: "none" }} />
                                    </div>
                                    <p onClick={uploadProfileImage}>Change Picture</p>
                                </div>
                                <div className={styles.profile_form}>
                                    <h3>Contact Information</h3>
                                    <div className={styles.profile_form_col_2}>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="first_name" className={styles.profile_form_label}>First Name</label>
                                            <input 
                                            type="text"
                                            name="first_name"
                                            value={first_name}
                                            placeholder="First Name"
                                            onChange={handleChange}
                                            className={styles.profile_form_input} />
                                            {/* {this.props.errors.accountname && <div className={styles.errorMsg}>{this.props.errors.accountname}</div>} */}
                                        </div>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="last_name" className={styles.profile_form_label}>Last Name</label>
                                            <input
                                            type="text"
                                            name="last_name"
                                            value={last_name}
                                            placeholder="Last Name"
                                            onChange={handleChange}
                                            className={styles.profile_form_input} />
                                            {/* {this.props.errors.lastname && <div className={styles.errorMsg}>{this.props.errors.lastname}</div>} */}
                                        </div>
                                    </div>
                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="email" className={styles.profile_form_label}>
                                        Email
                                        </label>
                                        <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        onChange={handleChange}
                                        className={styles.profile_form_input}
                                        />
                                    </div>
                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="phone_number" className={styles.profile_form_label}>
                                        Phone Number
                                        </label>
                                        <PhoneInput
                                            inputClass={styles.login_form_input}
                                            
                                            name="phone_number"
                                            value={phone_number}
                                            onChange={phone => handlePhoneChange(phone)}
                                        />
                                    </div>
                                    <div className={styles.profile_form_col_2}>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="city" className={styles.profile_form_label}>City</label>
                                            <input  name="city" value={city} onChange={handleChange} type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.city && <div className={styles.errorMsg}>{this.props.errors.accountname}</div>} */}
                                        </div>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="state" className={styles.profile_form_label}>State</label>
                                            <input name="state" value={state} onChange={handleChange} type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.lastname && <div className={styles.errorMsg}>{this.props.errors.lastname}</div>} */}
                                        </div>
                                    </div>
                                    <div className={styles.profile_form_col_2}>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="zip_code" className={styles.profile_form_label}>Zip Code</label>
                                            <input  name="zip_code" value={zip_code} onChange={handleChange} type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.zip_code && <div className={styles.errorMsg}>{this.props.errors.accountname}</div>} */}
                                        </div>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="country" className={styles.profile_form_label}>Country</label>
                                            <input name="country" value={country} onChange={handleChange} type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.lastname && <div className={styles.errorMsg}>{this.props.errors.lastname}</div>} */}
                                        </div>
                                    </div>

                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="address" className={styles.profile_form_label}>
                                        Address
                                        </label>
                                        <input
                                        type="tel"
                                        name="address"
                                        value={address}
                                        placeholder="Your Address"
                                        onChange={handleChange}
                                        className={styles.profile_form_input}
                                        />
                                    </div>
                                    
                                </div>
                            </div>

                        </div>

                        <div id='change-password' className={styles.profile_basic_info_con}>
                            <h3>Change Password</h3>
                            <div className={styles.profile_basic_info}>
                                <div className={styles.profile_form}>
                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="old_password" className={styles.profile_form_label}>
                                        Old Password
                                        </label>
                                        <input
                                        type="text"
                                        name="old_password"
                                        value={password}
                                        placeholder="Password"
                                        onChange={handleChange}
                                        className={styles.profile_form_input}
                                        />
                                    </div>
                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="new_password" className={styles.profile_form_label}>
                                        New Password
                                        </label>
                                        <input
                                        type="tel"
                                        name="new_password"
                                        value={new_password}
                                        placeholder="Your New Password"
                                        onChange={handleChange}
                                        className={styles.profile_form_input}
                                        />
                                    </div>
                                    
                                </div>
                            </div>

                            <button className={styles.profile_button} onClick={saveChanges}>Save Changes</button>
                        </div>

                        <div id='billing-address' className={styles.profile_basic_info_con}>
                            <h3>Billing Address</h3>
                            <div className={styles.profile_basic_info}>
                                <div className={styles.profile_form}>
                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="billing_address" className={styles.profile_form_label}>
                                        Street Address
                                        </label>
                                        <input
                                        type="text"
                                        name="billing_address"
                                        value={billing_address}
                                        placeholder="Street Address"
                                        onChange={handleChange}
                                        className={styles.profile_form_input}
                                        />
                                    </div>
                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="billing_address2" className={styles.profile_form_label}>
                                        Street Address 2
                                        </label>
                                        <input
                                        type="text"
                                        name="billing_address2"
                                        value={billing_address2}
                                        placeholder="Your second address"
                                        onChange={handleChange}
                                        className={styles.profile_form_input}
                                        />
                                    </div>

                                    <div className={styles.profile_form_col_2}>
                                        
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="billing_state" className={styles.profile_form_label}>State/Province</label>
                                            <input name="billing_state" value={billing_state} onChange={handleChange} type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.lastname && <div className={styles.errorMsg}>{this.props.errors.lastname}</div>} */}
                                        </div>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="billing_city" className={styles.profile_form_label}>City</label>
                                            <input  name="billing_city" value={billing_city} onChange={handleChange} type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.billing_city && <div className={styles.errorMsg}>{this.props.errors.accountname}</div>} */}
                                        </div>
                                    </div>
                                    <div className={styles.profile_form_col_2}>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="billing_zip_code" className={styles.profile_form_label}>Zip/Postal Code</label>
                                            <input  name="billing_zip_code" value={billing_zip_code} onChange={handleChange} type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.billing_zip_code && <div className={styles.errorMsg}>{this.props.errors.accountname}</div>} */}
                                        </div>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="billing_country" className={styles.profile_form_label}>Country</label>
                                            <input name="billing_country" value={billing_country} onChange={handleChange} type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.lastname && <div className={styles.errorMsg}>{this.props.errors.lastname}</div>} */}
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        {props.auth.authUser.user_type === 'driver' &&
                        <div id='car-details' className={styles.profile_basic_info_con}>
                            <h3>Car Details</h3>
                            <div className={styles.profile_basic_info}>
                                <div className={styles.profile_image_con}>
                                    <div className={styles.suggestion_form_image}>
                                        <div className={styles.suggestion_form_image_col_2}>
                                            {driver_car_picture.carContentURL && 
                                            <div className={styles.profile_image}>
                                                <Image width={300} height={300} src={driver_car_picture.carContentURL} />
                                            </div>
                                            }
                                        </div>
                                        <div onClick={() => uploadCarImage()} className={styles.suggestion_form_image_col_1}>
                                            <div className={styles.suggestion_form_image_icon_con}>
                                            <AddIcon className={styles.suggestion_form_image_icon} />
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                <div className={styles.profile_form}>
                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="driver_car_model" className={styles.profile_form_label}>
                                        Car Name
                                        </label>
                                        <input 
                                            type="text"
                                            name="driver_car_model"
                                            value={driver_car_model}
                                            placeholder="Car Name"
                                            onChange={handleChange}
                                            className={styles.profile_form_input} />
                                    </div>
                                    <div className={styles.profile_form_col_2} style={{gridTemplateColumns: '3fr 1fr'}}>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="vin" className={styles.profile_form_label}>Vin</label>
                                            <input  name="vin" value={vin} onChange={handleChange} type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.vin && <div className={styles.errorMsg}>{this.props.errors.accountname}</div>} */}
                                        </div>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="driver_car_color" className={styles.profile_form_label}>Color</label>
                                            <input name="driver_car_color" value={driver_car_color} onChange={handleChange} type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.lastname && <div className={styles.errorMsg}>{this.props.errors.lastname}</div>} */}
                                        </div>
                                    </div>

                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="driver_car_plate_number" className={styles.profile_form_label}>
                                        Plate Number
                                        </label>
                                        <input
                                        type="text"
                                        name="driver_car_plate_number"
                                        value={driver_car_plate_number}
                                        placeholder="Your Plate Number"
                                        onChange={handleChange}
                                        className={styles.profile_form_input}
                                        />
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        }

                        <div id='payment-method' className={styles.profile_basic_info_con}>
                            <h3>Payment Method</h3>
                            <div className={styles.profile_basic_info}>
                                <div className={styles.profile_payment_methods}>
                                    <div className={styles.profile_payment_method}> 
                                        <Image src={cardImage} />
                                    </div>
                                    <div className={styles.profile_payment_method}> 
                                        <Image src={paypal} />
                                    </div>
                                    <div className={styles.profile_payment_method}> 
                                        <Image src={sezzle} />
                                    </div>
                                    
                                </div>
                                <div className={styles.profile_card_type_con}>
                                    <p>Choose Card Type</p>
                                    <div className={styles.profile_card_types}>
                                        <div className={styles.profile_card_type}>
                                            <div className={styles.profile_card_type_option}>
                                                <input
                                                className={styles.profile_card_type_radioInput}
                                                type="radio"
                                                id="mastercard"
                                                name="card_type"
                                                value="mastercard"
                                                />
                                                <label
                                                htmlFor="mastercard"
                                                className={styles.profile_card_type_radio_button}
                                                ></label>
                                                <label
                                                htmlFor="mastercard"
                                                className={styles.profile_card_type_radioLabel}
                                                >
                                                <Image src={mastercard} />
                                                </label>
                                                
                                            </div>
                                            <div className={styles.profile_card_type_option}>
                                                <input
                                                className={styles.profile_card_type_radioInput}
                                                type="radio"
                                                id="visa"
                                                name="card_type"
                                                value="visa"
                                                />
                                                <label
                                                htmlFor="visa"
                                                className={styles.profile_card_type_radio_button}
                                                ></label>
                                                <label htmlFor="visa" className={styles.profile_card_type_radioLabel}>
                                                <Image src={visa} />
                                                </label>
                                            </div>
                                            <div className={styles.profile_card_type_option}>
                                                <input
                                                className={styles.profile_card_type_radioInput}
                                                type="radio"
                                                id="american"
                                                name="card_type"
                                                value="american"
                                                />
                                                <label
                                                htmlFor="american"
                                                className={styles.profile_card_type_radio_button}
                                                ></label>
                                                <label htmlFor="american" className={styles.profile_card_type_radioLabel}>
                                                <Image src={american} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.profile_form}>
                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="billing_address" className={styles.profile_form_label}>
                                        Street Address
                                        </label>
                                        <input
                                        type="text"
                                        name="billing_address"
                                        placeholder="Street Address"
                                        onChange={handleChange}
                                        className={styles.profile_form_input}
                                        />
                                    </div>
                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="billing_address2" className={styles.profile_form_label}>
                                        Street Address 2
                                        </label>
                                        <input
                                        type="tel"
                                        name="billing_address2"
                                        placeholder="Your New Password"
                                        onChange={handleChange}
                                        className={styles.profile_form_input}
                                        />
                                    </div>
                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="billing_address2" className={styles.profile_form_label}>
                                        Expiration Date
                                        </label>
                                        <div className={styles.input_date}>
                                            <input type='text' />
                                                /
                                            <input type='text' />
                                            /
                                            <input type='text' />

                                        </div>
                                    </div>

                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="billing_address2" className={styles.profile_form_label}>
                                        CVV
                                        </label>
                                        <div className={styles.input_date}>
                                            <input style={{width: '89px'}} type='text' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className={styles.profile_button}>Save Changes</button>
                        </div>

                        <div id='notification' className={styles.profile_basic_info_con}>
                            <h3>Notification</h3>
                            <div className={styles.profile_basic_info}>
                                <div className={styles.profile_notification_con}>
                                    <h3>General Notification</h3>
                                    <div className={styles.profile_notifications}>
                                        <div className={styles.profile_notification}>
                                            <h3>Receive notification for all order activities</h3>
                                        </div>
                                        {props.auth.authUser.user_type !== 'driver' && 
                                        <div className={styles.profile_notification}>
                                            <h3>When someone comment on your product</h3>
                                        </div>}
                                    </div>
                                </div>
                                <div className={styles.line}></div>
                                <div className={styles.profile_notification_con}>
                                    <h3>Newsletter</h3>
                                    <div className={styles.profile_notifications}>
                                        <div className={styles.profile_notification}>
                                            <h3>Get notification for our product updates </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {(props.auth.authUser.user_type === 'supplier' || props.auth.authUser.user_type === 'customer') &&
                        <div id='food-preference' className={styles.profile_basic_info_con}>
                            <h3>Food Preference</h3>
                            <div className={styles.profile_basic_info}>
                                <div className={styles.profile_food_pref}>
                                    <h3>Diets</h3>
                                    <p>Select from the diets below and we will only show you recipes that match</p>
                                    <div className={styles.chip}>
                                        <div className={styles.chip_option}>
                                            <input
                                            className={styles.chip_radioInput}
                                            type="radio"
                                            id="tee"
                                            name="tee"
                                            value="tee"
                                            />
                                            <label
                                            htmlFor="tee"
                                            className={styles.chip_radio_button}
                                            >tea</label>
                                            
                                        </div>
                                        <div className={styles.chip_option}>
                                            <input
                                            className={styles.chip_radioInput}
                                            type="radio"
                                            id="rice"
                                            name="rice"
                                            value="rice"
                                            />
                                            <label
                                            htmlFor="rice"
                                            className={styles.chip_radio_button}
                                            >rice</label>
                                        </div>
                                        <div className={styles.chip_option}>
                                            <input
                                            className={styles.chip_radioInput}
                                            type="radio"
                                            id="tesa"
                                            name="tesa"
                                            value="tesa"
                                            />
                                            <label
                                            htmlFor="tesa"
                                            className={styles.chip_radio_button}
                                            >yam</label>
                                        </div>
                                        <div className={styles.chip_option}>
                                            <input
                                            className={styles.chip_radioInput}
                                            type="radio"
                                            id="time"
                                            name="time"
                                            value="time"
                                            />
                                            <label
                                            htmlFor="time"
                                            className={styles.chip_radio_button}
                                            >time</label>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.profile_food_pref_allergies}>
                                    <h3>Allergies</h3>
                                    <p>Select from the diets below and we will only show you recipes that match</p>
                                    <div className={styles.chip}>
                                        <div className={styles.chip_option}>
                                            <input
                                            className={styles.chip_radioInput}
                                            type="radio"
                                            id="kiwi"
                                            name="kiwi"
                                            value="kiwi"
                                            />
                                            <label
                                            htmlFor="kiwi"
                                            className={styles.chip_radio_button2}
                                            >tea</label>
                                            
                                        </div>
                                        <div className={styles.chip_option}>
                                            <input
                                            className={styles.chip_radioInput}
                                            type="radio"
                                            id="Corn"
                                            name="Corn"
                                            value="Corn"
                                            />
                                            <label
                                            htmlFor="Corn"
                                            className={styles.chip_radio_button2}
                                            >Corn</label>
                                        </div>
                                        <div className={styles.chip_option}>
                                            <input
                                            className={styles.chip_radioInput}
                                            type="radio"
                                            id="Meat"
                                            name="Meat"
                                            value="Meat"
                                            />
                                            <label
                                            htmlFor="Meat"
                                            className={styles.chip_radio_button2}
                                            >yam</label>
                                        </div>
                                        <div className={styles.chip_option}>
                                            <input
                                            className={styles.chip_radioInput}
                                            type="radio"
                                            id="flower"
                                            name="flower"
                                            value="flower"
                                            />
                                            <label
                                            htmlFor="flower"
                                            className={styles.chip_radio_button2}
                                            >flower</label>
                                        </div>
                                        <div className={styles.chip_option}>
                                            <input
                                            className={styles.chip_radioInput}
                                            type="radio"
                                            id="rat"
                                            name="rat"
                                            value="rat"
                                            />
                                            <label
                                            htmlFor="rat"
                                            className={styles.chip_radio_button2}
                                            >rat</label>
                                        </div>
                                        <div className={styles.chip_option}>
                                            <input
                                            className={styles.chip_radioInput}
                                            type="radio"
                                            id="sugar"
                                            name="sugar"
                                            value="sugar"
                                            />
                                            <label
                                            htmlFor="sugar"
                                            className={styles.chip_radio_button2}
                                            >sugar</label>
                                        </div>
                                        <div className={styles.chip_option}>
                                            <input
                                            className={styles.chip_radioInput}
                                            type="radio"
                                            id="weed"
                                            name="weed"
                                            value="weed"
                                            />
                                            <label
                                            htmlFor="weed"
                                            className={styles.chip_radio_button2}
                                            >weed</label>
                                        </div>
                                        <div className={styles.chip_option}>
                                            <input
                                            className={styles.chip_radioInput}
                                            type="radio"
                                            id="rice"
                                            name="rice"
                                            value="rice"
                                            />
                                            <label
                                            htmlFor="rice"
                                            className={styles.chip_radio_button2}
                                            >rice</label>
                                        </div>
                                        <div className={styles.chip_option}>
                                            <input
                                            className={styles.chip_radioInput}
                                            type="radio"
                                            id="yam"
                                            name="yam"
                                            value="yam"
                                            />
                                            <label
                                            htmlFor="yam"
                                            className={styles.chip_radio_button2}
                                            >yam</label>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.input_button}>
                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="billing_address" className={styles.profile_form_label}>
                                        Street Address
                                        </label>
                                        <input
                                        type="text"
                                        name="billing_address"
                                        placeholder="Street Address"
                                        onChange={handleChange}
                                        className={styles.profile_form_input}
                                        />
                                    </div>
                                    <button className={styles.profile_button} style={{width: 'max-content'}}>Add</button>
                                </div>
                            </div>
                        </div>
                        }

                        <div id='account-type' className={styles.profile_basic_info_con}>
                            <h3>Account Type</h3>
                            <div className={styles.profile_basic_info}>
                                <h3>{props.auth.authUser.user_type}</h3>
                            </div>
                        </div>

                        {(props.auth.authUser.user_type === 'driver' || props.auth.authUser.user_type === 'customer') &&
                        <div id='upgrade-chopChow-plan' className={styles.profile_basic_info_con}>
                            <h3>Upgrade ChopChow Plan</h3>
                            <div className={styles.profile_basic_info}>
                                <p>Upgrade plan for unlimited ......</p>
                                <button className={styles.profile_button} style={{width: 'max-content', justifySelf: 'start'}}>View Plan</button>
                            </div>
                        </div>
                        }
                        
                        {props.auth.authUser.user_type === 'driver' &&
                        <div id='working-hours' className={styles.profile_basic_info_con}>
                            <h3>Work Hours</h3>
                            <div className={styles.profile_basic_info}>
                                <div className={styles.profile_workinghours_con}>
                                    <h3>Set Working Hours</h3>
                                    <p>Configure the standard hours of operation for this store</p>
                                    <div className={styles.profile_workinghour_days}>
                                        {days.map(day => {
                                        return(    
                                            <div className={styles.profile_workinghour_day}>
                                                <h3>{day}</h3>
                                                <div className={styles.profile_workinghour_switch}>
                                                <AntSwitch checked={times[day]['open']} onChange={() => handleDayAvailabiltyChange(!times[day]['open'], day, 'open')} inputProps={{ 'aria-label': 'ant design' }} />
                                                {times[day]['open'] ? 'Open': 'Closed'}
                                                </div>
                                                <div className={styles.profile_workinghour_date}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <TimePicker
                                                        value={times[day]['from']}
                                                        onChange={time => handleTime(time, day, 'from')}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                                </div>
                                                <h4>To</h4>
                                                <div className={styles.profile_workinghour_date}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <TimePicker
                                                        value={times[day]['to']}
                                                        onChange={time => handleTime(time, day, 'to')}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                                </div>
                                            </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                        
                        {props.auth.authUser.user_type !== 'admin' &&
                        <div className={styles.line}></div>
                        }

                        {props.auth.authUser.user_type !== 'admin' &&
                        <div id='close-account' className={styles.profile_basic_info_con}>
                            <h3>Close Account</h3>
                            <p>Do you want to close down your account? Action cannot be reversed.</p>
                            <button className={styles.profile_button} style={{width: '212px', justifySelf: 'start', background: '#F40707'}}>Close</button>
                        </div>
                        }
                    </>
                    }

                </div>
            </div>
        </div>
        
    </div>
    )

}

function mapDispatchToProps(dispatch) {
    return {
      getUser: (id) => dispatch(getUser(id))
    };
  }

function mapStateToProp(state) {
    return {
      auth: state.Auth
    };
  }
  
  export default connect(
    mapStateToProp,
    mapDispatchToProps
  )(UserProfile);