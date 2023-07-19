import styles from './suggesteddescription.module.css'
import axios from '../../util/Api'

export const SuggestedDescription = ({ descriptions, updateDescription, deleteDescription }) => {

    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <td className={styles.td}>Description name</td>
                        <td className={styles.td}>Quantity</td>
                        <td className={styles.td}>Measurement</td>
                        <td className={styles.td}>Formatted string</td>
                        <td className={styles.td}>Status</td>
                        <td className={styles.td}>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        descriptions.map((element) => (
                            <tr key={element?._id}>
                                <td className={styles.td}>{element?.description_key?.split('_').join(' ')}</td>
                                <td className={styles.td}>{element?.object_quantity}</td>
                                <td className={styles.td}>{element?.object_measurement}</td>
                                <td className={styles.td}>{element?.formatted_string}</td>
                                <td className={styles.td}>{element?.status}</td>
                                <td className={styles.td}>
                                    <select onChange={(e) => {
                                        if (e.target.value !== 'DELETE') {
                                            updateDescription({ status: e.target.value, _id: element?._id })
                                        } else (
                                            deleteDescription(element._id)
                                        )
                                    }}>
                                        <option selected={element.status === 'PUBLIC'} value='PUBLIC'>
                                            PUBLIC
                                        </option>
                                        <option selected={element.status === 'REJECTED'} value='REJECTED'>
                                            REJECTED
                                        </option>
                                        <option selected={element.status === 'PENDING'} value='PENDING'>
                                            PENDING
                                        </option>
                                        <option selected={element.status === 'DRAFT'} value='DRAFT'>
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