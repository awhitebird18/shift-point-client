// Styles
import styles from "./ProfilePicture.module.css";

// Components
import { Image } from "cloudinary-react";

const ProfilePicture = ({ user, icon: Icon, style, className }) => {
  return (
    <div className={`${styles.userImageCont} ${className}`} style={style}>
      {user?.profileImage ? (
        <Image
          cloudName="dwkvw91pm"
          publicId={user.profileImage}
          style={{ height: "100%", objectFit: "cover" }}
        />
      ) : Icon ? (
        <Icon />
      ) : (
        <span className={styles.text}>
          {`${user?.firstName.substring(0, 1)}${user?.lastName.substring(
            0,
            1
          )}`}
        </span>
      )}
    </div>
  );
};

export default ProfilePicture;
