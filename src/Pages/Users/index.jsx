import { useState } from "react";

// Styles
import styles from "./index.module.css";

// Components
import Header from "./Layout/Header/Header";
import Body from "./Layout/Body/Body.jsx";
import AccountList from "./AccountList/AccountList";

// Functions
import { useFetch } from "../../Hooks";

const UserAccount = () => {
  const [currentUser, setCurrentUser] = useState();
  const [userList, setUserList] = useFetch("userAccounts");

  return (
    <section className={styles.container}>
      {userList?.length && (
        <Header
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          userList={userList}
        />
      )}

      <>
        {currentUser ? (
          <Body
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setUserList={setUserList}
          />
        ) : (
          <AccountList setCurrentUser={setCurrentUser} userList={userList} />
        )}
      </>
    </section>
  );
};

export default UserAccount;
