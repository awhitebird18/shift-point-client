import React from 'react';
import { timesheetRules } from '../../../../Misc/timesheetRules.js';

import { Select } from 'antd';
const { Option } = Select;

const PremiumSelect = ({ premiumId, premiumOptions }) => {
  return (
    <Select
      style={{ width: '100%', border: '1px solid var(--color-border)' }}
      bordered={false}
      value={premiumId}
      onChange={(e) => {
        updateBreakField(
          e,
          'premiumId',
          {
            ...breaksheetData,
            id: breaksheetData.id ? breaksheetData.id : uuidv4(),
          },
          timesheetData.id
        );
      }}
    >
      {premiumOptions}
    </Select>
  );
};

export default PremiumSelect;
