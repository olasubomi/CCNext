
import Header from '../../src/components/Header/Header';
import SideNav from '../../src/components/Header/sidenav';
import {container, col2, left, empty, center, status, approve, pending, rejected, actionIcon } from '../../src/components/dashboard/dashboard.module.css'
import styles from '../../src/components/dashboard/suggestedmeals.module.css'
import { CloseFillIcon, FillterIcon } from '../../src/components/icons';
import Link from 'next/link';
import Sidenav2 from '../../src/components/Header/sidenav2';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import axios from '../../src/util/Api';
import Meal from '../../src/components/individualPage/Meal';
import WestIcon from '@mui/icons-material/West';
import TransferToInventory from '../../src/components/dashboard/transferToInventory';
import SuggestedMealRow from '../../src/components/dashboard/suggestedmealRow';
import Sent from '../../src/components/dashboard/sent';

const SuggestedMeals = (props) => {
    const router = useRouter()
    const [addPublicMeal, setAddPublicMeal] = useState()
    const [searchType, setSearchType] = useState('Meal')
    const [searchOption, setSearchOption] = useState()
    const [search, setSearchState] = useState(false)
    const [showReason, setShowReasonState] = useState(false)
    const [meals, setMealsState] = useState([])
    const [publicMeals, setPublicMealsState] = useState([])
    const [meal, setMealState] = useState({})
    const [filteredMeals, setFilteredMealsState] = useState([])
    const [searchSuggestedMeal, setSearchSuggestedMealState] = useState('')
    const [openMeal, setOpenMealState] = useState(false)
    const [changeStatus, setChangeStatusState] = useState(false)
    const [transferToInventory, setTransferToInventoryState] = useState(false)
    const [sent, setSentState] = useState(false)
    const [statusType, setStatusTypeState] = useState('')
    const [page, setPageState] = useState(1);
    const [pages, setPagesState] = useState(1);
    const [mealCount, setMealCountState] = useState(0);
    

    useEffect(() => {
        if(props.auth.authUser){
            if(props.auth.authUser.user_type === 'admin'){
                axios.get('/meals/get-meals/'+page).then(data => {
                    console.log(data.data)
                    if(data.data.data){
                        setMealsState(data.data.data.meals)
                        setMealCountState(data.data.data.count)
                        if(data.data.data.count > 10){
                            setPagesState(Math.ceil(data.data.data.count/10))
                        }
                        setFilteredMealsState(data.data.data.meals)
                    }
                })
            }else{
                axios.get('/meals/get-meals/'+page+'?user='+props.auth.authUser._id).then(data => {
                    console.log(data.data)
                    if(data.data.data){
                        setMealsState(data.data.data.meals)
                        setMealCountState(data.data.data.count)
                        if(data.data.data.count > 10){
                            setPagesState(Math.ceil(data.data.data.count/10))
                        }
                        setFilteredMealsState(data.data.data.meals)
                    }
                })
            }
        }
      }, [props.auth]);

    function togglePublicMeal(){
        setAddPublicMeal(!addPublicMeal)
    }

    function handleSearchType (type){
        setSearchType(type)
        toggleSearchOption()
    }

    function toggleSearchOption(){
        setSearchOption(!searchOption)
    }

    function handleSearch(e){
        setSearchSuggestedMealState(e.target.value);
        // if(e.target.value.length>=1){
        //   let url = window.location.href;
        //   let value;
        //   value = { name: e.target.value }
        //   productSuggestion(value).then(res => {
        //     console.log(res)
        //     if(res.data.data.products){
        //       this.setState({
        //         queryResults: res.data.data.products.items
        //       })
        //     }
        //     if(res.data.data.products){
        //       this.setState({
        //         suggestionResults: res.data.data.products.items
        //       })
        //     }
        //   })
        // }
        
      };
    
      function searchSuggested(e) {
        if(e.keyCode){
          if(e.keyCode === 13){
            if(searchSuggestedMeal.length>0){
                let newMeals = meals.filter((meal) => {
                    return meal.meal_name.includes(searchSuggestedMeal) || meal.intro.includes(searchSuggestedMeal) ||
                    meal._id.includes(searchSuggestedMeal)
                })
                console.log(newMeals)
                setFilteredMealsState(newMeals)
            }
              
          }
        }else{
            if(searchSuggestedMeal.length>0){
                let newMeals = meals.filter((meal) => {
                    return meal.intro.includes(searchSuggestedMeal) || meal.meal_name.includes(searchSuggestedMeal) || 
                    meal._id.includes(searchSuggestedMeal)
                })
                setFilteredMealsState(newMeals)
            }
        }
      };

    function toggleSearch(){
        setSearchState(!search);
    };

    function toggleShowReason(){
        setShowReasonState(!showReason)
    }

    function toggleOpenMeal(meal){
        setMealState(meal)
        setOpenMealState(true)
    }

    function closeMeal(){
        setOpenMealState(false)
    }

    function toggleChangeStatus(){
        setChangeStatusState(!changeStatus)
    }

    function handleStatusType(type) {
        setStatusTypeState(type)
        axios.post('/meals/update/'+meal._id, {publicly_available: type}).then(res => {
            if(res.data.data){
                setMealState(res.data.data)
                if(props.auth.authUser.user_type === 'admin'){
                    axios.get('/meals/get-meals/1').then(data => {
                        console.log(data.data)
                        if(data.data.data){
                            setMealsState(data.data.data.meals)
                            setMealCountState(data.data.data.count)
                            if(data.data.data.count > 10){
                                setPagesState(Math.ceil(data.data.data.count/10))
                            }
                            setFilteredMealsState(data.data.data.meals)
                        }
                    })
                }else{
                    axios.get('/meals/get-meals/1?user='+props.auth.authUser._id).then(data => {
                        console.log(data.data)
                        if(data.data.data){
                            setMealsState(data.data.data.meals)
                            setMealCountState(data.data.data.count)
                            if(data.data.data.count > 10){
                                setPagesState(Math.ceil(data.data.data.count/10))
                            }
                            setFilteredMealsState(data.data.data.meals)
                        }
                    })
                }
            }
        })
        toggleChangeStatus()
    }

    function deleteMeal(id){
        axios.delete('/meals/delete/'+id).then(res => {
            console.log(res.data)
            if(props.auth.authUser.user_type === 'admin'){
                axios.get('/meals/get-meals/1').then(data => {
                    console.log(data.data)
                    if(data.data.data){
                        setMealsState(data.data.data.meals)
                        setMealCountState(data.data.data.count)
                        if(data.data.data.count > 10){
                            setPagesState(Math.ceil(data.data.data.count/10))
                        }
                        setFilteredMealsState(data.data.data.meals)
                    }
                })
            }else{
                axios.get('/meals/get-meals/1?user='+props.auth.authUser._id).then(data => {
                    console.log(data.data)
                    if(data.data.data){
                        setMealsState(data.data.data.meals)
                        setMealCountState(data.data.data.count)
                        if(data.data.data.count > 10){
                            setPagesState(Math.ceil(data.data.data.count/10))
                        }
                        setFilteredMealsState(data.data.data.meals)
                    }
                })
            }
        })
    }

    function toggleTransferToInventory(){
        setTransferToInventoryState(!transferToInventory)
    }

    function toggleSent(){
        setSentState(!sent)
    }

    function handleSearchPublicMeal(e){
        setSearchSuggestedMealState(e.target.value);
        setSearchState(true)
        if(e.target.value.length>=1){
            axios.get('/meals/get-meals/1?publicly_available=Public&meal_name='+e.target.value).then(data => {
                console.log(data.data)
                if(data.data.data){
                    setPublicMealsState(data.data.data.meals)
                }
            })
        }
        
    };

    function addMeal(meal){
        meal.user = props.auth.authUser._id
        meal.chef = props.auth.authUser.username
        meal.publicly_available = 'Draft'
        let newMeals = meals
        delete meal._id
        axios.post('/meals/create', meal).then(response => {
            if (response.status >= 200 && response.status < 300) {
                console.log(response.data)
                newMeals.push(response.data.data)
                setMealsState(newMeals)
                setFilteredMealsState(newMeals)

            } else {
              console.log("Something wrong happened ");
            }
          }).catch(error => {
            console.log(error);
          });
    }

    async function nextPage () {
        if(page < pages){
            let newPage = page + 1;
            setPageState(newPage)
            if(props.auth.authUser.user_type === 'admin'){
                axios.get('/meals/get-meals/'+newPage).then(data => {
                    console.log(data.data)
                    if(data.data.data){
                        setMealsState(data.data.data.meals)
                        setMealCountState(data.data.data.count)
                        if(data.data.data.count > 10){
                            setPagesState(Math.ceil(data.data.data.count/10))
                        }
                        setFilteredMealsState(data.data.data.meals)
                    }
                })
            }else{
                axios.get('/meals/get-meals/'+newPage+'?user='+props.auth.authUser._id).then(data => {
                    console.log(data.data)
                    if(data.data.data){
                        setMealsState(data.data.data.meals)
                        setMealCountState(data.data.data.count)
                        if(data.data.data.count > 10){
                            setPagesState(Math.ceil(data.data.data.count/10))
                        }
                        setFilteredMealsState(data.data.data.meals)
                    }
                })
            }
        }
      };
    
      async function prevPage () {
        if(page > 1){
            let newPage = page - 1;
            setPageState(newPage)
            if(props.auth.authUser.user_type === 'admin'){
                axios.get('/meals/get-meals/'+newPage).then(data => {
                    console.log(data.data)
                    if(data.data.data){
                        setMealsState(data.data.data.meals)
                        setMealCountState(data.data.data.count)
                        if(data.data.data.count > 10){
                            setPagesState(Math.ceil(data.data.data.count/10))
                        }
                        setFilteredMealsState(data.data.data.meals)
                    }
                })
            }else{
                axios.get('/meals/get-meals/'+newPage+'?user='+props.auth.authUser._id).then(data => {
                    console.log(data.data)
                    if(data.data.data){
                        setMealsState(data.data.data.meals)
                        setMealCountState(data.data.data.count)
                        if(data.data.data.count > 10){
                            setPagesState(Math.ceil(data.data.data.count/10))
                        }
                        setFilteredMealsState(data.data.data.meals)
                    }
                })
            }
        }
      };

    return (
    <div className={container + " " + col2}>
        <Header />
        <SideNav />
        <div className={left}>
            <Sidenav2 showBottom={false} />
        </div>
        <div className={empty}></div>
        <div className={center}>
            {!openMeal &&
            <>
                <h3>Suggested Meal/Products</h3>
                {props.auth.authUser &&
                <div className={styles.suggestedmeal_container}>
                    <div className={styles.suggestedmeal_search_con}>
                        <div className={styles.search_con}>
                            <div className={styles.search_box}>
                                <p onClick={searchSuggested} className={styles.search_icon}>
                                    <SearchIcon className={styles.search_icon} />
                                </p>
                                <input
                                type="text"
                                name="search"
                                onChange={handleSearch}
                                onKeyUp={searchSuggested}
                                className={styles.search_input}
                                placeholder="Search for products"
                                />
                            </div>
                            <div className={styles.search_button} onClick={searchSuggested}>Search</div>
                        </div>
                        {props.auth.authUser.user_type === 'customer' &&
                        <Link href='/dashboard/createstore'><a>Create Store</a></Link>}
                    </div>
                    <div className={styles.suggestedmeal_row2}>
                        <h3>Items</h3>
                        {props.auth.authUser.user_type !== 'admin' &&
                        <div>
                            <h5>Remove Sections(s)</h5>
                            <div>
                                <div onClick={togglePublicMeal} className={styles.tableactionbutton}>+ Add public meal</div>
                                <div className={styles.tableactionbutton}>
                                    <Link href='/suggestmeal' >
                                        <a>
                                            + New Suggestion
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                    <div className={styles.suggestedmeal}>
                    <table className={styles.request_table}>
                        <thead>
                        <tr className={styles.request_tr + ' ' + (props.auth.authUser.user_type === 'admin' ? styles.admin_request_tr:
                            props.auth.authUser.user_type === 'customer' ? styles.customer_request_tr:
                            props.auth.authUser.user_type === 'supplier' ? styles.supplier_request_tr: '')}>
                            <input name='id' type="checkbox" />
                            <th className={styles.request_th}>ID number</th>
                            <th className={styles.request_th}>Name</th>
                            <th className={styles.request_th} style={{justifySelf: 'center'}}>Status <FillterIcon /></th>
                            <th className={styles.request_th + " " + styles.hideData}>Categories <FillterIcon /></th>
                            <th className={styles.request_th + " " + styles.hideData}>Date Created <FillterIcon /></th>
                            <th className={styles.request_th} style={{textAlign: 'center'}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                filteredMeals.map((meal) => {
                                    return(
                                        <SuggestedMealRow deleteMeal={deleteMeal} toggleSent={toggleSent} toggleTransferToInventory={toggleTransferToInventory} auth={props.auth} key={meal._id} meal={meal} toggleOpenMeal={toggleOpenMeal} />
                                    )
                                })
                            }

                        </tbody>
                    </table>
                    {mealCount > 0 &&
                    <div className={styles.user_pagination}>
                        <div>
                            {
                                page > 1 &&
                                <div onClick={prevPage} className={styles.paginate_btn}>Prev</div>
                            }
                            {
                                page < pages &&
                                <div onClick={nextPage} className={styles.paginate_btn}>Next</div>
                            }
                            
                        </div>
                        <p>{'' + page + ' of ' + pages}</p>
                    </div>
                    }
                    </div>
                </div>
                }
            </>
            }
            {openMeal &&
                <div>
                    <div className={styles.meal_section_1}>
                        <div className={styles.meal_section_1_col_1}>
                            <ul className={styles.goback_header_pages}>
                                <div onClick={closeMeal}><WestIcon className={styles.goback_header_page_arrow} /></div>
                                <li onClick={closeMeal}>
                                    back
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.meal_section_1}>
                        <div className={styles.meal_section_1_col_1}>
                            <h3>Meal Description</h3>
                        </div>
                        <div className={styles.meal_section_1_col_2}>
                            {/* <p className={styles.meal_section_1_col_2_p}> Choose type</p> */}
                            <div className={styles.select_container}>
                                <div onClick={toggleChangeStatus} className={styles.select_box}>
                                    <p>{statusType.length > 0 ? statusType : meal.publicly_available}</p>
                                    <ArrowDropDownIcon className={styles.select_box_icon} />
                                </div>
                                {changeStatus &&
                                    <div className={styles.select_options2}>
                                        <p onClick={() => handleStatusType('Public')}>Public</p>
                                        <p onClick={() => handleStatusType('Pending')}>Pending</p>
                                        <p onClick={() => handleStatusType('Rejected')}>Rejected</p>
                                    </div>}
                            </div>
                            <p className={status + " " + 
                            ((meal.publicly_available === 'Draft' || meal.publicly_available === 'Pending') ? pending :
                            meal.publicly_available === 'Public' ? approve :
                            meal.publicly_available === 'Rejected' ? rejected : '')}>
                                {meal.publicly_available}
                            </p>
                        </div>
                    </div>
                    <Meal meal={meal} />
                </div>
            }
        </div>
        
        {addPublicMeal && 
        <div className={styles.addpublicMeal_container}>
            <div className={styles.addpublicMeal}>
                <div className={styles.addpublicMeal_top}>
                    <h2>Add meal from the store</h2>
                    <div onClick={togglePublicMeal}>
                        <CloseFillIcon style={styles.addpublicMeal_top_close} />
                    </div>
                </div>
                <div className={styles.search_con2}>
                    <div className={styles.select_container}>
                        <div onClick={toggleSearchOption} className={styles.select_box}>
                            <p>{searchType}</p>
                            <ArrowDropDownIcon className={styles.select_box_icon} />
                        </div>
                        {searchOption &&
                            <div className={styles.select_options}>
                                <p onClick={() => handleSearchType('Meal')}>Meals</p>
                                <p onClick={() => handleSearchType('Product')}>Products</p>
                                <p onClick={() => handleSearchType('Kitchen Utensil')}>Kitchen Utensils</p>
                                <p onClick={() => handleSearchType('Category')}>Category</p>
                            </div>}
                    </div>
                    <div onClick={toggleSearch} className={styles.search_box}>
                        <p className={styles.search_icon}>
                            <SearchIcon className={styles.search_icon} />
                        </p>
                        <input
                        type="text"
                        name="search"
                        onChange={handleSearchPublicMeal}
                        className={styles.search_input}
                        placeholder="Search for products"
                        />
                        {search &&
                        <div className={styles.search_container}>
                            <div className={styles.search_container_col_1}>
                                
                                <div className={styles.search_suggestion}>
                                    <h3 className={styles.search_suggestion_h3}>Meals (1)</h3>
                                    <ul className={styles.search_help_lists}>
                                        {publicMeals.map(meal => {
                                            return(
                                                <li onClick={() => addMeal(meal)} className={styles.search_help_list}>
                                                    {meal.meal_name}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>

                                <div className={styles.search_container_col_2}>
                                    <div className={styles.search_container_col_2_row_1}>
                                        <h3 className={styles.search_products_h3}>Products</h3>
                                        <ul className={styles.search_help_lists}>
                                            
                                        </ul>
                                    </div>
                                    <div className={styles.search_container_col_2_row_2}>
                                        <div className={styles.searched_products}>
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.search_help}>
                                    <h3 className={styles.search_help_h3}>Kitchen Utensils</h3>
                                    
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className={styles.search_button}>Search</div>
                </div>
            </div>
            
        </div>}

        {transferToInventory && 
            <TransferToInventory toggleTransferToInventory={toggleTransferToInventory} />
        }

        {sent && 
            <Sent toggleSent={toggleSent} />
        }
        
    </div>
    )
}

// export default SuggestedMeals

function mapStateToProp(state) {
    return {
      auth: state.Auth
    };
  }
  
  export default connect(
    mapStateToProp,
  )(SuggestedMeals);