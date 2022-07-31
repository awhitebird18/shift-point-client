import { useState } from "react";

// Components
import { Form, Input, Checkbox } from "antd";
const { TextArea } = Input;

// Functions
import postToDB from "../../../Hooks/postToDB";
import { useFetch, usePatchDoc } from "../../../Hooks";
import { Button } from "../../../Components";

// Styles
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
        console.log(updatedDoc);

        stateCopy.splice(index, 1, updatedDoc);

        return stateCopy;
      });
    } else {
      const newDoc = await postToDB("/bulletin", newBulletin);

      setBulletins((state) => {
        console.log([newDoc, ...state]);
        return [newDoc, ...state];
      });
    }

    showModal(null);
  };

  const handleChange = (value, field) => {
    console.log(value, field);
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
        />
      </Form.Item>
      <Form.Item label="High Priority">
        <Checkbox
          checked={currentBulletin.highPriority}
          onChange={(e) => handleChange(e.target.checked, "highPriority")}
        />
      </Form.Item>

      <div className={styles.formActions}>
        <Button onClick={handleCancel} type="secondary">
          Cancel
        </Button>
        <Button onClick={handleOk}>Save</Button>
      </div>
    </Form>
  );
};

export default ManagePost;
