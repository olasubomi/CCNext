import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import styles from '../../components/modal/modal.module.css'
import { useEffect, useRef } from 'react';

export const Modal = ({ show, setShow }) => {
    const targetElementRef = useRef(null);

    useEffect(() => {
        const targetElement = targetElementRef.current;

        disableBodyScroll(targetElement)
        if (show && targetElement) {
            disableBodyScroll(targetElement)
        } else {
            enableBodyScroll(targetElement)
        }
    }, [show])

    return (
        <div className={styles.modal} ref={targetElementRef}>
            <div className={styles.modal_card}>
                <div className={styles.flex2}>
                    <h5 className={styles.header}>Create New Grocery List</h5>
                    <div className={styles.close} onClick={() => setShow(false)}>
                        <p>x</p>
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <p className={styles.label}>Title</p>
                    <input name="title" className={styles.input1} />
                </div>
                <div style={{marginTop: '2.5rem'}}>
                    <p className={styles.label}>Description</p>
                    <input name="description" className={styles.input2} />
                </div>
                <div className={styles.modal_btn}>
                    <p>Create Now</p>
                </div>
            </div>
        </div>
    )
}