export const deleteTimedata = (data, type) => {
  const entriesToRemove = data
    .filter((el) => {
      return el.remove;
    })
    .map((el) => {
      return el.id;
    });

  fetch(`${process.env.REACT_APP_BASE_URL}/${type}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
    cors: "no-cors",
    body: JSON.stringify(entriesToRemove),
  });
};
