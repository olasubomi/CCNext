
import Header from '../../src/components/Header/Header';
import SideNav from '../../src/components/Header/sidenav';
import {container, col2, left, empty, center, status, approve, pending, rejected, actionIcon } from '../../src/components/dashboard/dashboard.module.css'
import { center_h3 } from '../../src/components/dashboard/profile.module.css'
import styles from '../../src/components/dashboard/suggestedmeals.module.css'
import { CloseFillIcon, FillterIcon, MessageIcon } from '../../src/components/icons';
import Link from 'next/link';
import Sidenav2 from '../../src/components/Header/sidenav2';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import axios from '../../src/util/Api';

const SuggestedMeals = (props) => {
    const router = useRouter()
    const [addPublicMeal, setAddPublicMeal] = useState()
    const [searchType, setSearchType] = useState('Meal')
    const [searchOption, setSearchOption] = useState()
    const [search, setSearchState] = useState(false)
    const [showReason, setShowReasonState] = useState(false)

    useEffect(() => {
        axios.get('/meals/get-meals/1').then(data => {
            console.log(data)
        })
      }, []);

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

    // search = (e) => {
    //     let url = window.location.href;
    //     if(e.keyCode){
    //       if(e.keyCode === 13){
            
    //           window.location.replace("/search/" + this.state.searchName);
    //       }
    //     }else{
    //         window.location.replace("/search/" + this.state.searchName);
    //     }
    //     // searchProduct(this.state.searchName)
    //     // .then(res => {
    //     //     this.props.history.push('/product/')
    //     // })
    // };

    function toggleSearch(){
        setSearchState(!search);
    };

    function toggleShowReason(){
        setShowReasonState(!showReason)
    }

    return (
    <div className={container + " " + col2}>
        <Header />
        <SideNav />
        <div className={left}>
            <Sidenav2 showBottom={false} />
        </div>
        <div className={empty}></div>
        <div className={center}>
            <h3>Suggested Meal/Products</h3>
            {props.auth.authUser &&
            <div className={styles.suggestedmeal_container}>
                <div className={styles.suggestedmeal_search_con}>
                    <div className={styles.search_con}>
                        <div className={styles.search_box}>
                            <p className={styles.search_icon}>
                                <SearchIcon className={styles.search_icon} />
                            </p>
                            <input
                            type="text"
                            name="search"
                            className={styles.search_input}
                            placeholder="Search for products"
                            />
                        </div>
                        <div className={styles.search_button}>Search</div>
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
                    <tr className={styles.request_tr} style={{backgroundColor: 'transparent'}}>
                        <input name='id' type="checkbox" />
                        <th className={styles.request_th}>ID number</th>
                        <th className={styles.request_th}>Name</th>
                        <th className={styles.request_th}>Status <FillterIcon /></th>
                        <th className={styles.request_th}>Categories <FillterIcon /></th>
                        <th className={styles.request_th}>Date Created <FillterIcon /></th>
                        <th className={styles.request_th} style={{textAlign: 'center'}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.refId + " " + styles.request_tr}>
                            <input name='id' type="checkbox" />
                            <td className={styles.request_td}>dfdsf</td>
                            <td className={styles.request_td}>saf</td>
                            <td className={styles.request_td + " " + status + " " + pending}>asf</td>
                            <td className={styles.request_td}>safa</td>
                            <td className={styles.request_td}>afa</td>
                            <td className={styles.request_td + " " + styles.actions_con}>
                                {props.auth.authUser.user_type !== 'admin' &&
                                <>
                                    <div className={styles.tableactionbutton}>Send for review</div>
                                    {props.auth.authUser.user_type === 'supplier' &&
                                        <div className={styles.tableactionbutton} style={{background: 'F47900', color:'white'}}>Send for Inventory</div> 
                                    }
                                </>
                                }
                                <CloseFillIcon style={actionIcon} />
                            </td>
                        </tr>
                        <tr className={styles.refId + " " + styles.request_tr}>
                            <input name='id' type="checkbox" />
                            <td className={styles.request_td}>dfdsf</td>
                            <td className={styles.request_td}>saf</td>
                            <div className={styles.actions_con}>
                                <td className={styles.request_td + " " + status + " " + rejected}>asf </td>
                                <p onMouseEnter={toggleShowReason} onMouseLeave={toggleShowReason}><MessageIcon /></p>
                                {showReason &&
                                <div className={styles.rejection_con}>
                                    <div className={styles.actions_con_col1}>
                                        <h3>Reason for rejection</h3>
                                    </div>
                                    <div className={styles.actions_con_col2}>
                                        <h2>Publishes undesirable content</h2>
                                        <div className={styles.line}></div>
                                        <p>
                                        User reports that the images sometimes "fuzz out" 
                                        or have a period where the image quality is low 
                                        resolution
                                        </p>
                                    </div>
                                </div>}
                            </div>
                            <td className={styles.request_td}>safa</td>
                            <td className={styles.request_td}>afa</td>
                            <td className={styles.request_td+ " " + styles.actions_con}>
                                {props.auth.authUser.user_type !== 'admin' &&
                                <>
                                    <div className={styles.tableactionbutton}>Send for review</div>
                                    {props.auth.authUser.user_type === 'supplier' &&
                                        <div className={styles.tableactionbutton}>Send for Inventory</div> 
                                    }
                                </>
                                }
                                <CloseFillIcon style={styles.actionIcon} />
                            </td>
                        </tr>

                    </tbody>
                </table>
                </div>
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
                        className={styles.search_input}
                        placeholder="Search for products"
                        />
                        {search &&
                        <div className={styles.search_container}>
                            <div className={styles.search_container_col_1}>
                                
                                <div className={styles.search_suggestion}>
                                    <h3 className={styles.search_suggestion_h3}>Top Categories</h3>
                                    <ul className={styles.search_suggestion_lists}></ul>
                                </div>
                                <div className={styles.search_help}>
                                    <h3 className={styles.search_help_h3}>How can we help?</h3>
                                    <ul className={styles.search_help_lists}>
                                    <li className={styles.search_help_list}>
                                        <Link href="/appointment-booking">
                                        <a>
                                        Appointment Booking
                                        </a></Link>
                                    </li>
                                    <li className={styles.search_help_list}>
                                        <Link href="/inspiration">
                                        <a>
                                        Inspiration
                                        </a></Link>
                                    </li>
                                    <li className={styles.search_help_list}>
                                    <Link href="/showroom"><a>Showrooms</a></Link>
                                    </li>
                                    <li className={styles.search_help_list}>
                                        <Link href="/faqs"><a>FAQs</a></Link>
                                    </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.search_container_col_2}>
                                <div className={styles.search_container_col_2_row_1}>
                                    <h3 className={styles.search_products_h3}>Products</h3>
                                    <Link href="/products">
                                    <a className="view-all">
                                    View all
                                    </a></Link>
                                </div>
                                <div className={styles.search_container_col_2_row_2}>
                                    <div className={styles.searched_products}>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className={styles.search_button}>Search</div>
                </div>
            </div>
            
        </div>}
        
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