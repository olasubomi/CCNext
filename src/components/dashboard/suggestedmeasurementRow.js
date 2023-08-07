import styles from './suggesteddescription.module.css'
import axios from '../../util/Api'
import { FillterIcon } from '../icons'

export const SuggestedMeasurement = ({ measurements, updateMeasurement, deleteMeasurement, status, setStatus}) => {

    const handleStatus = () => {
        if(status === 'all'){
            setStatus('Pending')
        } else if(status === 'Pending'){
            setStatus('Rejected')
        } else if(status === 'Rejected'){
            setStatus('Draft')
        } else if(status === 'Draft'){
            setStatus('Public')
        } else { 
            setStatus('all')
        }
    }
    return (
        <div className={styles.container}>
            <table style={{width: '100%'}}>
                <thead>
                    <tr>
                        <td className={styles.td}>Name</td>
                        <td className={styles.td} style={{cursor: 'pointer'}} onClick={handleStatus} >Status <FillterIcon style={styles.FillterIcon}/></td>
                        <td className={styles.td}>Date created <FillterIcon style={styles.FillterIcon}/></td>
                        <td className={styles.td}>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        measurements.map((element) => (
                            <tr key={element?._id} style={{borderBottom: '.4px solid grey'}}>
                                <td className={styles.td}>{element?.measurement_name?.split('_').join(' ')}</td>
                                <td className={styles.td}>
                                <p style={{textTransform: 'capitalize'}} className={element.status === 'Public'
                                        ? styles.statusText3 : element.status === 'Pending'
                                            ? styles.statusText4 : element.status === 'REJECTED'
                                                ? styles.rejected2 : styles.statusText4} >{element?.status}</p>
                                </td>
                                <td className={styles.td}>{new Date(element?.createdAt)?.toLocaleDateString()}</td>
                               
                                <td className={styles.td}>
                                    <select onChange={(e) => {
                                        if (e.target.value !== 'DELETE') {
                                            updateMeasurement({ status: e.target.value, measurement_name: element?.measurement_name })
                                        } else (
                                            deleteMeasurement({measurement_name: element?.measurement_name})
                                        )
                                    }} style={{border: '.3px solid grey', fontSize: '1.2rem', outline: 'none', padding: '.4rem .rem'}}>
                                        <option selected={element.status === 'Public'} value='Public' style={{fontSize: '.5rem'}}>
                                            Public
                                        </option>
                                        <option selected={element.status === 'Rejected'} value='Rejected'>
                                            Rejected
                                        </option>
                                        <option selected={element.status === 'Pending'} value='Pending'>
                                            Pending
                                        </option>
                                        <option selected={element.status === 'Draft'} value='Draft'>
                                            Draft
                                        </option>
                                        <option value='DELETE'>
                                            Delete
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}