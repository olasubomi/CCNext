import { useRouter } from 'next/router';
import Head from "next/head";

const SuggestedMeals = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Suggest A Chop Chow Meal</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        SuggestedMeals: {id}</div>
}

export default SuggestedMeals