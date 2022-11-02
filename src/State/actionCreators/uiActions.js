import dayjs from "dayjs";
import axios from "axios";

export const setIsLoading = (value) => {
  return async (dispatch) => [
    dispatch({
      type: "setIsLoading",
      payload: {
        isLoading: value,
      },
    }),
  ];
};

export const displayErrorMessage = (errorTitle, errorMessage) => {
  return (dispatch) => {
    dispatch({
      type: "displayErrorMessage",
      payload: {
        errorTitle,
        errorMessage,
      },
    });
  };
};

export const showModal = (modalProps) => {
  return (dispatch) => {
    dispatch({
      type: "SHOW_MODAL",
      payload: modalProps,
    });
  };
};

export const setNotification = (notification) => {
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: notification,
    });
  };
};

export const addKeypress = (key) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_KEYPRESS",
      payload: key,
    });
  };
};

export const removeKeypress = (key) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_KEYPRESS",
      payload: key,
    });
  };
};

// Notifications
export const markAllAsRead = (notifications) => {
  return async (dispatch) => {
    const unviewedNotifications = notifications.filter((notification) => {
      return notification.unread;
    });

    if (unviewedNotifications.length === 0) return;

    const notificationIdArr = unviewedNotifications.map((notification) => {
      return `id=${notification._id}`;
    });

    const queryString = notificationIdArr.join("&");

    await fetch(
      `${process.env.REACT_APP_BASE_URL}/notification?${queryString}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: "MARK_AS_READ",
          payload: notificationIdArr,
        });
      });
  };
};

export const toggleRead = (notification) => {
  return async (dispatch) => {
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/notification/${
        notification._id
      }?unread=${!notification.unread}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",
      }
    ).then((res) => {
      dispatch({
        type: "TOGGLE_READ",
        payload: notification._id,
      });
    });
  };
};

export const fetchNotifications = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/notification");

    if (!data) return;

    const notifications = data.data.map((el) => {
      return { ...el, time: dayjs(el.time) };
    });

    dispatch({
      type: "STORE_NOTIFICATIONS",
      payload: notifications,
    });
  };
};

export const setStatusError = (status, title, subTitle) => {
  return (dispatch) => {
    dispatch({
      type: "setStatusError",
      payload: {
        status,
        title,
        subTitle,
      },
    });
  };
};
