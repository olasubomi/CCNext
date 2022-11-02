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
import profileImage from "../../public/assets/logos/profileImage.png"
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
    const [formState, setFormState] = useState({
        email: "",
        phone_number: "",
        first_name: "",
        last_name: "",
        password: "",
        address: "",
        new_password: '',
        card_type: ''
      });
    const { email, phone_number, first_name, last_name, password, address, new_password, card_type } = formState;
    const [value, setValue] = useState('2018-01-01T00:00:00.000Z');

    // useEffect(() => {
    //     if(props.auth.authUser === null){
    //         router.push('/')
    //     }
    //   }, []);

    function handleChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    return (
        <div className={container + " " + col2}>
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
                        {(props.auth.authUser.user_type !== 'driver' || props.auth.authUser.user_type !== 'admin') &&
                        <div className={styles.profile_summary_link}>
                            <Link href='#food-preference' >
                                <a>Food Preference</a>
                            </Link>
                        </div>
                        }
                        {(props.auth.authUser.user_type !== 'supplier' || props.auth.authUser.user_type !== 'admin') &&
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
                                        <Image src={profileImage} />
                                    </div>
                                    <p>Change Picture</p>
                                </div>
                                <div className={styles.profile_form}>
                                    <h3>Contact Information</h3>
                                    <div className={styles.profile_form_col_2}>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="first_name" className={styles.profile_form_label}>First Name</label>
                                            <input 
                                            type="text"
                                            name="first_name"
                                            value={props.auth.authUser.first_name}
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
                                            value={props.auth.authUser.last_name}
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
                                        value={props.auth.authUser.email}
                                        placeholder="Email"
                                        onChange={handleChange}
                                        className={styles.profile_form_input}
                                        />
                                    </div>
                                    <div className={styles.profile_form_group}>
                                        <label htmlFor="phone_number" className={styles.profile_form_label}>
                                        Phone Number
                                        </label>
                                        <input
                                        type="tel"
                                        name="phone_number"
                                        value={props.auth.authUser.phone_number}
                                        placeholder="Your Phone Number"
                                        onChange={handleChange}
                                        className={styles.profile_form_input}
                                        />
                                    </div>
                                    <div className={styles.profile_form_col_2}>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="city" className={styles.profile_form_label}>City</label>
                                            <input  name="city" type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.city && <div className={styles.errorMsg}>{this.props.errors.accountname}</div>} */}
                                        </div>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="state" className={styles.profile_form_label}>State</label>
                                            <input name="state" type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.lastname && <div className={styles.errorMsg}>{this.props.errors.lastname}</div>} */}
                                        </div>
                                    </div>
                                    <div className={styles.profile_form_col_2}>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="zip_code" className={styles.profile_form_label}>Zip Code</label>
                                            <input  name="zip_code" type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.zip_code && <div className={styles.errorMsg}>{this.props.errors.accountname}</div>} */}
                                        </div>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="country" className={styles.profile_form_label}>Country</label>
                                            <input name="country" type="text" className={styles.profile_form_input} />
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

                            <button className={styles.profile_button}>Save Changes</button>
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

                                    <div className={styles.profile_form_col_2}>
                                        
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="billing_state" className={styles.profile_form_label}>State/Province</label>
                                            <input name="billing_state" type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.lastname && <div className={styles.errorMsg}>{this.props.errors.lastname}</div>} */}
                                        </div>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="billing_city" className={styles.profile_form_label}>City</label>
                                            <input  name="billing_city" type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.billing_city && <div className={styles.errorMsg}>{this.props.errors.accountname}</div>} */}
                                        </div>
                                    </div>
                                    <div className={styles.profile_form_col_2}>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="billing_zip_code" className={styles.profile_form_label}>Zip/Postal Code</label>
                                            <input  name="billing_zip_code" type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.billing_zip_code && <div className={styles.errorMsg}>{this.props.errors.accountname}</div>} */}
                                        </div>
                                        <div className={styles.profile_form_group}>
                                            <label htmlFor="billing_country" className={styles.profile_form_label}>Country</label>
                                            <input name="billing_country" type="text" className={styles.profile_form_input} />
                                            {/* {this.props.errors.lastname && <div className={styles.errorMsg}>{this.props.errors.lastname}</div>} */}
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

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

                        {(props.auth.authUser.user_type !== 'driver' || props.auth.authUser.user_type !== 'admin') &&
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

                        {(props.auth.authUser.user_type !== 'supplier' || props.auth.authUser.user_type !== 'admin') &&
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
                                        <div className={styles.profile_workinghour_day}>
                                            <h3>Sunday</h3>
                                            <div className={styles.profile_workinghour_switch}>
                                            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                            Closed
                                            </div>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                            <h4>To</h4>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className={styles.profile_workinghour_day}>
                                            <h3>Sunday</h3>
                                            <div className={styles.profile_workinghour_switch}>
                                            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                            Closed
                                            </div>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                            <h4>To</h4>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className={styles.profile_workinghour_day}>
                                            <h3>Sunday</h3>
                                            <div className={styles.profile_workinghour_switch}>
                                            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                            Closed
                                            </div>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                            <h4>To</h4>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className={styles.profile_workinghour_day}>
                                            <h3>Sunday</h3>
                                            <div className={styles.profile_workinghour_switch}>
                                            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                            Closed
                                            </div>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                            <h4>To</h4>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className={styles.profile_workinghour_day}>
                                            <h3>Sunday</h3>
                                            <div className={styles.profile_workinghour_switch}>
                                            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                            Closed
                                            </div>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                            <h4>To</h4>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className={styles.profile_workinghour_day}>
                                            <h3>Sunday</h3>
                                            <div className={styles.profile_workinghour_switch}>
                                            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                            Closed
                                            </div>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                            <h4>To</h4>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className={styles.profile_workinghour_day}>
                                            <h3>Sunday</h3>
                                            <div className={styles.profile_workinghour_switch}>
                                            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                            Closed
                                            </div>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                            <h4>To</h4>
                                            <div className={styles.profile_workinghour_date}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    value={value}
                                                    onChange={setValue}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }

                        <div className={styles.line}></div>

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

function mapStateToProp(state) {
    return {
      auth: state.Auth
    };
  }
  
  export default connect(
    mapStateToProp,
  )(UserProfile);