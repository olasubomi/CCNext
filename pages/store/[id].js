import { useRouter } from 'next/router';
import Head from "next/head";
import Store from '../../src/components/individualPage/Store';
import {meal_container} from "../../src/components/individualPage/meal.module.css";
import Header, { Header2 } from '../../src/components/Header/Header';
import Sidenav from '../../src/components/Header/sidenav';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../../src/components/individualPage/store.module.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WestIcon from '@mui/icons-material/West';

const IndividualStorePage = () => {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Chop Chow Store Page</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Header2 />
            <Sidenav />
            <div className={meal_container}>
                {/* <div className={styles.meal_section_1}>
                    <div className={styles.meal_section_1_col_1}>
                        <GoBack />
                    </div>
                    <div className={styles.meal_section_1_col_2}>
                        <p className={styles.meal_section_1_col_2_p}> Choose type</p>
                        <div className={styles.select_container}>
                            <div className={styles.select_box}>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div style={{
                    backgroundImage: `url(/assets/homepage/banner-3.png)`,
                    width: '100%'
                }}
                    className={styles.banner_container}
                >
                    {/* <!-- <h1>Book a Consultation</h1> --> */}
                    <div className={styles.banner2container}>
                        <div className={styles.store_section_1}>
                            <div className={styles.store_section_1_col_1}>
                                <ul className={styles.goback_header_pages}>
                                    <div onClick={router.back}><WestIcon className={styles.goback_header_page_arrow} /></div>
                                    <li onClick={router.back}>
                                        back
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.store_row_1_join_us_form}>
                            <>
                                <div className={styles.select_container}>
                                    <div className={styles.select_box}>
                                        <p>All Categories</p>
                                        <ArrowDropDownIcon className={styles.select_box_icon} />
                                    </div>
                                        {/* <div className={styles.select_options}>
                                            <p>Public</p>
                                            <p>Pending</p>
                                            <p>Rejected</p>
                                        </div> */}
                                </div>
                                <div className={styles.search_box}>
                                    <p className={styles.search_icon}>
                                        <SearchIcon className={styles.search_icon} />
                                    </p>
                                    <input
                                    type="text"
                                    name="search"
                                    // onChange={handleSearch}
                                    // onKeyUp={searchSuggested}
                                    className={styles.search_input}
                                    placeholder="Search Meals, Ingredient and Products"
                                    />
                                </div>
                                <button className={styles.store_row_1_button}>Search</button>
                            </>
                        
                        </div>
                    </div>

                </div>
                <p className={styles.dateCreated} style={{width:'95%', textAlign:'end'}}>Store Created: August 23rd,2022 </p>
                <div style={{width: '95%'}}>
                    <Store />
                </div>
            </div>
        </div>
    )
}

export default IndividualStorePage