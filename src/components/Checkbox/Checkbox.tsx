import React, { FC, useRef } from 'react';
import { ITaskData } from 'interfaces/groups';
import { getArrayWithId } from 'utils/formatData';
import './Checkbox.css';

export const Checkbox: FC<{ tasks: ITaskData[] }> = ({ tasks }) => {
  const formattedTasks = useRef<ITaskData[]>();

  formattedTasks.current = getArrayWithId(tasks);

  return (
    <>
      {formattedTasks.current.map((task) => (
        <div key={task.id} className="checkbox-item">
          <input type="checkbox" id={task.description} defaultChecked={task.checked} />
          {task.description ?? task.name}
        </div>
      ))}
    </>
  );
};
