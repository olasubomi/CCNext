import { useRouter } from 'next/router'

const GroceryPage = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Grocery List</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        GroceryPage: {id}</div>
}

export default GroceryPage