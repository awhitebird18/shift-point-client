import { actionCreators } from "../../../State";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

// Components
import { useFetch } from "../../../Hooks";
import { Image, Transformation } from "cloudinary-react";
import userOutline from "../../../Assets/userOutline.png";
import { BsEyeFill } from "react-icons/bs";

// Styles
import styles from "./Post.module.css";

const Post = ({ post, setBulletins }) => {
  // DEV: Should be able to store employees in redux as well on app load.
  const [employees] = useFetch("/employee");
  const dispatch = useDispatch();

  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleEditBulletin = () => {
    showModal({
      name: "MANAGE_POST",
      post,
      setBulletins,
    });
  };

  return (
    <div className={styles.post} onClick={handleEditBulletin}>
      <div className={styles.info}>
        <h3>{post.title}</h3>
        <h4
          className={`color-gray--4 ${styles.author}`}
        >{`${post.author} - ${post.createdAt}`}</h4>
      </div>
      <div className={`color-gray--4 ${styles.postViewed}`}>
        <BsEyeFill />
        <div className={styles.postViewedBy}>
          {post.seen?.length > 0 && employees?.length > 0 ? (
            post.seen.map((employeeId, index) => {
              const employee = employees.find((el) => {
                return el._id === employeeId;
              });

              return (
                <div key={index} className={styles.employeeRow}>
                  <div className={styles.imageContainer}>
                    {employee?.employeeImage ? (
                      <Image
                        cloudName="dwkvw91pm"
                        publicId={employee.employeeImage}
                      >
                        <Transformation width="30" crop="scale" />
                      </Image>
                    ) : (
                      <img src={userOutline} alt="" style={{ width: "100%" }} />
                    )}
                  </div>
                  <div
                    className={styles.employeeName}
                  >{`${employee.firstName} ${employee.lastName}`}</div>
                </div>
              );
            })
          ) : (
            <div className={styles.employeeRow}>
              <div className={styles.employeeName}>Not seen</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
