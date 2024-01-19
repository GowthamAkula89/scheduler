import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './schedulerList.css';

const SchedulerList = ({ schedules, onEdit, onDelete }) => {
  return (
    <div>
      {schedules.length === 0 ? (
        <h4>No results found</h4>
      ) : (
        <table style={{ width: '100%', borderSpacing: 0 }}>
          <thead>
            <tr className="table-header">
              <th className="table-header-text" style={{ paddingLeft: '5px',width:"150px" }}>
                Title
              </th>
              <th className="table-header-text" style={{width:"558px"}}>Description</th>
              <th className="table-header-text" style={{width:"116px"}}>Subject</th>
              <th className="table-header-text" style={{width:"116px"}}>Schedule</th>
              <th className="table-header-text" >Action</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td className="table-body-text" style={{ paddingLeft: '5px' }}>
                  {schedule.title}
                </td>
                <td className="table-body-text">{schedule.description}</td>
                <td className="table-body-text">{schedule.subject}</td>
                <td className="table-body-text">{schedule.frequency} {schedule.frequency !== "Daily" ? schedule.repeat : ""} at {schedule.selectedTime}</td>
                <td className="table-body-action">
                  <IconButton
                    className="action-edit"
                    aria-label="edit"
                    size="large"
                    color="primary"
                    onClick={() => onEdit(schedule)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className="action-delete"
                    aria-label="delete"
                    size="large"
                    color="error"
                    onClick={() => onDelete(schedule.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SchedulerList;
