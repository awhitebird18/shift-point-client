import { useState } from "react";
import { Form, Input, Checkbox } from "antd";
const { TextArea } = Input;
import postToDB from "../../../../hooks/postToDB";
import { useFetch, usePatchDoc } from "../../../../hooks";
import { Button } from "../../../../components";
import styles from "./ManagePost.module.css";

const ManagePost = ({ post, setBulletins, showModal }) => {
  const [currentBulletin, setCurrentBulletin] = useState(post);
  // DEV: Can store current user in redux so we dont need to perform the call
  const [currentUser] = useFetch("/userAccounts");

  const handleOk = async () => {
    const newBulletin = {
      ...currentBulletin,
      createdAt: new Date(Date.now()).toDateString(),
      author: `${currentUser[0].firstName} ${currentUser[0].lastName}`,
    };

    if (currentBulletin._id) {
      const updatedDoc = await usePatchDoc("/bulletin", newBulletin);

      setBulletins((state) => {
        const stateCopy = [...state];
        const index = stateCopy.findIndex((el) => updatedDoc._id === el._id);

        stateCopy.splice(index, 1, updatedDoc);

        return stateCopy;
      });
    } else {
      const newDoc = await postToDB("/bulletin", newBulletin);

      setBulletins((state) => {
        return [newDoc, ...state];
      });
    }

    showModal(null);
  };

  const handleChange = (value, field) => {
    setCurrentBulletin((prev) => {
      return { ...prev, [field]: value };
    });
  };

  const handleCancel = () => {
    showModal(null);
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Post Title">
        <Input
          value={currentBulletin.title}
          onChange={(e) => handleChange(e.target.value, "title")}
        />
      </Form.Item>
      <Form.Item label="Post Content">
        <TextArea
          value={currentBulletin.content}
          onChange={(e) => handleChange(e.target.value, "content")}
          style={{
            width: "25rem",
            maxWidth: "100%",
            minHeight: "15rem",
          }}
        />
      </Form.Item>
      <Form.Item label="High Priority">
        <Checkbox
          checked={currentBulletin.highPriority}
          onChange={(e) => handleChange(e.target.checked, "highPriority")}
        />
      </Form.Item>

      <div className={styles.formActions}>
        <Button
          onClick={handleCancel}
          type="secondary"
          style={{ marginLeft: "auto", minWidth: "5rem" }}
        >
          Cancel
        </Button>
        <Button onClick={handleOk} style={{ minWidth: "5rem" }}>
          Save
        </Button>
      </div>
    </Form>
  );
};

export default ManagePost;
