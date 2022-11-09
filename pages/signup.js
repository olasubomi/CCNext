import SignUp from "../src/components/signup"
import {home_container2} from '../src/components/HomePage/home.module.css';
import Head from "next/head";


const App = () => {
    return <div className={home_container2}>
     <Head>
            <title>Chop Chow Sign Up Form</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <SignUp /></div>

}

export default App