import React, { useState, useEffect } from 'react';
import './schedulerData.css';
import Search from '../Search';
import AddButton from '../AddButton';
import SchedulerList from '../SchedulerList';
import SchedulerCard from '../SchedulerCard';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const SchedulerData = () => {
  const [schedules, setSchedules] = useState([]);
  const [isSchedulerCardVisible, setSchedulerCardVisibility] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState(null);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const api_url = 'http://localhost:3001/schedules';

  useEffect(() => {
    loadSchedules();
  }, []);

  const handleSearch = (searchValue) => {
    const filtered = schedules.filter((schedule) =>
      Object.values(schedule).some((value) =>
        value.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setSchedules(filtered);
    if (filtered.length === 0) {
      enqueueSnackbar('No matching schedules found', { variant: 'error' });
    }
  };

  const deBounceSearch = (event) => {
    const searchValue = event.target.value;
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      handleSearch(searchValue);
    }, 500);

    setDebounceTimer(timer);
  };

  const loadSchedules = async () => {
    try {
      const response = await axios.get(api_url);
      setSchedules(response.data);
    } catch (error) {
      console.error('Error loading schedules:', error);
      enqueueSnackbar('Error loading schedules', { variant: 'error' });
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
      loadSchedules();
      closeSchedulerCard();
    } catch (error) {
      console.error('Error submitting schedule:', error);
      enqueueSnackbar('Error submitting schedule', { variant: 'error' });
    }
  };

  const handleDelete = async (scheduleId) => {
    try {
      await axios.delete(`${api_url}/${scheduleId}`);
      loadSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      enqueueSnackbar('Error deleting schedule', { variant: 'error' });
    }
  };

  return (
    <div className="schedulerData">
      <div className="search-add-field">
        <Search onChange={deBounceSearch} />
        <AddButton onClick={() => openSchedulerCard(null, {})} />

        {isSchedulerCardVisible && (
          <div className="scheduler-card-form">
            <SchedulerCard
              title={editedSchedule ? 'Edit Schedule' : 'Add Schedule'}
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
