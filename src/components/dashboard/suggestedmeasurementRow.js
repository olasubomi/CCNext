import styles from './suggesteddescription.module.css'
import axios from '../../util/Api'

export const SuggestedMeasurement = ({ measurements, updateMeasurement, deleteMeasurement}) => {

    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <td className={styles.td}>Measurement name</td>
                        <td className={styles.td}>Measurement status</td>
                        <td className={styles.td}>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        measurements.map((element) => (
                            <tr key={element?._id}>
                                <td className={styles.td}>{element?.measurement_name?.split('_').join(' ')}</td>
                                <td className={styles.td}>{element?.status}</td>
                               
                                <td className={styles.td}>
                                    <select onChange={(e) => {
                                        if (e.target.value !== 'DELETE') {
                                            updateMeasurement({ status: e.target.value, measurement_name: element?.measurement_name })
                                        } else (
                                            deleteMeasurement({measurement_name: element?.measurement_name})
                                        )
                                    }}>
                                        <option selected={element.status === 'Public'} value='Public'>
                                            PUBLIC
                                        </option>
                                        <option selected={element.status === 'Rejected'} value='Rejected'>
                                            REJECTED
                                        </option>
                                        <option selected={element.status === 'Pending'} value='Pending'>
                                            PENDING
                                        </option>
                                        <option selected={element.status === 'Draft'} value='Draft'>
                                            DRAFT
                                        </option>
                                        <option value='DELETE'>
                                            DELETE
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