import Head from "next/head";
import Header, { Header2 } from "../../src/components/Header/Header";
import GoBack from "../../src/components/CommonComponents/goBack";
import Footer from "../../src/components/Footer/Footer";
import styles from '../../src/components/chef/chef.module.css'
import chef from '../../public/assets/homepage/chef.jpg'
import Image from "next/image";
import { BsFillShareFill } from 'react-icons/bs'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { useEffect, useState } from "react";
import MyTabs from "../../src/components/tabs/tab";
import { useRouter } from "next/router";
import axios from '../../src/util/Api'
import { IndividualModal } from "../../src/components/modal/individual-meal-product";
import { WhatsappEIcon, FacebookEIcon, TwitterEIcon } from "../../src/components/icons";
import InstagramBasicApi from "../../src/components/SocialShare/InstagramBasicApi";


const ChefPage = () => {
    const [activeKey, setActiveKey] = useState('2');
    const router = useRouter()
    const [user, setUser] = useState({})
    const fetchUserDetails = async (id) => {
        try {
            const response = await axios(`/user/findUser/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            console.log(response.data.data, 'userresp')
            setUser(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    console.log('rrr')

    useEffect(() => {
       if(router.query.id){ 
        fetchUserDetails(router.query.id)
       }
    }, [router.query.id])

    const handleTabChange = (key) => {
        setActiveKey(key);
    };
    const url = 'https://www.chopchow.app/'
    console.log("line 47", user)
    return (
        <div className={styles.ChefContainer}>
            <Head>
                <title>Chop Chow Grocery</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Header2 />
            <div className={styles.chefBg}>
                <div className={styles.bgAlign}>
                    <div className={styles.flex}>
                        <GoBack />
                        <Image src={chef} className={styles.chefImg} width={200} height={200} />
                    </div>
                    <h5 style={{textTransform: 'capitalize'}}>{user.first_name} {user.last_name}</h5>
                </div>
            </div>
            <div className={styles.share}>
                <span style={{ marginRight: '2rem' }}>
                    <BsFillShareFill /> share this Page:
                </span>
                <div className={styles.share}>
                    <div className={styles.icon}>
                        <FacebookShareButton
                            url={url + 'chef/'+ user.id}
                            quote={'Chop chow awesome'}
                            hashtag={`#${ user.first_name}`}
                            title={"fnkdlkd"}
                        >
                              <FacebookEIcon  />
                            {/* <span className={styles.iconSpan}>
                                <Image src="/assets/icons/Vector.svg" alt='facebook'
                                    height={"17"} width={"17"} className={styles.icons}
                                    objectFit="cover"
                                    objectPosition="center" />
                            </span> */}
                        </FacebookShareButton>

                    </div>
                    {/* <div onClick={() => this.handleShareClick()} style={{ cursor: "pointer" }} className={styles.icon}>
                        <span className={styles.iconSpan1}>
                            <Image src="/assets/icons/Vector (2).svg" alt='instagram'
                                height={"17"} width={"17"} className={styles.icons}
                                objectFit="cover"
                                objectPosition="center" />
                        </span>
                    </div> */}
                     <div  style={{ cursor: "pointer" }} className={styles.icon}>
                     <WhatsappShareButton title={user.first_name} url={url + 'chef/'+ user.id} >
                            <WhatsappEIcon />
                        </WhatsappShareButton>
                    </div> 
                    
                    <div>
                        <TwitterShareButton
                            className={styles.icon}
                            url={url + 'chef/'+ user.id}
                            title={user.first_name} 
                            via="ChopChowMarket"
                        >
                           <TwitterEIcon />
                        </TwitterShareButton>

                    </div>
                </div>
            </div>
            <InstagramBasicApi/>
            <MyTabs id={router.query.id} />
                
            <Footer />
        </div>
    )
}
export default ChefPage;