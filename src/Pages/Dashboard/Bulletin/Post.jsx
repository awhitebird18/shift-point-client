import { actionCreators } from "../../../State";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { Avatar, Divider, Tooltip } from "antd";

// Components
import { useFetch } from "../../../Hooks";
import { Image, Transformation } from "cloudinary-react";
import userOutline from "../../../Assets/userOutline.png";
import { BsEyeFill, BsEye } from "react-icons/bs";

import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";

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
    <section className={styles.post} onClick={handleEditBulletin}>
      <h3 className={styles.title}>{post.title}</h3>
      <div className={styles.info}>
        <div>
          <h4>Published By:</h4>
          <h4 className={`${styles.author}`}>{`${post.author}`}</h4>
        </div>
        <div>
          <h4>Publish Date:</h4>
          <h4 className={styles.author}>{`${post.createdAt}`}</h4>
        </div>
      </div>
      <div className={styles.postViewed}>
        <Avatar.Group
          maxCount={2}
          maxStyle={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }}
        >
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <Avatar
            style={{
              backgroundColor: "#f56a00",
            }}
          >
            K
          </Avatar>
          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{
                backgroundColor: "#87d068",
              }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar
            style={{
              backgroundColor: "#1890ff",
            }}
            icon={<AntDesignOutlined />}
          />
        </Avatar.Group>
        {/* <BsEye size={25} color="#fff" /> */}
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
    </section>
  );
};

export default Post;
