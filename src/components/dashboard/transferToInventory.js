import CancelIcon from '@mui/icons-material/Cancel';
import styles from './transferToInventory.module.css';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';
import axios from '../../util/Api';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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

export default function TransferToInventory(props){
    const [restockOption, setRestockOption] = useState()
    const [restockTime, setRestockTime] = useState('1 day')
    const [message, setMessage] = useState('')
    const [formState, setFormState] = useState({
        prepackagedMeal: false,
        ingredientsAvailable: [],
        estimated_preparation_time: 0,
        item_type: 'Meal',
        in_stock: true
      });

      const { ingredientsAvailable, item_type, in_stock } = formState;

    useEffect(() => {
        if(props.type === "Meal" && props.meal.meal_categories.length > 0){
            let ingredientsAvailablee = []
            let ingredients = eval('(' + props.meal.formatted_ingredients[0] + ')')
            for(let i=0; i<ingredients?.length; i++){
                ingredientsAvailablee.push({
                    name: ingredients[i].productName,
                    quantity: ingredients[i].quantity,
                    set_price: '',
                    product_available: true
                })
            }
            setFormState({ ...formState, ['ingredientsAvailable']: ingredientsAvailablee });
        }
        setFormState({ ...formState, ['item_type']: props.type });
    }, [props.meal])
    
    function handleChange(e) {
        const { name, value } = e.target;
        if(name === 'meal_type'){
            if(value === 'packaged'){
                setFormState({ ...formState, [name]: value,  ['prepackagedMeal']: true});
            }else{
                setFormState({ ...formState, [name]: value, ['prepackagedMeal']: false });
            }
        }else{
            setFormState({ ...formState, [name]: value });
        }
        
        console.log(formState)
      };

    function handleInStockChange(value) {
        setFormState({ ...formState, ['in_stock']: value });
    };

    function handleIngredientChange(e,id,key) {
        const { value } = e.target;
        let ingredientsAvailable = formState.ingredientsAvailable;
        ingredientsAvailable[id][key] =  value
        setFormState({ ...formState, ['ingredientsAvailable']: ingredientsAvailable });
    };

    function handleIngredientAvailabilityChange(value,id,key) {
        console.log(value)
        let ingredientsAvailable = formState.ingredientsAvailable;
        ingredientsAvailable[id][key] =  value
        setFormState({ ...formState, ['ingredientsAvailable']: ingredientsAvailable });
    };

    function sendToInventory(){
        let fields = formState;
        delete fields.meal_type
        fields['item'] = props.meal._id
        fields['storeId'] = '63783f54088dda05688af4df'
        axios.post('/inventory/create-inventory', fields).then(response => {
        if (response.status >= 200 && response.status < 300) {
            // this.setState({ booleanOfDisplayOfDialogBoxConfirmation: true });
            console.log(response);
            console.log("Display Item submitted successfully");
            setMessage('Item submitted successfully')
            // window.location.href = "/SuggestMeal"
        } else {
            setMessage('Something wrong happened')
        }
        }).catch(error => {
            setMessage('Item already in store')
            console.log(error);
        });
    }

    function handleRestockTimeChange (type){
        setRestockTime(type)
        toggleRestockTimeOption()
    }

    function toggleRestockTimeOption(){
        setRestockOption(!restockOption)
    }

    return(
        <div className={styles.transToIn_container}>
            <div className={styles.transToIn}>
                <div className={styles.transToIn_top}>
                    <h2>Transfer {' ' + item_type + ' '} to Inventory</h2>
                    <p>{message}</p>
                    <div onClick={props.toggleTransferToInventory}>
                    <CancelIcon className={styles.transToIn_cancel_con} />
                    </div>
                </div>

                <div className={styles.transToIn_details_con}>
                    <div className={styles.transToIn_meal_types}>
                        <p>Choose Meal Type</p>
                        {item_type === "Meal" ? 
                        <div className={styles.transToIn_meal_type}>
                            <div className={styles.transToIn_meal_type_option}>
                                <input
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                        </div>:
                        <div className={styles.transToIn_meal_type}>
                            <div className={styles.transToIn_meal_type_option}>
                                <input
                                onChange={handleChange}
                                className={styles.transToIn_meal_type_radioInput}
                                type="radio"
                                id="Product"
                                name="item_type"
                                value="Product"
                                />
                                <label
                                htmlFor="Product"
                                className={styles.transToIn_meal_type_radio_button}
                                ></label>
                                <label
                                htmlFor="Product"
                                className={styles.transToIn_meal_type_radioLabel}
                                >
                                Product
                                </label>
                                {/* <label
                                htmlFor="Product"
                                className={styles.transToIn_meal_type_radioLabel2}
                                >
                                Includes all the ingredients needed in preparation of this meal
                                </label> */}
                            </div>
                            <div className={styles.transToIn_meal_type_option}>
                                <input
                                className={styles.transToIn_meal_type_radioInput}
                                type="radio"
                                onChange={handleChange}
                                id="Kitchen Utensils"
                                name="item_type"
                                value="Kitchen Utensils"
                                />
                                <label
                                htmlFor="Kitchen Utensils"
                                className={styles.transToIn_meal_type_radio_button}
                                ></label>
                                <label htmlFor="Kitchen Utensils" className={styles.transToIn_meal_type_radioLabel}>
                                Kitchen Utensils
                                </label>
                                {/* <label htmlFor="Kitchen Utensils" className={styles.transToIn_meal_type_radioLabel2}>
                                Meal without the ingredients
                                </label> */}
                            </div>
                        </div>
                        }
                    </div>
                    <div className={styles.transToIn_details_col2}>
                        <div>
                            <h3>Set {' ' + item_type + ' '} Price</h3>
                            <div>
                                <p>Enter {' ' + item_type + ' '} Price</p>
                                <h4>$</h4>
                                <input onChange={handleChange} name='meal_price' />
                            </div>
                        </div>
                        <div>
                            <h3>Set Estimated preparation time</h3>
                            <div>
                                <p>Set time for pickup</p>
                                <input onChange={handleChange} name='estimated_preparation_time' type='number' />
                                <h4>Minutes</h4>
                            </div>
                        </div>
                    </div>

                    <div className={styles.transToIn_details_col3}>
                        <div>
                            <h3>Are the ingredients available in your store</h3>
                            <AntSwitch checked={in_stock} onChange={() => handleInStockChange(in_stock)} inputProps={{ 'aria-label': 'ant design' }} />
                        </div>
                        <div>
                            <h3>Out of Stock? How long before restock</h3>
                            <div className={styles.select_container}>
                                <div onClick={toggleRestockTimeOption} className={styles.select_box}>
                                    <p>{restockTime}</p>
                                    <ArrowDropDownIcon className={styles.select_box_icon} />
                                </div>
                                {restockOption &&
                                    <div className={styles.select_options}>
                                        <p onClick={() => handleRestockTimeChange('1 day')}>1 day</p>
                                        <p onClick={() => handleRestockTimeChange('2 days')}>2 days</p>
                                        <p onClick={() => handleRestockTimeChange('3 days')}>3 days</p>
                                        <p onClick={() => handleRestockTimeChange('About 1 week')}>About 1 week</p>
                                        <p onClick={() => handleRestockTimeChange('2 Weeks')}>2 Weeks</p>
                                        <p onClick={() => handleRestockTimeChange('About 1 month')}>About 1 month</p>
                                        <p onClick={() => handleRestockTimeChange('2 months')}>2 months</p>
                                    </div>}
                            </div>
                        </div>
                    </div>
                    {
                        item_type === 'Meal' &&
                        <div className={styles.transToIn_details_col4}>
                            <p>Set ingredient prices and availability</p>
                            <table className={styles.request_table}>
                                <thead>
                                <div className={styles.request_tr} style={{backgroundColor: 'transparent'}}>
                                    <th className={styles.request_th}>Items</th>
                                    <th className={styles.request_th + " " + styles.hideData}>Quantity</th>
                                    <th className={styles.request_th}>Set Price</th>
                                    <th className={styles.request_th}>Product Available</th>
                                </div>
                                </thead>
                                <tbody>
                                    {ingredientsAvailable.map((ingredient, index) => {
                                        return(
                                            <div className={styles.refId + " " + styles.request_tr}>
                                                <div className={styles.request_td}>{ingredient.name}</div>
                                                <div className={styles.request_td + " " + styles.hideData}><input value={ingredient.quantity} onChange={(e) => handleIngredientChange(e,index,'quantity')} name='meal_price' /></div>
                                                <div className={styles.request_td}>$<input value={ingredient.set_price} onChange={(e) => handleIngredientChange(e,index,'set_price')} name='meal_price' /></div>
                                                <div className={styles.request_td}>
                                                    <AntSwitch checked={ingredient.product_available} onChange={(e) => handleIngredientAvailabilityChange(!ingredient.product_available,index,'product_available')} inputProps={{ 'aria-label': 'ant design' }} />
                                                </div>
                                            </div>
                                        )
                                    })
                                    }

                                </tbody>
                            </table>
                        </div>
                    }
                </div>

                <div className={styles.transToIn_footer}>
                    <button className={styles.transToIn_footer_button} onClick={props.toggleTransferToInventory}>Cancle</button>
                    <button onClick={sendToInventory} className={styles.transToIn_footer_button2}>Confirm</button>
                </div>
            
            </div>
        </div>
    )
}