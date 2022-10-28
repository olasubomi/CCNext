
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Head from "next/head";
import styles from '../../src/components/dashboard/dashboard.module.css'
import Header from '../../src/components/Header/Header';
import SideNav, { SideNav2 } from '../../src/components/Header/sidenav';
import dashOrdersIcon from "../../public/assets/icons/dashordersIcon.png"
import dashRequestsIcon from "../../public/assets/icons/dashrequestsIcon.png"
import dashUsersIcon from "../../public/assets/icons/dashusersIcon.png"
import Image from 'next/image';
import { CloseFillIcon } from '../../src/components/icons';


const DashboardHomePage = (props) => {
    const router = useRouter()
    const { id } = router.query;

    const [loading, setLoadingState] = useState(false);
  const [page, setPageState] = useState(1);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  console.log(props)

  useEffect(() => {

  }, []);


  return (
    <div className={styles.container + " " + styles.col2}>
    <Head>
            <title>Chop Chow Dashboard Home Page</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        <SideNav />
        <div className={styles.left}>
            <SideNav2 />
        </div>
        <div className={styles.empty}></div>
        <div className={styles.center}>
            <div className={styles.dashboard_header}>
                <h3>Hello Oyelami <span>(Super Admin)</span></h3>
            </div>
            <div className={styles.overview_con}>
                <h3>Overview</h3>
                <div className={styles.overview}>
                    <div className={styles.box2}>
                        <div className={styles.box_purpose2}>
                            <div></div>
                            <p className={styles.box_duration}>Today</p>
                        </div>
                        <div className={styles.value_con2}>
                            <Image alt='Requests' src={dashRequestsIcon} />
                            <div>
                                <h3 className={styles.box_name}>Requests</h3>
                                <p className={styles.value}>0</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box2}>
                        <div className={styles.box_purpose2}>
                            <div></div>
                            <p className={styles.box_duration}>Monthly</p>
                        </div>
                        <div className={styles.value_con2}>
                            <Image alt='Users' src={dashUsersIcon} />
                            <div>
                                <h3 className={styles.box_name}>Total Users</h3>
                                <p className={styles.value}>0</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box2}>
                        <div className={styles.box_purpose2}>
                            <div></div>
                            <p className={styles.box_duration}>Weekly</p>
                        </div>
                        <div className={styles.value_con2}>
                            <Image alt='Orders' src={dashOrdersIcon} />
                            <div>
                                <h3 className={styles.box_name}>Total Orders</h3>
                                <p className={styles.value}>0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.dashboard_container}>
                <h3>Requests</h3>
                <div className={styles.dashboard}>
                <table className={styles.request_table}>
                    <thead>
                    <tr className={styles.request_tr} style={{backgroundColor: 'transparent'}}>
                        <th className={styles.request_th}>Request ID</th>
                        <th className={styles.request_th}>Meal</th>
                        <th className={styles.request_th + " " + styles.hideData}>Category</th>
                        <th className={styles.request_th} style={{textAlign: 'center'}}>Status</th>
                        <th className={styles.request_th + " " + styles.hideData}>Price</th>
                        <th className={styles.request_th + " " + styles.hideData}>Date</th>
                        <th className={styles.request_th + " " + styles.showData} style={{textAlign: 'center'}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.refId + " " + styles.request_tr}>
                            <td className={styles.request_td}>dfdsf</td>
                            <td className={styles.request_td}>asf</td>
                            <td className={styles.request_td + " " + styles.hideData}>safa</td>
                            <td className={styles.request_td} style={{textAlign: 'center'}}>saf</td>
                            <td className={styles.request_td + " " + styles.hideData}>afa</td>
                            <td className={styles.request_td + " " + styles.hideData}>afa</td>
                            <td className={styles.request_td + " " + styles.showData} style={{textAlign: 'center'}}><CloseFillIcon style={styles.actionIcon} /></td>
                        </tr>

                        <tr className={styles.refId + " " + styles.request_tr}>
                            <td className={styles.request_td}>dfdsf</td>
                            <td className={styles.request_td}>asf</td>
                            <td className={styles.request_td + " " + styles.hideData}>safa</td>
                            <td className={styles.request_td} style={{textAlign: 'center'}}>saf</td>
                            <td className={styles.request_td + " " + styles.hideData}>afa</td>
                            <td className={styles.request_td + " " + styles.hideData}>afa</td>
                            <td className={styles.request_td + " " + styles.showData} style={{textAlign: 'center'}}><CloseFillIcon style={styles.actionIcon} /></td>
                        </tr>
                    
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default DashboardHomePage