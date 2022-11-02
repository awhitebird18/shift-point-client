import { actionCreators } from "../../../../state";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { Avatar, Tooltip } from "antd";
import { useFetch } from "../../../../hooks";
import styles from "./Post.module.css";

const Post = ({ post, setBulletins }) => {
  // DEV: Should be able to store employees in redux as well on app load.
  const [employees] = useFetch("/employee");
  const dispatch = useDispatch();

  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleEditBulletin = () => {
    showModal({
      name: "MANAGE_POST",
      title: "Edit Bulletin",
      post,
      setBulletins,
    });
  };

  const avatarColors = ["#722ed1", "#13c2c2", "#eb2f96", "#1890ff", "#52c41a"];

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
        {/* Avatars */}
        <Avatar.Group
          maxCount={2}
          maxStyle={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }}
        >
          {employees &&
            post.seen.map((employeeId, index) => {
              const employee = employees.find((el) => {
                return el._id === employeeId;
              });

              if (!employee) return;

              return (
                <Tooltip
                  key={employeeId}
                  title={`${employee.firstName} ${employee.lastName}`}
                  placement="bottom"
                  style={{ color: "#fff" }}
                >
                  <Avatar
                    style={{
                      backgroundColor: avatarColors[index],
                      color: "#fff !important",
                    }}
                  >
                    {employee.firstName.substring(0, 1)}
                  </Avatar>
                </Tooltip>
              );
            })}
        </Avatar.Group>
      </div>
    </section>
  );
};

export default Post;
