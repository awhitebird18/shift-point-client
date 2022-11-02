import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../state";
import { Select } from "antd";

const PremiumSelect = ({
  premiumId,
  premiumOptions,
  timedata,
  premiumData,
}) => {
  const dispatch = useDispatch();

  const { updatePremiumField } = bindActionCreators(actionCreators, dispatch);

  return (
    <Select
      style={{ width: "100%", border: "1px solid var(--color-border)" }}
      bordered={false}
      value={premiumId}
      onChange={(e) => {
        updatePremiumField(e, "premiumId", { ...premiumData }, { ...timedata });
      }}
    >
      {premiumOptions}
    </Select>
  );
};

export default PremiumSelect;
