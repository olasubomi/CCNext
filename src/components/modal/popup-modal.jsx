import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import styles from '../../components/modal/modal.module.css'
import { useEffect, useRef, useState } from 'react';
import {AiFillCloseCircle} from 'react-icons/ai'
import axios from '../../util/Api';
import { toast } from 'react-toastify';

export const Modal = ({
    show,
    setShow,
    fetchList,
    details = {
        listName: '',
        description: '',
        id: ''
    },
    setDetails
}) => {

    const targetElementRef = useRef(null);
    const [modalState, setModalState] = useState({
        listName: details.listName,
        description: details.description
    })
    const { listName, description } = modalState

    function onChange(e) {
        setModalState({ ...modalState, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const targetElement = targetElementRef.current;

        disableBodyScroll(targetElement)
        if (show && targetElement) {
            disableBodyScroll(targetElement)
        } else {
            enableBodyScroll(targetElement)
        }
    }, [show])

    const handleCreate = async () => {
        if (!modalState.listName && !modalState.description) {
            return alert('Enter List Name and description')
        }
        try {
            const response = await axios(`/groceries/create`, {
                method: 'POST',
                data: {
                    listName: modalState.listName,
                    description: modalState.description
                },


            })
            fetchList()
            toast.success('Grocery list created successfully')
            setShow(!show)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async () => {
        if (!modalState.listName && !modalState.description) {
            return alert('Enter List Name and description')
        }
        try {
            const response = await axios(`/groceries/create/${details.id}`, {
                method: 'PATCH',
                data: {
                    listName: modalState.listName,
                    description: modalState.description
                },


            })
            fetchList()
            setDetails({
                listName: '',
                description: '',
                id: ''
            })
            toast.success('Grocery list edited successfully')
            setShow(!show)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.modal} ref={targetElementRef}>
            <div className={styles.modal_card}>
                <div className={styles.flex2}>
                    <h5 className={styles.header}>Create New Grocery List</h5>
                    <div onClick={() => {
                        setDetails({
                            listName: '',
                            description: '',
                            id: ''
                        })
                        setShow(false)
                    }}>
                        <AiFillCloseCircle color='#949494' size={28} />
                    </div>
                </div>
                <div style={{ width: '100%' }}>
                    <p className={styles.label}>Title</p>
                    <input
                        name="listName"
                        value={listName}
                        onChange={onChange}
                        className={styles.input1}
                    />
                </div>
                <div style={{ marginTop: '2.5rem' }}>
                    <p className={styles.label}>Description</p>
                    <textarea
                        name="description"
                        value={description}
                        onChange={onChange}
                        className={styles.input2}
                    />
                </div>
                <div className={styles.modal_btn} onClick={() => {
                    if (details.listName && details.description && details.id) {
                        handleEdit()
                    } else {
                        handleCreate()
                    }
                }}>
                    <p> {details.listName && details.description ? 'Update' : 'Create'} Now</p>
                </div>
            </div>
        </div>
    )
}