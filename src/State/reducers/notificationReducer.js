const initialState = { notifications: [] };

const markAsRead = (state, action) => {
  const updatedNotifications = state.notifications.map((notification) => {
    if (action.payload.includes(`id=${notification._id}`)) {
      return { ...notification, unread: false };
    }

    if (notification._id === "62bef2888be9c9b1c67d6cc9") {
    }

    return notification;
  });

  return { ...state, notifications: updatedNotifications };
};

const toggleRead = (state, action) => {
  const notifications = [...state.notifications];

  const notification = notifications.find((notification) => {
    return notification._id === action.payload;
  });

  if (notification) {
    notification.unread = !notification.unread;
  }

  return { ...state, notifications: notifications };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_NOTIFICATIONS":
      return { ...state, notifications: action.payload };

    case "MARK_AS_READ":
      return markAsRead(state, action);

    case "TOGGLE_READ":
      return toggleRead(state, action);

    default:
      return state;
  }
};

export default reducer;
