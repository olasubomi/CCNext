
import { useState } from 'react';
import {container, center } from '../../src/components/dashboard/dashboard.module.css'
import Header from '../../src/components/Header/Header'
import SideNav from '../../src/components/Header/sidenav'
import styles from '../../src/components/dashboard/createstore.module.css';
import profileStyles from '../../src/components/dashboard/profile.module.css';
import { suggestion_form_image, suggestion_form_image_col_1, suggestion_form_image_col_2, suggestion_form_image_icon, suggestion_form_image_icon_con, suggestion_form_group, suggestion_form_label} from "../../src/components/suggestionPages/suggestion.module.css";
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import AddIcon from '@mui/icons-material/Add';
import TransferToInventory from '../../src/components/dashboard/transferToInventory';

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

const CreateStore = () => {
    const [formState, setFormState] = useState({
        email: "",
        phone_number: "",
        store_name: "",
        password: "",
        address: "",
        new_password: '',
        card_type: ''
      });
    const { email, phone_number, store_name, address } = formState;
    const [value, setValue] = useState('2018-01-01T00:00:00.000Z');
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

    function handleChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    return (
        <div className={container}>
        <Header />
        <SideNav />
        <div className={center}>
            <div className={profileStyles.profile_details}>
                <div className={profileStyles.profile_basic_info_con}>
                    <h3>Create A Store</h3>
                    <div className={profileStyles.profile_basic_info}>
                        <div className={profileStyles.profile_form}>
                            <div className={profileStyles.profile_form_group}>
                                <label htmlFor="store_name" className={profileStyles.profile_form_label}>Store Name</label>
                                <input 
                                type="text"
                                name="store_name"
                                value={store_name}
                                placeholder="Store Name"
                                onChange={handleChange}
                                className={profileStyles.profile_form_input} />
                                {/* {this.props.errors.accountname && <div className={profileStyles.errorMsg}>{this.props.errors.accountname}</div>} */}
                            </div>
                            
                            <div className={profileStyles.profile_form_group}>
                                <label htmlFor="email" className={profileStyles.profile_form_label}>
                                Email
                                </label>
                                <input
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={handleChange}
                                className={profileStyles.profile_form_input}
                                />
                            </div>
                            <div className={profileStyles.profile_form_group}>
                                <label htmlFor="phone_number" className={profileStyles.profile_form_label}>
                                Phone Number
                                </label>
                                <input
                                type="tel"
                                name="phone_number"
                                value={phone_number}
                                placeholder="Your Phone Number"
                                onChange={handleChange}
                                className={profileStyles.profile_form_input}
                                />
                            </div>
                            <div className={profileStyles.profile_form_col_2}>
                                <div className={profileStyles.profile_form_group}>
                                    <label htmlFor="city" className={profileStyles.profile_form_label}>City</label>
                                    <input  name="city" type="text" className={profileStyles.profile_form_input} />
                                    {/* {this.props.errors.city && <div className={profileStyles.errorMsg}>{this.props.errors.accountname}</div>} */}
                                </div>
                                <div className={profileStyles.profile_form_group}>
                                    <label htmlFor="state" className={profileStyles.profile_form_label}>State</label>
                                    <input name="state" type="text" className={profileStyles.profile_form_input} />
                                    {/* {this.props.errors.lastname && <div className={profileStyles.errorMsg}>{this.props.errors.lastname}</div>} */}
                                </div>
                            </div>
                            <div className={profileStyles.profile_form_col_2}>
                                <div className={profileStyles.profile_form_group}>
                                    <label htmlFor="zip_code" className={profileStyles.profile_form_label}>Zip Code</label>
                                    <input  name="zip_code" type="text" className={profileStyles.profile_form_input} />
                                    {/* {this.props.errors.zip_code && <div className={profileStyles.errorMsg}>{this.props.errors.accountname}</div>} */}
                                </div>
                                <div className={profileStyles.profile_form_group}>
                                    <label htmlFor="country" className={profileStyles.profile_form_label}>Country</label>
                                    <input name="country" type="text" className={profileStyles.profile_form_input} />
                                    {/* {this.props.errors.lastname && <div className={profileStyles.errorMsg}>{this.props.errors.lastname}</div>} */}
                                </div>
                            </div>
                            <div className={profileStyles.profile_form_group}>
                                <label htmlFor="address" className={profileStyles.profile_form_label}>
                                Address
                                </label>
                                <input
                                type="tel"
                                name="address"
                                value={address}
                                placeholder="Your Address"
                                onChange={handleChange}
                                className={profileStyles.profile_form_input}
                                />
                            </div>

                            <div className={styles.form_group}>
                                <h3>Upload Profile Picture</h3>

                                <div className={suggestion_form_image}>
                                    <div className={suggestion_form_image_col_1}>
                                    <div className={suggestion_form_image_icon_con}>
                                        <AddIcon className={suggestion_form_image_icon} />
                                    </div>
                                    </div>
                                    <div className={suggestion_form_image_col_2}>
                                    <p>Upload picture with : Jpeg or Png format and not more than 500kb</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.form_group}>
                                <h3>Upload Background Picture</h3>

                                <div className={suggestion_form_image}>
                                    <div className={suggestion_form_image_col_1}>
                                    <div className={suggestion_form_image_icon_con}>
                                        <AddIcon className={suggestion_form_image_icon} />
                                    </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.form_group}>
                                <h3>Description</h3>
                                <div className={suggestion_form_group}>
                                <label htmlFor="intro" className={suggestion_form_label}>
                                    Intro
                                </label>
                                <TextField multiline id="intro" fullWidth variant="outlined" />
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>
                <div className={profileStyles.profile_basic_info_con}>
                    <h3>Set Working Hours</h3>
                    <div className={profileStyles.profile_basic_info}>
                        <div className={profileStyles.profile_workinghours_con}>
                            <p>Configure the standard hours of operation for this store</p>
                            <div className={profileStyles.profile_workinghour_days}>
                                {days.map(day => {
                                return(    
                                    <div className={profileStyles.profile_workinghour_day}>
                                        <h3>{day}</h3>
                                        <div className={profileStyles.profile_workinghour_switch}>
                                        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                        Open
                                        </div>
                                        <div className={profileStyles.profile_workinghour_date}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                value={value}
                                                onChange={setValue}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        </div>
                                        <h4>To</h4>
                                        <div className={profileStyles.profile_workinghour_date}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                value={value}
                                                onChange={setValue}
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
            </div>
            {/* <TransferToInventory /> */}
        </div>
        
        </div>
    )
}

export default CreateStore