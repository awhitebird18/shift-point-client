// React
import { useState } from "react";
import { useFetch } from "../../../Hooks";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../State";

// Styles
import positionStyles from "./index.module.css";
import styles from "./index.module.css";

// Components
import PositionRow from "./PositionRow.jsx";
import { Button } from "../../../Components";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const PositionSetup = () => {
  const [current] = useState("positionList");
  const [positionList, setPositionList] = useFetch("/position");
  const [premiumList] = useFetch("/premium");
  const [departmentList] = useFetch("/department");
  const [earningList] = useFetch("/earning");

  const dispatch = useDispatch();

  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleAddPosition = () => {
    showModal({
      name: "POSITION_CONFIG",
      title: "Create Position",
      position: {},
      departmentList,
      earningList,
      premiumList,
      setPositionList,
    });
  };

  return (
    <>
      <div className={styles.header}>
        <Menu
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
        <div className={positionStyles.remove}>Delete</div>
      </div>
      <div className="slideUpAnimation">
        <div>
          {positionList && departmentList && earningList && premiumList
            ? positionList.map((el, index) => {
                return (
                  <PositionRow
                    key={index}
                    position={el}
                    setPositionList={setPositionList}
                    showModal={showModal}
                    departmentList={departmentList}
                    earningList={earningList}
                    premiumList={premiumList}
                  />
                );
              })
            : "No Positions to show"}
        </div>

        <div className={positionStyles.addPosition}>
          <Button type="primary" onClick={handleAddPosition}>
            Add Position
          </Button>
        </div>
      </div>
    </>
  );
};

export default PositionSetup;
