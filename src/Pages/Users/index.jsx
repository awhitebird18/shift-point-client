import { useState } from "react";
import styles from "./index.module.css";
import Header from "./components/Layout/Header";
import Body from "./components/Layout/Body";
import AccountList from "./components/AccountList/AccountList";
import { useFetch } from "../../hooks";

const UserAccount = () => {
  const [currentUser, setCurrentUser] = useState();
  const [userList, setUserList] = useFetch("userAccounts");

  return (
    <section className={styles.container}>
      {userList && (
        <Header
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          userList={userList}
        />
      )}

      {userList && (
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
      )}
    </section>
  );
};

export default UserAccount;
