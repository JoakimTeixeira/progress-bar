import { ITaskData } from 'interfaces/groups';
import { FC } from 'react';
import './CheckboxList.css';

export const CheckboxList: FC<{ tasks: ITaskData[] }> = ({ tasks }) => (
  <>
    {tasks.map((task) => (
      <div key={task.id} className="checkbox-item">
        <input
          className="checkbox-input"
          type="checkbox"
          name=""
          id={task.description}
          defaultChecked={task.checked}
        />
        <div>{task.description ?? task.name}</div>
      </div>
    ))}
  </>
);
