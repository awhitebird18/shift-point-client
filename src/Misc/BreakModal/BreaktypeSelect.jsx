import React from 'react';
import { timesheetRules } from '../../../../Misc/timesheetRules.js';

import { Select } from 'antd';
const { Option } = Select;

const BreaktypeSelect = ({ updateBreakField, breakTypeId, breaksheetData }) => {
  const breakTypeOptions = timesheetRules.breaks.map((breakEl, index) => {
    return (
      <Option key={index} value={breakEl.breakTypeId}>
        {breakEl.name}
      </Option>
    );
  });

  return (
    <Select
      style={{ width: '100%', border: '1px solid var(--color-border)' }}
      bordered={false}
      value={breakTypeId}
      onChange={(e) => {
        updateBreakField(
          e,
          'breakTypeId',
          {
            ...breaksheetData,
            id: breaksheetData.id ? breaksheetData.id : uuidv4(),
          },
          timesheetData.id
        );
      }}
    >
      {breakTypeOptions}
    </Select>
  );
};

export default BreaktypeSelect;
