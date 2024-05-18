import React from "react";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <img src={`${process.env.PUBLIC_URL}/Images/404.png`} alt="404" className={styles.notfoundimg} />
    </div>
    );
}

export default NotFound;
