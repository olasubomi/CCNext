import styles from "./stores.module.css";
import mapImage from "../../../public/assets/logos/map.png"
import Image from "next/image";

function Stores(){
    
    return(

        <div className={styles.stores_con}>
            <div className={styles.store_map}>
                <Image src={mapImage} />
            </div>
            <div className={styles.stores}>
                <h4>Availalble at (4) stores around you</h4>
                <div className={styles.store}>
                    <h4>Oriental Store</h4>
                    <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
                </div>
                <div className={styles.store}>
                    <h4>Oriental Store</h4>
                    <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
                </div>
                <div className={styles.store}>
                    <h4>Oriental Store</h4>
                    <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
                </div>
            </div>
        </div>
    )
}

export default Stores;