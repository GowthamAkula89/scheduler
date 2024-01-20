import React from 'react';
import "../SchedulerCard/schedulerCard.css";
const RepeatField = ({ frequency, repeat, handleRepeatChange }) => {
  if (frequency === "Weekly") {
    return (
      <div className="card-data">
        <p className="card-text">Repeat</p>
        <div className="weekdays">
          {['S', 'M', 'T', 'W', 'Th', 'F', 'Su'].map((day, index) => (
            <button
              key={index}
              type="button"
              className={`weekday ${repeat === day ? 'active' : ''}`}
              onClick={() => handleRepeatChange({ target: { value: day } })}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    );
  } else if (frequency === "Monthly") {
    return (
      <div className="card-data">
        <p className="card-text">Repeat</p>
        <select
          className="card-input"
          name="repeat"
          value={repeat}
          onChange={handleRepeatChange}
        >
          <option value="firstMonday">First Monday</option>
          <option value="lastFriday">Last Friday</option>
        </select>
      </div>
    );
  } else {
    return null;
  }
};

export default RepeatField;
