import { actionCreators } from "../../../State";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

// Components
import { BsClipboardPlus } from "react-icons/bs";
import Post from "./Post";
import TileLayout from "../TileLayout/TileLayout";

// Styles
import styles from "./Bulletin.module.css";

// Functions
import { useFetch } from "../../../Hooks";

const Bulletin = () => {
  const [bulletins, setBulletins] = useFetch("/bulletin");

  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleAddBulletin = () => {
    showModal({
      name: "MANAGE_POST",
      post: {},
      setBulletins,
    });
  };

  return (
    <div className={styles.container}>
      {bulletins?.map((post, index) => {
        if (index > 2) {
          return;
        }
        return <Post key={index} post={post} setBulletins={setBulletins} />;
      })}

      <p className={styles.viewMoreText}>View More Bulletins</p>
    </div>
  );
};

export default Bulletin;
