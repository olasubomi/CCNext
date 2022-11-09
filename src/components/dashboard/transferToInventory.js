import CancelIcon from '@mui/icons-material/Cancel';
import styles from './transferToInventory.module.css';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

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

export default function TransferToInventory(){

    return(
        <div className={styles.transToIn_container}>
            <div className={styles.transToIn}>
                <div className={styles.transToIn_top}>
                    <h2>Transfer Meal to Inventory</h2>
                    <CancelIcon className={styles.transToIn_cancel_con} />
                </div>

                <div className={styles.transToIn_details_con}>
                    <div className={styles.transToIn_meal_types}>
                        <p>Choose Meal Type</p>
                        <div className={styles.transToIn_meal_type}>
                            <div className={styles.transToIn_meal_type_option}>
                                <input
                                className={styles.transToIn_meal_type_radioInput}
                                type="radio"
                                id="non packaged"
                                name="meal_type"
                                value="non packaged"
                                />
                                <label
                                htmlFor="non packaged"
                                className={styles.transToIn_meal_type_radio_button}
                                ></label>
                                <label
                                htmlFor="non packaged"
                                className={styles.transToIn_meal_type_radioLabel}
                                >
                                Non-prepackaged meal
                                </label>
                                <label
                                htmlFor="non packaged"
                                className={styles.transToIn_meal_type_radioLabel2}
                                >
                                Includes all the ingredients needed in preparation of this meal
                                </label>
                            </div>
                            <div className={styles.transToIn_meal_type_option}>
                                <input
                                className={styles.transToIn_meal_type_radioInput}
                                type="radio"
                                id="packaged"
                                name="meal_type"
                                value="packaged"
                                />
                                <label
                                htmlFor="packaged"
                                className={styles.transToIn_meal_type_radio_button}
                                ></label>
                                <label htmlFor="packaged" className={styles.transToIn_meal_type_radioLabel}>
                                Prepackaged Meal
                                </label>
                                <label htmlFor="packaged" className={styles.transToIn_meal_type_radioLabel2}>
                                Meal without the ingredients
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.transToIn_details_col2}>
                        <div>
                            <h3>Set Meal Price</h3>
                            <div>
                                <p>Enter Meal Price</p>
                                <h4>$</h4>
                                <input />
                            </div>
                        </div>
                        <div>
                            <h3>Set Estimated preparation time</h3>
                            <div>
                                <p>Set time for pickup</p>
                                <input />
                                <h4>Minutes</h4>
                            </div>
                        </div>
                    </div>

                    <div className={styles.transToIn_details_col3}>
                        <div>
                            <h3>Receive notification for all order activities</h3>
                            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                        </div>
                        <div>
                            <h3>When someone comment on your product</h3>
                            <p>Set Time</p>
                            <select>
                                <option>1 day</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.transToIn_details_col4}>
                        <p>Set ingredient prices and availability</p>
                        <table className={styles.request_table}>
                            <thead>
                            <tr className={styles.request_tr} style={{backgroundColor: 'transparent'}}>
                                <th className={styles.request_th}>Items</th>
                                <th className={styles.request_th}>Quantity</th>
                                <th className={styles.request_th}>Set Price</th>
                                <th className={styles.request_th}>Product Available</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr className={styles.refId + " " + styles.request_tr}>
                                    <td className={styles.request_td}>dfdsf</td>
                                    <td className={styles.request_td}>saf</td>
                                    <td className={styles.request_td}>asf</td>
                                    <td className={styles.request_td}>
                                        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                    </td>
                                </tr>
                                <tr className={styles.refId + " " + styles.request_tr}>
                                    <td className={styles.request_td}>dfdsf</td>
                                    <td className={styles.request_td}>saf</td>
                                    <td className={styles.request_td}>asf</td>
                                    <td className={styles.request_td}>
                                        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.transToIn_footer}>
                    <button className={styles.transToIn_footer_button}>Cancle</button>
                    <button className={styles.transToIn_footer_button2}>Confirm</button>
                </div>
            
            </div>
        </div>
    )
}