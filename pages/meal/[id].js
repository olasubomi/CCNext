import { useRouter } from 'next/router';
import Head from "next/head";

const individualMealPage = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Meal Page</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        individualMealPage: {id}</div>
}

export default individualMealPage