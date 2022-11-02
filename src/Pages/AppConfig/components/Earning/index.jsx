import { actionCreators } from "../../../../state";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { Menu } from "antd";
import EarningRow from "./EarningRow";
import { Button } from "../../../../components";
import { useFetch } from "../../../../hooks";

const EarningSetup = () => {
  const [current] = useState("earningList");
  const [earningList, setEarningList] = useFetch("/earning");
  const dispatch = useDispatch();

  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleAddEarning = () => {
    showModal({
      name: "EARNING_CONFIG",
      title: "Create Earning",
      setEarningList,
      earning: {},
    });
  };

  return (
    <>
      <div className={`hide--medium ${styles.header}`}>
        <Menu
          selectedKeys={current}
          mode="horizontal"
          style={{ borderBottom: "none" }}
        >
          <Menu.Item key="earningList">
            <Link to="">Earning List</Link>
          </Menu.Item>
        </Menu>
      </div>

      <div>
        <div className={`list-header--md ${styles.columns}`}>
          <div className={styles.name}>Name</div>
          <div className="hide--tablet" style={{ margin: "auto" }}>
            Global Rate
          </div>
          <div className="hide--tablet" style={{ margin: "auto" }}>
            Overtime
          </div>
          <div className="hide--tablet" style={{ margin: "auto" }}>
            Primary
          </div>
          <div>Delete</div>
        </div>

        <div className="slideUpAnimation">
          {earningList
            ? earningList.map((el, index) => {
                return (
                  <EarningRow
                    key={index}
                    earning={el}
                    setEarningList={setEarningList}
                    showModal={showModal}
                  />
                );
              })
            : "No Earnings to show"}
          <div className={styles.addEarning}>
            <Button type="primary" onClick={handleAddEarning}>
              Add Earning
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EarningSetup;
