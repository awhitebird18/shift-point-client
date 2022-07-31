fetch("${process.env.REACT_APP_BASE_URL}payschedule", {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  method: "DELETE",
  cors: "no-cors",
});

export const hello = "doggo";
