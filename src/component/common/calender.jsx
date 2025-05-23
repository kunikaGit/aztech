import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

const tradeData = {
  '2021-06-01': { profit: 100, trades: 3 },
  '2021-06-02': { profit: 99, trades: 5 },
  '2021-06-03': { profit: 796, trades: 6 },
  '2021-06-04': { profit: -66, trades: 1 },
  '2021-06-05': { profit: -128, trades: 6 },
  '2021-06-09': { profit: 515, trades: 6 },
  '2021-06-10': { profit: 515, trades: 6 },
  '2021-06-24': { profit: 796, trades: 6 },
};

const DailyCalender = ({handleClose}) => {
  const [value, setValue] = useState(new Date(2021, 5)); // June 2021
  console.log('Selected Date:', value);

  
  const tileClassName = ({ date, view }) => {
    const isSelected = format(date, 'yyyy-MM-dd') === format(value, 'yyyy-MM-dd');
    if (view === 'month') {
      const key = format(date, 'yyyy-MM-dd');
      const data = tradeData[key];
      if (data) {
        return `${data.profit >= 0 ? 'green-tile' : 'red-tile'} ${isSelected ? 'selected-tile' : ''}`;
      }
    }
    return isSelected ? 'selected-tile' : null;
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const key = format(date, 'yyyy-MM-dd');
      const data = tradeData[key];

      if (data) {
        return (
          <div className={`tile-box ${data.profit >= 0 ? 'green' : 'red'}`}>
            <div className="profit">{data.profit >= 0 ? `+$${data.profit}` : `-$${Math.abs(data.profit)}`}</div>
            <div className="trades">{data.trades} trades</div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={(date) => {
          setValue(date);
          if (handleClose) handleClose(); 
        }}
        
        value={value}
        tileContent={tileContent}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default DailyCalender;
