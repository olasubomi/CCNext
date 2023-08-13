import { CloseFillIcon, FillterIcon } from '../icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './suggestedmeals.module.css'
import { status, approve, pending, rejected, actionIcon } from './dashboard.module.css'
import { useState } from 'react';
import { ArrowDropUp } from '@mui/icons-material';
function SuggestedMealRow(props) {
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

    function showDropDown() {
        setShowState(!show)
    }

    return (
        <div key={suggestion._id} className={styles.request_tr_div}>
            
            <div className={styles.refId + " " + styles.request_tr}>
                {/* <p onClick={props.auth.authUser.user_type === 'admin' ? () => props.toggleOpenMeal(suggestion): props.searchType === 'Meal' ? () => props.openMealDetailsModal(suggestion) : () => props.openDetailsModal(suggestion)} className={styles.request_td}>{suggestion._id}</p> */}
                <div className={styles.statuses1}>
                <p
                    onClick={props.auth.authUser.user_type === 'admin'
                        ? () => props.toggleOpenMeal(suggestion)
                        : props.searchType === 'Meal'
                            ? () => props.openMealDetailsModal(suggestion)
                            : () => props.openDetailsModal(suggestion)}
                    className={styles.request_td}>
                    {props.searchType === 'Meal'
                        ? suggestion.item_name
                        : props.searchType === 'Product'
                            ? suggestion.item_name
                            : suggestion.category_name}
                </p>
                </div>
                <div className={styles.statuses}>
                <p
                    onClick={props.auth.authUser.user_type === 'admin'
                        ? () => props.toggleOpenMeal(suggestion)
                        : props.searchType === 'Meal'
                            ? () => props.openMealDetailsModal(suggestion)
                            : () => props.openDetailsModal(suggestion)} className={styles.td + " " + status + " " +
                                ((suggestion.item_status[0].status === 'Draft' || suggestion.item_status[0].status === 'Pending') ? pending :
                                    suggestion.item_status[0].status === 'Public'
                                        ? approve
                                        : suggestion.item_status[0].status === 'Rejected'
                                            ? rejected : '')}
                >
                    {props.searchType !== 'Category' ? suggestion.item_status[0].status : suggestion.publicly_available}
                    {/* {suggestion.item_status[0].status} */}

                </p>
                </div>
               <div className={styles.statuses1}>
               <p
                    onClick={props.auth.authUser.user_type === 'admin'
                        ? () => props.toggleOpenMeal(suggestion)
                        : props.searchType === 'Meal'
                            ? () => props.openMealDetailsModal(suggestion)
                            : () => props.openDetailsModal(suggestion)}
                    className={styles.request_td + " " + styles.hideData}>
                    {props.searchType === 'Meal' ?
                        suggestion.item_categories.length > 0 && suggestion.item_categories.map(ele => ele?.category_name).join(', ') :
                        suggestion.product_categories && suggestion.product_categories.length > 0 && suggestion.product_categories[0]
                    }
                </p>
               </div>
               <div className={styles.statuses1}>
               <p
                    onClick={
                        props.auth.authUser.user_type === 'admin'
                            ? () => props.toggleOpenMeal(suggestion)
                            : props.searchType === 'Meal'
                                ? () => props.openMealDetailsModal(suggestion)
                                : () => props.openDetailsModal(suggestion)}
                    className={styles.request_td + " " + styles.hideData}>
                    {suggestion.createdAt && new Date(suggestion.createdAt).toDateString()}
                </p>
               </div>
              <div className={styles.statuses2}>
              <div className={styles.request_td + " " + styles.actions_con}>
                    {props.auth.authUser.user_type !== 'admin' &&
                        <>
                            {suggestion.item_status[0].status === 'Draft' &&
                                // <div onClick={() => props.toggleSent(suggestion._id, props.searchType)} className={styles.tableactionbutton}>Send for review</div>
                                <div onClick={() => props.handleSendForReview(suggestion._id, 'Pending')} className={styles.tableactionbutton}>Send for review</div>

                            }
                            {props.auth.authUser.user_type === 'supplier' &&
                                <>
                                    {suggestion.item_status[0].status === 'Public' ?
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
              </div>
            </div>
          
            {show &&
                <div className={styles.suggested_details_col}>
                    <div className={styles.suggested_categories}>
                        <h3 className={styles.suggested_category_name}>Category</h3>
                        <p className={styles.suggested_category}>
                            {props.searchType === 'Meal' ?
                                suggestion.meal_categories && suggestion.meal_categories.length > 0 && suggestion.meal_categories :
                                suggestion.product_categories && suggestion.product_categories.length > 0 && suggestion.product_categories[0]
                            }
                        </p>
                    </div>
                    <div className={styles.suggested_categories}>
                        <h3 className={styles.suggested_category_name}>Date</h3>
                        <p className={styles.suggested_category}>{suggestion.createdAt && new Date(suggestion.createdAt).getDate() + ' ' + months[new Date(suggestion.createdAt).getMonth()] + ' ,' + new Date(suggestion.createdAt).getFullYear()}</p>
                    </div>

                    <div className={styles.suggested_categories}>
                        <h3 className={styles.suggested_category_name}>Action</h3>
                        <p onClick={() => props.deleteSuggestion(suggestion._id)} className={styles.suggested_category + " " + styles.redtext}>Remove</p>
                    </div>
                </div>
            }
           
        </div>
    )

}

export default SuggestedMealRow;