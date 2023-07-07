import Head from "next/head";
import GroceryComponent from "../src/components/GroceryPage/index";

const Grocery = () => {
    return <div>
        <Head>
            <title>Chop Chow Forgot Password Form</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <GroceryComponent productNames={['prod1', 'prod2']} /></div>

}

export default Grocery