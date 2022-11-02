export const convertToOptionsArr = (arr, initialText) => {
  if (!arr) return;

  const options = arr.map((el, index) => {
    return (
      <Option
        key={el._id ? el._id : index}
        value={initialText === "Select a Position" ? el.positionId : el._id}
      >
        {el.name}
      </Option>
    );
  });

  if (initialText) {
    options.unshift(
      <Option key="undefined" value={undefined}>
        {initialText}
      </Option>
    );
  }

  return options;
};
