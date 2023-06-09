
import Head from "next/head";
import Meal from '../../src/components/individualPage/Meal';
import GoBack from '../../src/components/CommonComponents/goBack';
import styles from "../../src/components/individualPage/meal.module.css";
import Header, { Header2 } from '../../src/components/Header/Header';
import Sidenav from '../../src/components/Header/sidenav';
import { useEffect } from 'react';
import axios from '../../src/util/Api';
import { connect } from "react-redux";

const individualMealPage = (props) => {
    useEffect(() => {
        console.log(props)
        if(props.meal && props.meal.data && props.meal.data.meals?.length === 0){
            // window.location.assign('/')
        }
    })

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
console.log(props, "mealsssss")
    return (
        <div>
            <Head>
                <title>Chop Chow Meal Page</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Header2 />
            <Sidenav />
            <div className={styles.meal_container}>
                <div className={styles.meal_section_1}>
                    <div className={styles.meal_section_1_col_1}>
                        <GoBack />
                    </div>
                    <div className={styles.meal_section_1_col_2}>
                        {/* <p className={styles.meal_section_1_col_2_p}> {props?.meal?.data?.meals[0]?.createdAt && new Date(props?.meal?.data?.meals[0]?.createdAt).getDate() + ' ' + months[new Date(props?.meal?.data?.meals[0]?.createdAt).getMonth()] + ' ,'+ new Date(props?.meal?.data?.meals[0]?.createdAt).getFullYear()}</p> */}
                        <div className={styles.select_container}>
                            <div className={styles.select_box}>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: '95%'}}>
                    
                    <Meal props={props.meal.data} />
                </div>
            </div>
        </div>
        )
}

// export default individualMealPage

function mapStateToProp(state) {
    return {
      auth: state.Auth
    };
  }
  
  export default connect(
    mapStateToProp,
  )(individualMealPage);

export async function getServerSideProps(context){
    // const res = await fetch('https://.../posts')
    // const posts = await res.json()
    // console.log(context)
    let {id} = context.params
    // let meal = await axios.get('/meals/get-meals/1?publicly_available=Public&_id='+id)
    let meal = await axios.get('/meals/get-meal/64766a7dfef9ac800955946e')

    console.log(meal.data, 'meal data')
    console.log(id, "id")

    return {
        props: {
            meal: meal.data
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every second
        // revalidate: 86400, // In seconds
    }
}