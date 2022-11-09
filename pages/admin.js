import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import styles from '../src/components/dashboard/dashboard.module.css'
import Head from "next/head";
import Header from '../src/components/Header/Header';
import SideNav from '../src/components/Header/sidenav';
import dashOrdersIcon from "../public/assets/icons/dashordersIcon.png"
import dashRequestsIcon from "../public/assets/icons/dashrequestsIcon.png"
import dashUsersIcon from "../public/assets/icons/dashusersIcon.png"
import Image from 'next/image';
import { CloseFillIcon } from '../src/components/icons';
import Sidenav2 from '../src/components/Header/sidenav2';
// import { IgrDoughnutChart, IgrDoughnutChartModule, IgrItemLegendModule, IgrRingSeries, IgrRingSeriesModule } from 'igniteui-react-charts';

// IgrDoughnutChartModule.register();
// IgrRingSeriesModule.register();
// IgrItemLegendModule.register();

const Admin = (props) => {
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

  useEffect(() => {

  }, []);

  const data = [
    { MarketShare: 37, Category: "Cooling", Summary: "Cooling 40%", },
    { MarketShare: 12, Category: "Heating", Summary: "Heating 25%", },
    { MarketShare: 25, Category: "Residential", Summary: "Residential 35%",  },
];


  return (
    <div className={styles.container + " " + styles.col3}>
    <Head>
            <title>Chop Chow Admin Page</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        <SideNav />
        <div className={styles.left}>
            <Sidenav2 />
        </div>
        <div className={styles.empty}></div>
        <div className={styles.center}>
            <div className={styles.overview_con}>
                <h3>Overview</h3>
                <div className={styles.overview}>
                    <div className={styles.box}>
                        <div className={styles.box_purpose}>
                            <h3 className={styles.box_name}>Requests</h3>
                            <p className={styles.box_duration}>Today</p>
                        </div>
                        <div className={styles.value_con}>
                            <Image alt='Requests' src={dashRequestsIcon} />
                            <div>
                                <h3 className={styles.box_name}>Requests</h3>
                                <p className={styles.value}>0</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.box_purpose}>
                            <h3 className={styles.box_name}>Total Users</h3>
                            <p className={styles.box_duration}>Monthly</p>
                        </div>
                        <div className={styles.value_con}>
                            <Image alt='Users' src={dashUsersIcon} />
                            <div>
                                <h3 className={styles.box_name}>Total Users</h3>
                                <p className={styles.value}>0</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.box_purpose}>
                            <h3 className={styles.box_name}>Total Orders</h3>
                            <p className={styles.box_duration}>Weekly</p>
                        </div>
                        <div className={styles.value_con}>
                            <Image alt='Orders' src={dashOrdersIcon} />
                            <div>
                                <h3 className={styles.box_name}>Total Orders</h3>
                                <p className={styles.value}>0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.chart_con}>
                <div className={styles.chart_col}>
                    <h3>Categories</h3>
                    <div className={styles.chart}>
                        <div className={styles.chart_circle}>
                            {/* <IgrDoughnutChart
                                width="100%"
                                height="100%"
                                allowSliceSelection="false"
                                allowSliceExplosion="false"
                                innerExtent={0.8}
                                >
                                    <IgrRingSeries name="ring1"
                                        dataSource={data}
                                        brushes="#F40707 #F47900 #04D505"
                                        valueMemberPath="MarketShare"
                                        radiusFactor={0.7}
                                        startAngle={30}
                                        outlines='transparent'
                                        />
                            </IgrDoughnutChart> */}

                            <div className={styles.chart_circle_total}>
                                <p>Total</p>
                                <h3>2142</h3>
                            </div>
                        </div>
                        <div className={styles.chart_breakdown_con}>
                            <div className={styles.chart_breakdown}>
                                <div className={styles.chart_breakdown_bullet} style={{background: '#F47900'}}></div>
                                <div className={styles.chart_breakdown_details}>
                                    <p>Meal</p>
                                    <div>
                                        <h5>40%</h5>
                                        <h5>1965</h5>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.chart_breakdown}>
                                <div className={styles.chart_breakdown_bullet} style={{background: '#04D505'}}></div>
                                <div className={styles.chart_breakdown_details}>
                                    <p>Product</p>
                                    <div>
                                        <h5>35%</h5>
                                        <h5>1877</h5>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.chart_breakdown}>
                                <div className={styles.chart_breakdown_bullet} style={{background: '#CF0000'}}></div>
                                <div className={styles.chart_breakdown_details}>
                                    <p>Kitchen Utensils</p>
                                    <div>
                                        <h5>25%</h5>
                                        <h5>544</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.chart_col}>
                    <h3>User Stats</h3>
                    <div className={styles.chart}>
                        <div className={styles.chart_circle}>
                            {/* <IgrDoughnutChart
                                width="100%"
                                height="100%"
                                allowSliceSelection="false"
                                allowSliceExplosion="false"
                                innerExtent={0.8}
                                >
                                    <IgrRingSeries name="ring1"
                                        dataSource={data}
                                        brushes="#F40707 #F47900 #04D505"
                                        valueMemberPath="MarketShare"
                                        radiusFactor={0.7}
                                        startAngle={30}
                                        outlines='transparent'
                                        />
                            </IgrDoughnutChart> */}

                            <div className={styles.chart_circle_total}>
                                <p>Total</p>
                                <h3>2142</h3>
                            </div>
                        </div>
                        <div className={styles.chart_breakdown_con}>
                            <div className={styles.chart_breakdown}>
                                <div className={styles.chart_breakdown_bullet} style={{background: '#F47900'}}></div>
                                <div className={styles.chart_breakdown_details}>
                                    <p>Meal</p>
                                    <div>
                                        <h5>40%</h5>
                                        <h5>1965</h5>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.chart_breakdown}>
                                <div className={styles.chart_breakdown_bullet} style={{background: '#04D505'}}></div>
                                <div className={styles.chart_breakdown_details}>
                                    <p>Product</p>
                                    <div>
                                        <h5>35%</h5>
                                        <h5>1877</h5>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.chart_breakdown}>
                                <div className={styles.chart_breakdown_bullet} style={{background: '#CF0000'}}></div>
                                <div className={styles.chart_breakdown_details}>
                                    <p>Kitchen Utensils</p>
                                    <div>
                                        <h5>25%</h5>
                                        <h5>544</h5>
                                    </div>
                                </div>
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

            <div className={styles.center_min}>
                <div className={styles.chart_con}>
                    <div className={styles.chart_col}>
                        <h3>Categories</h3>
                        <div className={styles.chart}>
                            <div className={styles.chart_circle}>
                                {/* <IgrDoughnutChart
                                    width="100%"
                                    height="100%"
                                    allowSliceSelection="false"
                                    allowSliceExplosion="false"
                                    innerExtent={0.8}
                                    >
                                        <IgrRingSeries name="ring1"
                                            dataSource={data}
                                            brushes="#F40707 #F47900 #04D505"
                                            valueMemberPath="MarketShare"
                                            radiusFactor={0.7}
                                            startAngle={30}
                                            outlines='transparent'
                                            />
                                </IgrDoughnutChart> */}

                                <div className={styles.chart_circle_total}>
                                    <p>Total</p>
                                    <h3>2142</h3>
                                </div>
                            </div>
                            <div className={styles.chart_breakdown_con}>
                                <div className={styles.chart_breakdown}>
                                    <div className={styles.chart_breakdown_bullet} style={{background: '#F47900'}}></div>
                                    <div className={styles.chart_breakdown_details}>
                                        <p>Meal</p>
                                        <div>
                                            <h5>40%</h5>
                                            <h5>1965</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.chart_breakdown}>
                                    <div className={styles.chart_breakdown_bullet} style={{background: '#04D505'}}></div>
                                    <div className={styles.chart_breakdown_details}>
                                        <p>Product</p>
                                        <div>
                                            <h5>35%</h5>
                                            <h5>1877</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.chart_breakdown}>
                                    <div className={styles.chart_breakdown_bullet} style={{background: '#CF0000'}}></div>
                                    <div className={styles.chart_breakdown_details}>
                                        <p>Kitchen Utensils</p>
                                        <div>
                                            <h5>25%</h5>
                                            <h5>544</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.chart_col}>
                        <h3>User Stats</h3>
                        <div className={styles.chart}>
                        <div className={styles.chart_circle}>
                                {/* <IgrDoughnutChart
                                    width="100%"
                                    height="100%"
                                    allowSliceSelection="false"
                                    allowSliceExplosion="false"
                                    innerExtent={0.8}
                                    >
                                        <IgrRingSeries name="ring1"
                                            dataSource={data}
                                            brushes="#F40707 #F47900 #04D505"
                                            valueMemberPath="MarketShare"
                                            radiusFactor={0.7}
                                            startAngle={30}
                                            outlines='transparent'
                                            />
                                </IgrDoughnutChart> */}

                                <div className={styles.chart_circle_total}>
                                    <p>Total</p>
                                    <h3>2142</h3>
                                </div>
                            </div>
                            <div className={styles.chart_breakdown_con}>
                                <div className={styles.chart_breakdown}>
                                    <div className={styles.chart_breakdown_bullet} style={{background: '#F47900'}}></div>
                                    <div className={styles.chart_breakdown_details}>
                                        <p>Meal</p>
                                        <div>
                                            <h5>40%</h5>
                                            <h5>1965</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.chart_breakdown}>
                                    <div className={styles.chart_breakdown_bullet} style={{background: '#04D505'}}></div>
                                    <div className={styles.chart_breakdown_details}>
                                        <p>Product</p>
                                        <div>
                                            <h5>35%</h5>
                                            <h5>1877</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.chart_breakdown}>
                                    <div className={styles.chart_breakdown_bullet} style={{background: '#CF0000'}}></div>
                                    <div className={styles.chart_breakdown_details}>
                                        <p>Kitchen Utensils</p>
                                        <div>
                                            <h5>25%</h5>
                                            <h5>544</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.dashboard_container} style={{padding: '0 10px'}}>
                    <h3>Order Groups</h3>
                    <div className={styles.order_groups}>
                        <div className={styles.orders_head} style={{backgroundColor: 'transparent'}}>
                            <div className={styles.orders_th}>Order Groups</div>
                            <div className={styles.orders_th}>Pickup Location</div>
                            <div className={styles.orders_th}>Delivery Location</div>
                            <div className={styles.orders_th}>Total</div>
                            <div className={styles.orders_th}>Pending</div>
                            <div className={styles.orders_th}>Picked</div>
                            <div className={styles.orders_th}>Fulfilled</div>
                        </div>
                        <div className={styles.orders_body}>
                            <table className={styles.orders_table}>
                                <tbody>
                                    <tr className={styles.refId + " " + styles.orders_tr}>
                                        <td style={{color: '#000000'}} className={styles.orders_td}>dfdsf</td>
                                        <td style={{color: '#000000'}} className={styles.orders_td}>asf</td>
                                        <td style={{color: '#000000'}} className={styles.orders_td}>safa</td>
                                        <td className={styles.orders_td}>saf</td>
                                        <td className={styles.orders_td}>afa</td>
                                        <td className={styles.orders_td}>afa</td>
                                        <td className={styles.orders_td}>afa</td>
                                    </tr>

                                    <tr className={styles.refId + " " + styles.orders_tr}>
                                        <td style={{color: '#000000'}} className={styles.orders_td}>dfdsf</td>
                                        <td style={{color: '#000000'}} className={styles.orders_td}>asf</td>
                                        <td style={{color: '#000000'}} className={styles.orders_td}>safa</td>
                                        <td className={styles.orders_td} style={{textAlign: 'center'}}>saf</td>
                                        <td className={styles.orders_td}>afa</td>
                                        <td className={styles.orders_td}>afa</td>
                                        <td className={styles.orders_td}>afa</td>
                                    </tr>
                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={styles.right}>
            <div className={styles.dashboard_container} style={{padding: '0 10px'}}>
                <h3>Order Groups</h3>
                <div className={styles.order_groups}>
                    <div className={styles.orders_head} style={{backgroundColor: 'transparent'}}>
                        <div className={styles.orders_th}>Order Groups</div>
                        <div className={styles.orders_th}>Pickup Location</div>
                        <div className={styles.orders_th}>Delivery Location</div>
                        <div className={styles.orders_th}>Total</div>
                        <div className={styles.orders_th}>Pending</div>
                        <div className={styles.orders_th}>Picked</div>
                        <div className={styles.orders_th}>Fulfilled</div>
                    </div>
                    <div className={styles.orders_body}>
                        <table className={styles.orders_table}>
                            <tbody>
                                <tr className={styles.refId + " " + styles.orders_tr}>
                                    <td style={{color: '#000000'}} className={styles.orders_td}>dfdsf</td>
                                    <td style={{color: '#000000'}} className={styles.orders_td}>asf</td>
                                    <td style={{color: '#000000'}} className={styles.orders_td}>safa</td>
                                    <td className={styles.orders_td}>saf</td>
                                    <td className={styles.orders_td}>afa</td>
                                    <td className={styles.orders_td}>afa</td>
                                    <td className={styles.orders_td}>afa</td>
                                </tr>

                                <tr className={styles.refId + " " + styles.orders_tr}>
                                    <td style={{color: '#000000'}} className={styles.orders_td}>dfdsf</td>
                                    <td style={{color: '#000000'}} className={styles.orders_td}>asf</td>
                                    <td style={{color: '#000000'}} className={styles.orders_td}>safa</td>
                                    <td className={styles.orders_td} style={{textAlign: 'center'}}>saf</td>
                                    <td className={styles.orders_td}>afa</td>
                                    <td className={styles.orders_td}>afa</td>
                                    <td className={styles.orders_td}>afa</td>
                                </tr>
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.empty}></div>
        
    </div>
  )

}

export default Admin