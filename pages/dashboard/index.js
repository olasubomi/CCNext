
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Head from "next/head";
import styles from '../../src/components/dashboard/dashboard.module.css'
import Header from '../../src/components/Header/Header';
import SideNav from '../../src/components/Header/sidenav';
import { BagIcon, BatteryIcon, CloseFillIcon, LineChartIcon, ListIcon, TagIcon, ThumbsUpIcon } from '../../src/components/icons';
import Sidenav2 from '../../src/components/Header/sidenav2';
import GoBack from '../../src/components/CommonComponents/goBack';
import { connect } from "react-redux";
// import { IgrDoughnutChart, IgrDoughnutChartModule, IgrItemLegendModule, IgrRingSeries, IgrRingSeriesModule } from 'igniteui-react-charts';

// IgrDoughnutChartModule.register();
// IgrRingSeriesModule.register();
// IgrItemLegendModule.register();


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

//   useEffect(() => {
//     if(props.auth.authUser === null){
//         router.push('/')
//     }
//   }, []);

//   const data = [
//     { MarketShare: 37, Category: "Cooling", Summary: "Cooling 40%", },
//     { MarketShare: 12, Category: "Heating", Summary: "Heating 25%", },
//     { MarketShare: 25, Category: "Residential", Summary: "Residential 35%",  },
// ];


  return (
    <div className={styles.container + " " + (props.auth.authUser && props.auth.authUser.user_type === 'admin' ? styles.col3 :styles.col2)}>
        <Head>
            <title>Chop Chow Dashboard Home Page</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        <SideNav />
        <div className={styles.left}>
            <Sidenav2 showBottom={false} />
        </div>
        <div className={styles.empty}></div>
        <div className={styles.center}>
            <div className={styles.header2}>
                <div className={styles.header2_col_1}>
                    <GoBack />
                </div>
            </div>
            {props.auth.authUser && 
            <>
                <div className={styles.dashboard_header}>
                    <h3>Hello {props.auth.authUser.username} {props.auth.authUser.user_type === 'admin' &&<span>(Super Admin)</span>}</h3>
                </div>
                <div className={styles.overview_con}>
                    <h3>Overview</h3>
                    <div className={styles.overview}>
                        <div className={styles.box2}>
                            <div className={styles.box_purpose2}>
                                <div></div>
                                <p className={styles.box_duration}>Today</p>
                            </div>
                            <div className={styles.value_con}>
                                <div className={styles.value_con2 + " " + styles.red}>
                                    {(props.auth.authUser.user_type === 'customer' || props.auth.authUser.user_type === 'driver') && <TagIcon />}
                                    {props.auth.authUser.user_type === 'admin' && <BatteryIcon />}
                                    {props.auth.authUser.user_type === 'supplier' && <LineChartIcon />}
                                </div>
                                <div>
                                    <h3 className={styles.box_name}>
                                        {props.auth.authUser.user_type === 'customer' && 'Completed Order'}
                                        {props.auth.authUser.user_type === 'admin' && 'Requests'}
                                    </h3>
                                    <p className={styles.value}>0</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.box2}>
                            <div className={styles.box_purpose2}>
                                <div></div>
                                {(props.auth.authUser.user_type === 'driver' || props.auth.authUser.user_type === 'admin') &&
                                <p className={styles.box_duration}>Monthly</p>}
                            </div>
                            <div className={styles.value_con}>
                                <div className={styles.value_con2 + " " + styles.orange}>
                                    {(props.auth.authUser.user_type === 'customer' || props.auth.authUser.user_type === 'supplier') && <BagIcon />}
                                    {props.auth.authUser.user_type === 'admin' && <BatteryIcon />}
                                    {props.auth.authUser.user_type === 'driver' && <ThumbsUpIcon />}
                                </div>
                                <div>
                                    <h3 className={styles.box_name}>
                                        {props.auth.authUser.user_type === 'customer' && 'Total Suggestion'}
                                        {props.auth.authUser.user_type === 'driver' && 'Total Order Fulfilled'}
                                        {props.auth.authUser.user_type === 'supplier' && 'Total Inventory Products'}
                                        {props.auth.authUser.user_type === 'admin' && 'Total Users'}
                                    </h3>
                                    <p className={styles.value}>0</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.box2}>
                            <div className={styles.box_purpose2}>
                                <div></div>
                                {props.auth.authUser.user_type === 'admin' &&
                                <p className={styles.box_duration}>Weekly</p>}
                            </div>
                            <div className={styles.value_con}>
                                <div className={styles.value_con2 + " " + styles.green}>
                                    {props.auth.authUser.user_type === 'admin' ? <BatteryIcon /> : <ListIcon />}
                                </div>
                                <div>
                                    <h3 className={styles.box_name}>
                                        {props.auth.authUser.user_type === 'admin' ? 'Total Orders' : 'Orders in queue'}
                                    </h3>
                                    <p className={styles.value}>0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {props.auth.authUser.user_type === 'admin' &&
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
                }
                <div className={styles.dashboard_container}>
                    <h3>
                        {(props.auth.authUser.user_type === 'customer' || props.auth.authUser.user_type === 'supplier') && 'Recent Order'}
                        {props.auth.authUser.user_type === 'admin' && 'Requests'}
                        {props.auth.authUser.user_type === 'driver' && 'Recent Request'}
                    </h3>
                    <div className={styles.dashboard}>
                    {props.auth.authUser.user_type === 'admin' &&
                    <table className={styles.request_table}>
                        <thead>
                        <tr className={styles.request_tr} style={{backgroundColor: 'transparent'}}>
                            <th className={styles.request_th}>Request ID</th>
                            <th className={styles.request_th}>Meal</th>
                            <th className={styles.request_th + " " + styles.hideData}>Category</th>
                            <th className={styles.request_th} style={{textAlign: 'center'}}>Status</th>
                            <th className={styles.request_th + " " + styles.hideData}>Price</th>
                            <th className={styles.request_th + " " + styles.hideData}>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr className={styles.refId + " " + styles.request_tr}>
                                <td className={styles.request_td}>dfdsf</td>
                                <td className={styles.request_td}>asf</td>
                                <td className={styles.request_td + " " + styles.hideData}>safa</td>
                                <td className={styles.request_td+ " " + styles.status + " " + styles.pending} style={{textAlign: 'center'}}>saf</td>
                                <td className={styles.request_td + " " + styles.hideData}>afa</td>
                                <td className={styles.request_td + " " + styles.hideData}>afa</td>
                            </tr>

                            <tr className={styles.refId + " " + styles.request_tr}>
                                <td className={styles.request_td}>dfdsf</td>
                                <td className={styles.request_td}>asf</td>
                                <td className={styles.request_td + " " + styles.hideData}>safa</td>
                                <td className={styles.request_td+ " " + styles.status + " " + styles.approve} style={{textAlign: 'center'}}>saf</td>
                                <td className={styles.request_td + " " + styles.hideData}>afa</td>
                                <td className={styles.request_td + " " + styles.hideData}>afa</td>
                            </tr>
                        
                        </tbody>
                    </table>
                    }
                    {props.auth.authUser.user_type === 'customer' &&
                    <table className={styles.request_table}>
                        <thead>
                        <tr className={styles.request_tr} style={{backgroundColor: 'transparent'}}>
                            <th className={styles.request_th}>Order Number</th>
                            <th className={styles.request_th}>Supplier</th>
                            <th className={styles.request_th} style={{textAlign: 'center'}}>Status</th>
                            <th className={styles.request_th + " " + styles.hideData}>Type</th>
                            <th className={styles.request_th + " " + styles.hideData}>Price</th>
                            <th className={styles.request_th + " " + styles.hideData}>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr className={styles.refId + " " + styles.request_tr}>
                                <td className={styles.request_td}>dfdsf</td>
                                <td className={styles.request_td}>asf</td>
                                <td className={styles.request_td + " " + styles.status + " " + styles.rejected} style={{textAlign: 'center'}}>saf</td>
                                <td className={styles.request_td + " " + styles.hideData}>safa</td>
                                <td className={styles.request_td + " " + styles.hideData}>afa</td>
                                <td className={styles.request_td + " " + styles.hideData}>afa</td>
                            </tr>

                            <tr className={styles.refId + " " + styles.request_tr}>
                                <td className={styles.request_td}>dfdsf</td>
                                <td className={styles.request_td}>asf</td>
                                <td className={styles.request_td+ " " + styles.status + " " + styles.pending} style={{textAlign: 'center'}}>saf</td>
                                <td className={styles.request_td + " " + styles.hideData}>safa</td>
                                <td className={styles.request_td + " " + styles.hideData}>afa</td>
                                <td className={styles.request_td + " " + styles.hideData}>afa</td>
                            </tr>
                        
                        </tbody>
                    </table>
                    }

                    {props.auth.authUser.user_type === 'supplier' &&
                    <table className={styles.request_table}>
                        <thead>
                        <tr className={styles.request_tr} style={{backgroundColor: 'transparent'}}>
                            <th className={styles.request_th}>Order Number</th>
                            <th className={styles.request_th}>Customer</th>
                            <th className={styles.request_th} style={{textAlign: 'center'}}>Status</th>
                            <th className={styles.request_th + " " + styles.hideData}>Type</th>
                            <th className={styles.request_th + " " + styles.hideData}>Price</th>
                            <th className={styles.request_th + " " + styles.hideData}>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr className={styles.refId + " " + styles.request_tr}>
                                <td className={styles.request_td}>dfdsf</td>
                                <td className={styles.request_td}>asf</td>
                                <td className={styles.request_td + " " + styles.status + " " + styles.rejected} style={{textAlign: 'center'}}>saf</td>
                                <td className={styles.request_td + " " + styles.hideData}>safa</td>
                                <td className={styles.request_td + " " + styles.hideData}>afa</td>
                                <td className={styles.request_td + " " + styles.hideData}>afa</td>
                            </tr>

                            <tr className={styles.refId + " " + styles.request_tr}>
                                <td className={styles.request_td}>dfdsf</td>
                                <td className={styles.request_td}>asf</td>
                                <td className={styles.request_td+ " " + styles.status + " " + styles.pending} style={{textAlign: 'center'}}>saf</td>
                                <td className={styles.request_td + " " + styles.hideData}>safa</td>
                                <td className={styles.request_td + " " + styles.hideData}>afa</td>
                                <td className={styles.request_td + " " + styles.hideData}>afa</td>
                            </tr>
                        
                        </tbody>
                    </table>
                    }

                    {props.auth.authUser.user_type === 'driver' &&
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
                    }
                    </div>
                </div>
            </>}
        </div>
        {props.auth.authUser && props.auth.authUser.user_type === 'admin' &&
        <>
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
        </>
        }
        
    </div>
  )
}

function mapStateToProp(state) {
    return {
      auth: state.Auth
    };
  }
  
  export default connect(
    mapStateToProp,
  )(DashboardHomePage);