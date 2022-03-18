import React, { FC } from 'react';
import { ITaskData } from 'interfaces/groups';
import './Checkbox.css';

export const Checkbox: FC<{ tasks: ITaskData[] }> = ({ tasks }) => (
  <>
    {tasks.map((task) => (
      <div key={task.description} className="checkbox-item">
        <input type="checkbox" id={task.description} checked={task.checked} />{' '}
        {task.description ?? task.name}
      </div>
    ))}
  </>
);
