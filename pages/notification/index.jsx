import { useEffect, useState } from "react";
import styles from "../../src/components/mobile/notification.module.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "../../src/util/Api";
import { FaCheck } from "react-icons/fa6";
import { RiMessage2Fill } from "react-icons/ri";
import moment from "moment";
import GoBack from "../../src/components/CommonComponents/goBack";
import { useRouter } from "next/navigation";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const getAllNotifications = async () => {
    try {
      const response = await axios.get(`/user/notifications`);
      setNotifications(response.data.data);
      console.log(response.data.data, "noti");
    } catch (err) {
      console.log(err);
    }
  };
  const router = useRouter();
  const updateNotification = async (id) => {
    try {
      const response = await axios.patch(`/user/notification/${id}`);

      getAllNotifications();
    } catch (err) {
      console.log(`Error updating notification with ID ${id}:`, err);
    }
  };
  const getOneItem = async (id) => {
    try {
      const response = await axios.get(`/items/item/${id}`);
      console.log(response.data, "resp");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllNotifications();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ width: "20px", height: "20px" }}>
          <GoBack />
        </div>
        <h1 className={styles.title}>Notifications</h1>
      </div>
      <div className={styles.not}>
        {notifications
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((elem) => (
            <div
              className={
                elem.read === false
                  ? styles.summary_notification
                  : styles.summary_notification2
              }
              onClick={() => updateNotification(elem._id)}
            >
              {elem.message.includes("Suggested Meal") ? (
                <div className={styles.rounded}>
                  <FaCheck color="black" size={14} />
                </div>
              ) : (
                <div className={styles.rounded2}>
                  <RiMessage2Fill size={15} color="#FFF" />
                </div>
              )}
              <div className={styles.summary_notification_Details}>
                <h3 className={styles.summary_notification_desc}>
                  {elem.message}
                </h3>
                <p className={styles.summary_notification_link}>
                  {elem.message.includes("Suggested Meal") ? (
                    <p
                      onClick={() => {
                        router.push("/dashboard/suggestedmeals");
                      }}
                    >
                      View Item
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        if (elem.notifiableType === "Comment") {
                          getOneItem(elem.notifiable.id);
                          router.push(`/meal/${elem?.notifiable?.id}`);
                        } 
                      }}
                    >
                      View Comment
                    </p>
                  )}
                </p>
                <p className={styles.summary_notification_time}>
                  {moment(elem.createdAt).fromNow()}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Notification;
