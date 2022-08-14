import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../State";

// Components
import { useDrag } from "react-dnd";
import { BsInfoCircle } from "react-icons/bs";

const Shift = ({
  shift,
  employee,
  currentShift,
  setCurrentShift,
  positionList,
  date,
  currentSchedule,
  multiShiftStyle,
}) => {
  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  function isPublished() {
    if (!currentSchedule.publishedTo) return false;

    return date.isBefore(currentSchedule.publishedTo.add(1, "day"), "day")
      ? true
      : false;
  }

  const [{ isDragging, didDrop }, dragRef] = useDrag(() => ({
    type: "shift",
    item: shift,

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop(),
    }),
  }));

  const shiftIsCurrentSchedule =
    shift.scheduleId === currentSchedule._id ? true : false;

  let classNames = "shift";
  const shiftStyles = {};

  if (shift && shiftIsCurrentSchedule) {
    classNames = classNames.concat(
      ` ${shift.colorCode} text ${isPublished() ? "published" : ""} `
    );

    shiftStyles.opacity = isDragging ? 0 : 1;
    shiftStyles.opacity = didDrop ? 0 : 1;
  } else {
    classNames = classNames.concat(" anotherSchedule");
  }

  if (currentShift?._id === shift._id) {
    classNames = classNames.concat(" current");
  }

  if (multiShiftStyle) {
    shiftStyles.marginTop = "0.5rem";
  }

  const handleEditShift = (e) => {
    e.stopPropagation();

    showModal({
      name: "MANAGE_SHIFT",
      title: "Edit Shift",
      shift: currentShift,
      positionList,
      employee,
    });
  };

  const handleFocusShift = (e, shift) => {
    e.stopPropagation();
    setCurrentShift({ ...shift });
  };

  const position = positionList.find((position) => {
    return position._id === shift.positionId;
  });

  return (
    <div
      className={classNames}
      style={shiftStyles}
      onClick={(e) => {
        handleFocusShift(e, shift);
      }}
      onDoubleClick={(e) => handleEditShift(e)}
      ref={shiftIsCurrentSchedule ? dragRef : null}
    >
      {shiftIsCurrentSchedule ? (
        <>
          <div>{`${shift.start.format("h:mma").slice(0, -1)} - ${shift.end
            .format("h:mma")
            .slice(0, -1)}`}</div>
          <div>{position.name}</div>
        </>
      ) : (
        <div>
          Scheduled <BsInfoCircle />
        </div>
      )}
    </div>
  );
};

export default Shift;
