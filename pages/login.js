import Login from "../src/components/Login"
import {home_container2} from '../src/components/HomePage/home.module.css';
import {login_container} from '../src/components/Login/style.module.css'
import Head from "next/head";

const App = () => {
    return <div className={home_container2}>
     <Head>
            <title>Chop Chow Log-In Form</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className={login_container}>

    <Login />
        </div>
    </div>


}

export default App