import SignUp from "../src/components/signup"
import {home_container2} from '../src/components/HomePage/home.module.css';
import {signup_container} from '../src/components/Login/style.module.css'
import Head from "next/head";


const App = () => {
    return <div className={home_container2}>
     <Head>
            <title>Create a Chop Chow Account</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="Sign up to share your recipes with fans and friends" />
        </Head>
        <div className={signup_container}>

        <SignUp />
        </div>
        </div>

}

export default App