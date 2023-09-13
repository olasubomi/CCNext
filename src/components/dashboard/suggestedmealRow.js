import { CloseFillIcon, FillterIcon } from '../icons';
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

    const { suggestion } = props;
    
    // console.log(JSON.parse(suggestion.meal_categories).toString(), "meal categories")

    function showDropDown(){
        setShowState(!show)
    }

    return(
        <div key={suggestion._id} className={styles.request_tr_div}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse'
            }}>
                <tbody>
                    <tr className={props.auth.authUser.user_type === 'supplier' ? styles.meal_tr : styles.meal_tr1}>
                        <td className={styles.td_name}>
                            <p
                                onClick={props.auth.authUser.user_type === 'admin'
                                    ? () => props.toggleOpenMeal(suggestion)
                                    : props.searchType === 'Item'
                                        ? () => props.openMealDetailsModal(suggestion)
                                        : () => props.openDetailsModal(suggestion)}
                            >
                                {
                                    (props.auth.authUser.user_type === 'supplier' && props.searchType === 'Item')
                                        ? suggestion.item_name.length > 25
                                            ? suggestion.item_name.slice(0, 25) + '...'
                                            : suggestion.item_name
                                        : (props.searchType === 'Item'
                                            ? suggestion.item_name
                                            : suggestion?.category_name)
                                }






                            </p>
                        </td>
                        <td className={styles.td_name}>
                            <p
                                onClick={props.auth.authUser.user_type === 'admin'
                                    ? () => props.toggleOpenMeal(suggestion)
                                    : props.searchType === 'Item'
                                        ? () => props.openMealDetailsModal(suggestion)
                                        : () => props.openDetailsModal(suggestion)}
                                className={styles.hide}
                            >
                                {props.searchType === 'Item'
                                    ? suggestion.item_type
                                    : props.searchType === 'Product'
                                        ? suggestion.item_type
                                        : suggestion?.category_name}
                            </p>
                        </td>
                        <td className={styles.td_name} >
                            <p
                                onClick={props.auth.authUser.user_type === 'admin'
                                    ? () => props.toggleOpenMeal(suggestion)
                                    : props.searchType === 'Item'
                                        ? () => props.openMealDetailsModal(suggestion)
                                        : () => props.openDetailsModal(suggestion)} className={status + " " +
                                            ((suggestion.item_status[0]?.status === 'Draft' || suggestion.item_status[0]?.status === 'Pending') ? pending :
                                                suggestion.item_status[0]?.status === 'Public'
                                                    ? approve
                                                    : suggestion.item_status[0]?.status === 'Rejected'
                                                        ? rejected : '')}
                            >
                                {props.searchType !== 'Category' ? suggestion.item_status[0]?.status : suggestion.publicly_available}
                                {/* {suggestion.item_status[0].status} */}

                            </p>
                        </td>
                        <td className={styles.td_cat}>
                            <p
                                onClick={props.auth.authUser.user_type === 'admin'
                                    ? () => props.toggleOpenMeal(suggestion)
                                    : props.searchType === 'Item'
                                        ? () => props.openMealDetailsModal(suggestion)
                                        : () => props.openDetailsModal(suggestion)}
                                className={styles.hideData}>
                                {props.searchType === 'Item' ?
                                    suggestion.item_categories.length > 0 && suggestion.item_categories.map(ele => ele?.category_name).join(', ') :
                                    suggestion.product_categories && suggestion.product_categories.length > 0 && suggestion.product_categories[0]
                                }
                            </p>
                        </td>
                        <td className={styles.td_cat}>
                            <p
                                onClick={
                                    props.auth.authUser.user_type === 'admin'
                                        ? () => props.toggleOpenMeal(suggestion)
                                        : props.searchType === 'Item'
                                            ? () => props.openMealDetailsModal(suggestion)
                                            : () => props.openDetailsModal(suggestion)}
                                className={styles.hideData}>
                                {suggestion.createdAt && new Date(suggestion.createdAt).toDateString()}
                            </p>
                        </td>
                        <td className={styles.td_name}>
                            <div className={styles.actions_con}>
                                {props.auth.authUser.user_type !== 'admin' &&
                                    <>
                                        {suggestion.item_status[0]?.status === 'Draft' &&
                                            // <div onClick={() => props.toggleSent(suggestion._id, props.searchType)} className={styles.tableactionbutton}>Send for review</div>
                                            <div onClick={() => props.handleSendForReview(suggestion._id, 'Pending')} className={styles.tableactionbutton}>Send for review</div>

                                        }
                                        {props.auth.authUser.user_type === 'supplier' &&
                                            <>
                                                {suggestion.item_status[0]?.status === 'Public' ?
                                                    <div onClick={() => props.toggleTransferToInventory(suggestion)} className={styles.tableactionbutton} style={{ background: '#F47900', color: 'white', border: 'none' }}>Send for Inventory</div>
                                                    :
                                                    <div className={styles.tableactionbutton} style={{ background: '#D9D9D9', color: 'white', border: 'none' }}>Send for Inventory</div>
                                                }
                                            </>
                                        }
                                    </>
                                }
                                <i className={styles.hideData} onClick={() => {
                                    // props.deleteSuggestion(suggestion._id)
                                    props.deleteItem(suggestion._id)
                                }}>
                                    <CloseFillIcon style={actionIcon} /></i>
                                {show ?
                                    <i onClick={showDropDown} className={styles.showData}>
                                        <ArrowDropUp className={styles.arrowDown} />
                                    </i> :
                                    <i onClick={showDropDown} className={styles.showData}>
                                        <ArrowDropDownIcon className={styles.arrowDown} />
                                    </i>
                                }
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
    

}

export default SuggestedMealRow;