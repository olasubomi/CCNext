import styles from './suggesteddescription.module.css'
import axios from '../../util/Api'
import { CloseFillIcon, FillterIcon } from '../../components/icons'
import { IoMdCloseCircle } from 'react-icons/io'



export const SuggestedDescription = ({ descriptions, updateDescription, deleteDescription, status, setStatus }) => {

    const handleStatus = () => {
        if (status === 'all') {
            setStatus('Pending')
        } else if (status === 'Pending') {
            setStatus('Rejected')
        } else if (status === 'Rejected') {
            setStatus('Draft')
        } else if (status === 'Draft') {
            setStatus('Public')
        } else {
            setStatus('all')
        }
    }
    return (
        <div className={styles.container}>
            <table style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr' }}>
                <thead>
                    <tr className={styles.th1}>
                        <td className={styles.td}>Name</td>
                        <td className={styles.td}>
                            <p>Formatted string <FillterIcon style={styles.FillterIcon} /></p>

                        </td>
                        <td className={styles.td}>
                            <p style={{ cursor: 'pointer' }} onClick={handleStatus}>Status <FillterIcon style={styles.FillterIcon} /></p>
                        </td>
                        <td className={styles.td}>
                            <p>Date created <FillterIcon style={styles.FillterIcon} /></p>
                        </td>
                        <td className={styles.td}>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        descriptions.map((element) => (
                            <tr key={element?._id} className={styles.tr1}>
                                <td className={styles.td1}>{element?.description_key?.split('_').join(' ')}</td>
                                <td className={styles.td1}>{element?.formatted_string}</td>
                                <td className={styles.td1}>
                                    <p className={element.status === 'Public'
                                        ? styles.statusText : element.status === 'Pending'
                                            ? styles.statusText2 : element.status === 'Rejected'
                                                ? styles.rejected : styles.statusText2} style={{ textTransform: 'capitalize' }} >{element?.status}</p>
                                </td>
                                <td className={styles.td1}>{new Date(element?.createdAt)?.toLocaleDateString()}</td>
                                <td className={styles.td1}>
                                    <select onChange={(e) => {
                                        updateDescription({ status: e.target.value, _id: element?._id })
                                    }} className={styles.selected}>
                                        <option selected={element.status === 'Public'} value='Public'>
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
                                       
                                    </select>
                                    <IoMdCloseCircle size={22} style={{ marginLeft: '.8rem', cursor: 'pointer' }} color='grey' onClick={() => deleteDescription(element._id)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}