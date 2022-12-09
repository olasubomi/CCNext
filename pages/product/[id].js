import { useRouter } from 'next/router';
import Head from "next/head";
import Product from '../../src/components/individualPage/Product';
import styles from "../../src/components/individualPage/meal.module.css";
import GoBack from '../../src/components/CommonComponents/goBack';
import Header, { Header2 } from '../../src/components/Header/Header';
import Sidenav from '../../src/components/Header/sidenav';
import axios from '../../src/util/Api';
import { useEffect } from 'react';

const individualProductPage = (props) => {
    const router = useRouter()
    useEffect(() => {
        if(props.product && props.product.data && props.product.data.products.length === 0){
            window.location.assign('/')
        }
    })
    return (
        <div>
            <Head>
                <title>Chop Chow Product Page</title>
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
                        <p className={styles.meal_section_1_col_2_p}> Choose type</p>
                        <div className={styles.select_container}>
                            <div className={styles.select_box}>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: '95%'}}>
                    {props.product && props.product.data && props.product.data.products.length > 0 &&
                    <Product product={props.product.data.products[0]} />}
                </div>
            </div>
            
        </div>
        )
}

export default individualProductPage

export async function getServerSideProps(context){
    // const res = await fetch('https://.../posts')
    // const posts = await res.json()
    // console.log(context)
    let {id} = context.params
    let product = await axios.get('/products/get-all-products/1?publicly_available=Public&_id='+id)

    // console.log(meal.data)

    return {
        props: {
            product: product.data
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every second
        // revalidate: 86400, // In seconds
    }
}