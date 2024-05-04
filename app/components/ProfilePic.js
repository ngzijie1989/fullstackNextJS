/* eslint-disable @next/next/no-img-element */
import styles from "@/app/css/account.module.css"

function ProfilePic({imagePath}) {
  return (
    <div>
        <img src={imagePath} alt="profileimage" className={styles.accountImage} />
    </div>
  )
}

export default ProfilePic
