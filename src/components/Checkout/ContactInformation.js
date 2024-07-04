import styles from '../../../src/components/Checkout/style.module.css'
const ContactInformation = () => {
  return (
    <div className={styles.box_contact_information}>
        <h2 className={styles.sectionHeaderText}>Enter your Contact Information</h2>
        <div className={styles.contact_information}>
           <div>
                <label htmlFor='fistname'>Firstname</label>
                <input type='text' name='firstname' id='fistname' />
           </div>
           <div>
                <label htmlFor='lastname'>Lastname</label>
                <input type='text'name='lastname' id='lastname' />
           </div>
           <div>
                <label htmlFor='email'>Email address</label>
                <input type='email' name='email' id='email' />
           </div>
           <div>
                <label htmlFor='phone'>Phone number</label>
                <input type='tel' name='phone' id='phone' />
           </div>
           <div>
                <label htmlFor='address'>Address</label>
                <input type='text' name='address' id='address' />
           </div>
        </div>
    </div>
  )
}

export default ContactInformation