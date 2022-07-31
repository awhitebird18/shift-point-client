// React
import { useState } from "react";
import { useFetch } from "../../../Hooks";

// Styles
import positionStyles from "./index.module.css";
import styles from "../index.module.css";

// Components
import PositionRow from "./PositionRow.jsx";
import { Button } from "antd";
import PositionModal from "./PositionModal";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const PositionSetup = () => {
  const [current] = useState("positionList");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({
    name: "",
    departmentId: "",
    earningId: "",
    premium: [],
  });
  const [positionList, setPositionList] = useFetch("/position");
  const [premiumList] = useFetch("/premium");
  const [departmentList] = useFetch("/department");
  const [earningList] = useFetch("/earning");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClick = () => {};

  return (
    <>
      <div className={`hide-medium ${styles.header}`}>
        <Menu
          onClick={handleClick}
          selectedKeys={current}
          mode="horizontal"
          style={{ borderBottom: "none" }}
        >
          <Menu.Item key="positionList">
            <Link to="">Position List</Link>
          </Menu.Item>
        </Menu>
      </div>

      <div className={`list-header--md ${positionStyles.columns}`}>
        <div>Position Name</div>
        <div>Department</div>
        <div className="hide--tablet">Earning</div>
        <div className="hide--tablet">Premium</div>
        <div className={positionStyles.remove}>Edit</div>
        <div className={positionStyles.remove}>Delete</div>
      </div>
      <div className="slideUpAnimation">
        <div>
          {positionList && departmentList && earningList
            ? positionList.map((el, index) => {
                return (
                  <PositionRow
                    key={index}
                    position={el}
                    setPositionList={setPositionList}
                    showModal={showModal}
                    setIsModalVisible={setIsModalVisible}
                    setCurrentPosition={setCurrentPosition}
                    departmentList={departmentList}
                    earningList={earningList}
                    premiumList={premiumList}
                  />
                );
              })
            : "No Positions to show"}
        </div>

        <div className={positionStyles.addPosition}>
          <Button type="primary" onClick={showModal}>
            Add Position
          </Button>
        </div>
      </div>

      {isModalVisible && (
        <PositionModal
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          departmentList={departmentList}
          earningList={earningList}
          setPositionList={setPositionList}
          premiumList={premiumList}
        />
      )}
    </>
  );
};

export default PositionSetup;
