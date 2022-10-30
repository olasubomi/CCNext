
import Header from '../../src/components/Header/Header';
import SideNav, { SideNav2 } from '../../src/components/Header/sidenav';
import {container, col2, left, empty, center, status, approve, pending, rejected, actionIcon } from '../../src/components/dashboard/dashboard.module.css'
import { center_h3 } from '../../src/components/dashboard/profile.module.css'
import styles from '../../src/components/dashboard/suggestedmeals.module.css'
import { CloseFillIcon } from '../../src/components/icons';
import Link from 'next/link';

const SuggestedMeals = () => {

    return (
    <div className={container + " " + col2}>
        <Header />
        <SideNav />
        <div className={left}>
            <SideNav2 />
        </div>
        <div className={empty}></div>
        <div className={center}>
            <h3 className={center_h3}>My Profile</h3>

            <div className={styles.suggestedmeal_container}>
                <div className={styles.suggestedmeal_search_con}>
                    <div>Search</div>
                    <Link href='/dashboard/createstore'><a>Create Store</a></Link>
                </div>
                <div className={styles.suggestedmeal_row2}>
                    <h3>Items</h3>
                    <div>
                        <h5>Remove Sections(s)</h5>
                        <div>
                            <div className={styles.tableactionbutton}>+ Add public meal</div>
                            <div className={styles.tableactionbutton}>+ New Suggestion</div>
                        </div>
                    </div>
                </div>
                <div className={styles.suggestedmeal}>
                <table className={styles.request_table}>
                    <thead>
                    <tr className={styles.request_tr} style={{backgroundColor: 'transparent'}}>
                        <th className={styles.request_th}>ID number</th>
                        <th className={styles.request_th}>Name</th>
                        <th className={styles.request_th}>Status</th>
                        <th className={styles.request_th}>Categories</th>
                        <th className={styles.request_th}>Date Created</th>
                        <th className={styles.request_th}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.refId + " " + styles.request_tr}>
                            <td className={styles.request_td}>dfdsf</td>
                            <td className={styles.request_td}>saf</td>
                            <td className={styles.request_td + " " + status + " " + pending}>asf</td>
                            <td className={styles.request_td}>safa</td>
                            <td className={styles.request_td}>afa</td>
                            <td className={styles.request_td + " " + styles.actions_con}>
                                <div className={styles.tableactionbutton}>Send for review</div>
                                <CloseFillIcon style={actionIcon} />
                            </td>
                        </tr>
                        <tr className={styles.refId + " " + styles.request_tr}>
                            <td className={styles.request_td}>dfdsf</td>
                            <td className={styles.request_td}>saf</td>
                            <td className={styles.request_td + " " + status + " " + rejected}>asf</td>
                            <td className={styles.request_td}>safa</td>
                            <td className={styles.request_td}>afa</td>
                            <td className={styles.request_td+ " " + styles.actions_con}>
                                <div className={styles.tableactionbutton}>Send for review</div>
                                <CloseFillIcon style={styles.actionIcon} />
                            </td>
                        </tr>

                    </tbody>
                </table>
                </div>
            </div>
        </div>
        
    </div>
    )
}

export default SuggestedMeals