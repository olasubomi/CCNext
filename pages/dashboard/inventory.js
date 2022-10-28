import { useRouter } from 'next/router';
import Head from "next/head";


const Inventory = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Store Inventory</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        Inventory: {id}</div>
}

export default Inventory