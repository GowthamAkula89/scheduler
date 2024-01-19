import React, { useState,useEffect } from "react";
import "./schedulerCard.css";

const SchedulerCard = ({title, schedule, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    frequency: "Daily",
    repeat: "",
    selectedTime: "",
  });
  useEffect(() => {
    if (schedule) {
      // If editing existing schedule, populate the form with schedule data
      setFormData({ ...schedule });
    }
  }, [schedule]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRepeatChange = (e) => {
    setFormData({
      ...formData,
      repeat: e.target.value,
    });
  };

  const handleTimeChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      selectedTime: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log("Form submitted with data:", formData);
  };

  const renderRepeatField = () => {
    if (formData.frequency === "Weekly") {
      return (
        <div className="card-data">
          <p className="card-text">Repeat</p>
          <div className="weekdays">
            {['S', 'M', 'T', 'W', 'Th', 'F', 'Su'].map((day, index) => (
              <button
                key={index}
                type="button"
                className={`weekday ${formData.repeat === day ? 'active' : ''}`}
                onClick={() => handleRepeatChange({ target: { value: day } })}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      );
    } else if (formData.frequency === "Monthly") {
      return (
        <div className="card-data">
          <p className="card-text">Repeat</p>
          <select
            className="card-input"
            name="repeat"
            value={formData.repeat}
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

  return (
    <form className="scheduler-card" onSubmit={handleSubmit}>
    <p className="form-header">{title}</p>
    <div className="card-data">
      <p className="card-text">Title</p>
      <input
        className="card-input"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
    </div>
    <div className="card-data">
      <p className="card-text">Description</p>
      <input
        className="card-input"
        type="text"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />
    </div>
    <div className="card-data">
      <p className="card-text">Subject</p>
      <input
        className="card-input"
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleInputChange}
      />
    </div>
    <div className="card-data">
      <p className="card-text">Frequency</p>
      <select
        className="card-input"
        name="frequency"
        value={formData.frequency}
        onChange={handleInputChange}
      >
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
    </div>
      {renderRepeatField()}
      <div className="card-data">
        <p className="card-text">Time</p>
        <select
          className="card-input"
          name="selectedTime"
          value={formData.selectedTime}
          onChange={handleTimeChange}
        >
          {Array.from({ length: 24 }, (_, i) => {
            const hour = i.toString().padStart(2, '0');
            const displayHour = i <= 12 ? (i === 0 ? 12 : i) : i - 12;
            const period = i < 12 ? 'AM' : 'PM';
            return (
              <option key={hour} value={`${hour}:00`}>
                {`${displayHour}:00 ${period}`}
              </option>
            );
          })}
        </select>
      </div>
      <div className="handle-submit">
        <button className="cancel-btn" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="done-btn" type="submit">
        {title !=="Add Schedule" ? "Update" : "Done"}
        </button>
      </div>
    </form>
  );
};

export default SchedulerCard;
