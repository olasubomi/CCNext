import { useRouter } from 'next/router'

const CreateStore = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Create Store Page</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        CreateStore: {id}</div>
}

export default CreateStore