import React, { useState, useEffect } from 'react';
import './schedulerData.css';
import Search from '../Search';
import AddButton from '../AddButton';
import SchedulerList from '../SchedulerList';
import SchedulerCard from '../SchedulerCard';
import axios from 'axios';

const SchedulerData = () => {
  const [schedules, setSchedules] = useState([]);
  const [isSchedulerCardVisible, setSchedulerCardVisibility] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState(null);
  const api_url = "http://localhost:3001/schedules";

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const response = await axios.get(api_url);
      setSchedules(response.data);
    } catch (error) {
      console.error('Error loading schedules:', error);
    }
  };

  const openSchedulerCard = (schedule) => {
    setEditedSchedule(schedule);
    setSchedulerCardVisibility(true);
  };

  const closeSchedulerCard = () => {
    setEditedSchedule(null);
    setSchedulerCardVisibility(false);
  };

  const handleSchedulerSubmit = async (formData) => {
    try {
      if (editedSchedule) {
        await axios.put(`${api_url}/${editedSchedule.id}`, formData);
      } else {
        await axios.post(api_url, formData);
      }

      // Reload schedules after submission
      loadSchedules();

      // Close the scheduler card form
      closeSchedulerCard();
    } catch (error) {
      console.error('Error submitting schedule:', error);
      // Handle the error as needed (e.g., show a user-friendly error message)
    }
  };

  const handleDelete = async (scheduleId) => {
    try {
      await axios.delete(`${api_url}/${scheduleId}`);
      // Reload schedules after deletion
      loadSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      // Handle the error as needed
    }
  };

  return (
    <div className="schedulerData">
      <div className="search-add-field">
        <Search />
        <AddButton onClick={() => openSchedulerCard(null, {})} />

        {isSchedulerCardVisible && (
          <div className="sheduler-card-form">
            <SchedulerCard
              title={"Add Schedule"}
              schedule={editedSchedule}
              onCancel={closeSchedulerCard}
              onSubmit={handleSchedulerSubmit}
            />
          </div>
        )}
      </div>
      <div className="container">
        <SchedulerList schedules={schedules} onEdit={openSchedulerCard} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default SchedulerData;
