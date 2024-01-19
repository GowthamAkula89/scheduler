import React, { useState, useEffect } from 'react';
import './schedulerData.css';
import Search from '../Search';
import AddButton from '../AddButton';
import SchedulerList from '../SchedulerList';
import SchedulerCard from '../SchedulerCard';
import api from '../../Services/api';

const SchedulerData = () => {
  const [schedules, setSchedules] = useState([]);
  const [isSchedulerCardVisible, setSchedulerCardVisibility] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState(null);

  useEffect(() => {
    api.get('/schedules').then((response) => setSchedules(response.data));
  }, []);

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
        // If editing an existing schedule, make an API request to update it
        await api.put(`/schedules/${editedSchedule.id}`, formData);
      } else {
        // If creating a new schedule, make an API request to create it
        await api.post('/schedules', formData);
      }

      // Refresh the schedule list after the update or create operation
      const response = await api.get('/schedules');
      setSchedules(response.data);

      // Close the scheduler card form
      closeSchedulerCard();
    } catch (error) {
      console.error('Error submitting schedule:', error);
      // Handle the error as needed
    }
  };
  const handleDelete = async (scheduleId) => {
    try {
      // Make an API request to delete the schedule
      await api.delete(`/schedules/${scheduleId}`);

      // Refresh the schedule list after the delete operation
      const response = await api.get('/schedules');
      setSchedules(response.data);
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
        <SchedulerList schedules={schedules} onEdit={openSchedulerCard} onDelete={handleDelete }/>
      </div>
    </div>
  );
};

export default SchedulerData;
