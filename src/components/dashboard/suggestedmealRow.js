import { CloseFillIcon } from '../icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './suggestedmeals.module.css'
import {status, approve, pending, rejected, actionIcon } from './dashboard.module.css'
import { useState } from 'react';
import { ArrowDropUp } from '@mui/icons-material';
function SuggestedMealRow(props){
    const [show, setShowState] = useState(false)
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]

    const {meal} = props;

    function showDropDown(){
        setShowState(!show)
    }

    return(
        <div className={styles.request_tr_div}>
            <tr key={meal._id} className={styles.refId + " " + styles.request_tr}style={
                props.auth.authUser.user_type === 'admin' ? {backgroundColor: 'transparent', gridTemplateColumns: 'max-content 8% 10% 12% 12% 14% 5%'}:
                props.auth.authUser.user_type === 'customer' ? {backgroundColor: 'transparent', gridTemplateColumns: 'max-content 8% 10% 12% 12% 14% 22%'}:
                props.auth.authUser.user_type === 'supplier' ? {backgroundColor: 'transparent', gridTemplateColumns: 'max-content 8% 10% 12% 12% 14% 28%'}: {backgroundColor: 'transparent'}
                }>
                <input name='id' type="checkbox" />
                <td onClick={() => props.toggleOpenMeal(meal)} className={styles.request_td}>{meal._id}</td>
                <td onClick={() => props.toggleOpenMeal(meal)} className={styles.request_td}>{meal.meal_name}</td>
                <td onClick={() => props.toggleOpenMeal(meal)} className={styles.request_td + " " + status + " " + 
                    ((meal.publicly_available === 'Draft' || meal.publicly_available === 'Pending') ? pending :
                    meal.publicly_available === 'Public' ? approve :
                    meal.publicly_available === 'Rejected' ? rejected : '')}
                >
                    {meal.publicly_available}
                </td>
                <td onClick={() => props.toggleOpenMeal(meal)} className={styles.request_td + " " + styles.hideData}>{meal.meal_categories && meal.meal_categories.length > 0 && JSON.parse(meal.meal_categories[0])[0]}</td>
                <td onClick={() => props.toggleOpenMeal(meal)} className={styles.request_td + " " + styles.hideData}>{meal.createdAt && new Date(meal.createdAt).getDate() + ' ' + months[new Date(meal.createdAt).getMonth()] + ' ,'+ new Date(meal.createdAt).getFullYear()}</td>
                <td className={styles.request_td + " " + styles.actions_con}>
                    {props.auth.authUser.user_type !== 'admin' &&
                    <>
                        <div className={styles.tableactionbutton}>Send for review</div>
                        {props.auth.authUser.user_type === 'supplier' &&
                            <div onClick={props.toggleTransferToInventory} className={styles.tableactionbutton} style={{background: '#F47900', color:'white', border: 'none'}}>Send for Inventory</div> 
                        }
                    </>
                    }
                    <i className={styles.hideData} onClick={() => deleteMeal(meal._id)}>
                    <CloseFillIcon style={actionIcon} /></i>
                    {show ? 
                    <i onClick={showDropDown} className={styles.showData}>
                        <ArrowDropUp className={styles.arrowDown} />
                    </i>:
                    <i onClick={showDropDown} className={styles.showData}>
                        <ArrowDropDownIcon className={styles.arrowDown} />
                    </i>
                    }
                </td>
            </tr>
            {show &&
            <div className={styles.suggested_details_col}>
                <div className={styles.suggested_categories}>
                    <h3 className={styles.suggested_category_name}>Category</h3>
                    <p className={styles.suggested_category}>{meal.meal_categories && meal.meal_categories.length > 0 && JSON.parse(meal.meal_categories[0])[0]}</p>
                </div>
                <div className={styles.suggested_categories}>
                    <h3 className={styles.suggested_category_name}>Date</h3>
                    <p className={styles.suggested_category}>{meal.createdAt && new Date(meal.createdAt).getDate() + ' ' + months[new Date(meal.createdAt).getMonth()] + ' ,'+ new Date(meal.createdAt).getFullYear()}</p>
                </div>

                <div className={styles.suggested_categories}>
                    <h3 className={styles.suggested_category_name}>Action</h3>
                    <p onClick={() => deleteMeal(meal._id)} className={styles.suggested_category + " " + styles.redtext}>Remove</p>
                </div>
            </div>
            }
        </div>
    )
    
}

export default SuggestedMealRow;