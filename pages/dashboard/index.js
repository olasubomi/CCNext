
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Head from "next/head";
import styles from '../../src/components/dashboard/dashboard.module.css'
import Header from '../../src/components/Header/Header';
import SideNav from '../../src/components/Header/sidenav';
import { BagIcon, BatteryIcon, CloseFillIcon, LineChartIcon, ListIcon, TagIcon, ThumbsUpIcon, UsersIcon } from '../../src/components/icons';
import Sidenav2 from '../../src/components/Header/sidenav2';
import GoBack from '../../src/components/CommonComponents/goBack';
import { connect } from "react-redux";
import { getUser } from '../../src/actions';
import axios from '../../src/util/Api';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { IgrDoughnutChart, IgrDoughnutChartModule, IgrItemLegendModule, IgrRingSeries, IgrRingSeriesModule } from 'igniteui-react-charts';

// IgrDoughnutChartModule.register();
// IgrRingSeriesModule.register();
// IgrItemLegendModule.register();


const DashboardHomePage = (props) => {
    const router = useRouter()
    const { id } = router.query;

    const [driverMode, setDriverModeState] = useState(false);
  const [page, setPageState] = useState(1);
  const [mealCount, setMealCountState] = useState(0);
  const [userCount, setUserCountState] = useState(0);
  const [orderCount, setOrderCountState] = useState(0);
  const [productCount, setProductCountState] = useState(0);
  const [kitchenUtensilCount, setKitchenUtensilCountState] = useState(0);
  const [changeType, setChangeTypeState] = useState(false);
  const [meals, setMealsState] = useState([])
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
    if(props.auth.authUser !== null){
        if(props.auth.authUser.user_type === 'admin'){
            axios.get('/analytics/get-users-count/').then(res =>{
                setUserCountState(res.data.data.docCount)
            })
            axios.get('/analytics/get-meals-count/').then(res =>{
                setMealCountState(res.data.data.docCount)
            })
            axios.get('/analytics/get-orders-count/').then(res =>{
                console.log(res.data)
                setOrderCountState(res.data.data.docCount)
            })
            axios.get('/analytics/get-products-count/').then(res =>{
                console.log(res.data)
                setProductCountState(res.data.data.docCount)
            })
        }else if(props.auth.authUser.user_type === 'customer'){
            axios.get('/analytics/get-orders-count/').then(res =>{
                console.log(res.data)
            })
            axios.get('/analytics/get-meals-count/').then(res =>{
                console.log(res.data)
            })
            axios.get('/analytics/get-orders-count/').then(res =>{
                console.log(res.data)
            })
        }

        if(props.auth.authUser.user_type === 'admin'){
            axios.get('/meals/get-meals/1').then(data => {
                console.log(data.data)
                if(data.data.data){
                    setMealsState(data.data.data.meals)
                }
            })
        }else{
            axios.get('/meals/get-meals/1?user='+props.auth.authUser._id).then(data => {
                console.log(data.data)
                if(data.data.data){
                    setMealsState(data.data.data.meals)
                }
            })
        }
    }
  }, [props.auth]);

//   const data = [
//     { MarketShare: 37, Category: "Cooling", Summary: "Cooling 40%", },
//     { MarketShare: 12, Category: "Heating", Summary: "Heating 25%", },
//     { MarketShare: 25, Category: "Residential", Summary: "Residential 35%",  },
// ];

  function toggleDriverMode(type){
    axios.put('/user/updateuserprofile/'+props.auth.authUser._id, { user_type: type }).then(res => {
        console.log(res.data)
        props.getUser(props.auth.authUser._id)
        setDriverModeState(!driverMode)
    })
  }
  
  function toggleChangeType(){
    setChangeTypeState(!changeType)
    }


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
                {props.auth.authUser && props.auth.authUser.user_type !== 'admin' && props.auth.authUser.user_type !== 'driver' && 
                <div className={styles.header2_col_2}>
                    <div className={styles.mode_con}>
                        <div onClick={() => toggleDriverMode(props.auth.authUser.user_type)} className={styles.mode + ' ' + styles.left_mode + ' '+(driverMode? '': styles.active_mode)}>{props.auth.authUser.user_type} mode</div>
                        <div onClick={() => toggleDriverMode('driver')} className={styles.mode + ' ' + styles.right_mode + ' '+(driverMode? styles.active_mode : '')}>Driver mode</div>
                    </div>
                </div>}
            </div>
            {props.auth.authUser && 
            <>
                <div className={styles.dashboard_header}>
                    <h3>Hello {props.auth.authUser.username} {props.auth.authUser.user_type === 'admin' &&<span>(Super Admin)</span>}</h3>
                    {props.auth.authUser && props.auth.authUser.user_type === 'driver' &&
                    <div className={styles.select_container}>
                        <div onClick={toggleChangeType} className={styles.select_box}>
                            <p>{props.auth.authUser.user_type}</p>
                            <ArrowDropDownIcon className={styles.select_box_icon} />
                        </div>
                        {changeType &&
                            <div className={styles.select_options}>
                                <p onClick={() => toggleDriverMode('customer')}>Customer</p>
                                <p onClick={() => toggleDriverMode('supplier')}>Supplier</p>
                                {/* <p onClick={() => handleSearchType('Kitchen Utensil')}>Kitchen Utensils</p> */}
                                {/* <p onClick={() => handleSearchType('Category')}>Category</p> */}
                            </div>}
                    </div>
                    }
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
                                    <p className={styles.value}>{mealCount+productCount+kitchenUtensilCount}</p>
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
                                    {props.auth.authUser.user_type === 'admin' && <TagIcon />}
                                    {props.auth.authUser.user_type === 'driver' && <ThumbsUpIcon />}
                                </div>
                                <div>
                                    <h3 className={styles.box_name}>
                                        {props.auth.authUser.user_type === 'customer' && 'Total Suggestion'}
                                        {props.auth.authUser.user_type === 'driver' && 'Total Order Fulfilled'}
                                        {props.auth.authUser.user_type === 'supplier' && 'Total Inventory Products'}
                                        {props.auth.authUser.user_type === 'admin' && 'Total Users'}
                                    </h3>
                                    <p className={styles.value}>{userCount}</p>
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
                                    {props.auth.authUser.user_type === 'admin' ? <UsersIcon /> : <ListIcon />}
                                </div>
                                <div>
                                    <h3 className={styles.box_name}>
                                        {props.auth.authUser.user_type === 'admin' ? 'Total Orders' : 'Orders in queue'}
                                    </h3>
                                    <p className={styles.value}>{orderCount}</p>
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
                                        <h3>{mealCount+productCount+kitchenUtensilCount}</h3>
                                    </div>
                                </div>
                                <div className={styles.chart_breakdown_con}>
                                    <div className={styles.chart_breakdown}>
                                        <div className={styles.chart_breakdown_bullet} style={{background: '#F47900'}}></div>
                                        <div className={styles.chart_breakdown_details}>
                                            <p>Meal</p>
                                            <div>
                                                {mealCount > 0 ?
                                                <h5>{Math.round((mealCount/(productCount+kitchenUtensilCount+mealCount))*100)}%</h5>:
                                                <h5>0%</h5>
                                                }
                                                <h5>{mealCount}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.chart_breakdown}>
                                        <div className={styles.chart_breakdown_bullet} style={{background: '#04D505'}}></div>
                                        <div className={styles.chart_breakdown_details}>
                                            <p>Product</p>
                                            <div>
                                                {productCount > 0 ?
                                                <h5>{Math.round((productCount/(productCount+kitchenUtensilCount+mealCount))*100)}%</h5>
                                                :
                                                <h5>0%</h5>
                                                }
                                                <h5>{productCount}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.chart_breakdown}>
                                        <div className={styles.chart_breakdown_bullet} style={{background: '#CF0000'}}></div>
                                        <div className={styles.chart_breakdown_details}>
                                            <p>Kitchen Utensils</p>
                                            <div>
                                                {kitchenUtensilCount > 0 ?
                                                <h5>{Math.round((kitchenUtensilCount/(productCount+kitchenUtensilCount+mealCount))*100)}%</h5>
                                                :
                                                <h5>0%</h5>
                                                }
                                                <h5>{kitchenUtensilCount}</h5>
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
                            {/* <th className={styles.request_th + " " + styles.hideData}>Price</th> */}
                            <th className={styles.request_th + " " + styles.hideData}>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                meals.map(meal => {
                                    return(
                                        <tr className={styles.refId + " " + styles.request_tr}>
                                            <td className={styles.request_td}>{meal._id}</td>
                                            <td className={styles.request_td}>{meal.meal_name}</td>
                                            <td className={styles.request_td + " " + styles.hideData}>{meal.meal_categories && meal.meal_categories.length > 0 && JSON.parse(meal.meal_categories[0])[0]}</td>
                                            <td className={styles.request_td + " " + styles.status + " " + 
                                                ((meal.publicly_available === 'Draft' || meal.publicly_available === 'Pending') ? styles.pending :
                                                meal.publicly_available === 'Public' ? styles.approve :
                                                meal.publicly_available === 'Rejected' ? styles.rejected : '')}
                                            >
                                                {meal.publicly_available}
                                            </td>
                                            {/* <td className={styles.request_td + " " + styles.hideData}>afa</td> */}
                                            <td className={styles.request_td + " " + styles.hideData}>{meal.createdAt && new Date(meal.createdAt).getDate() + ' ' + months[new Date(meal.createdAt).getMonth()] + ' ,'+ new Date(meal.createdAt).getFullYear()}</td>
                                        </tr>
                                    )
                                })
                            }
                            
                        
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

function mapDispatchToProps(dispatch) {
    return {
      getUser: (id) => dispatch(getUser(id))
    };
  }

function mapStateToProp(state) {
    return {
      auth: state.Auth
    };
  }
  
  export default connect(
    mapStateToProp,
    mapDispatchToProps
  )(DashboardHomePage);