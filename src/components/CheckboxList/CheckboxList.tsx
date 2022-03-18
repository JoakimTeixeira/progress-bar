import { ITaskData } from 'interfaces/groups';
import { FC, useRef } from 'react';
import { getArrayWithId } from 'utils/formatData';
import './CheckboxList.css';

export const CheckboxList: FC<{ tasks: ITaskData[] }> = ({ tasks }) => {
  const formattedTasks = useRef<ITaskData[]>();

  formattedTasks.current = getArrayWithId(tasks);

  return (
    <>
      {formattedTasks.current.map((task) => (
        <div key={task.id} className="checkbox-item">
          <div className="checkbox-wrapper">
            <input
              className="checkbox-input"
              type="checkbox"
              name=""
              id={task.description}
              defaultChecked={task.checked}
            />
            <span className="checkbox-checkmark" />
          </div>
          {task.description ?? task.name}
        </div>
      ))}
    </>
  );
};
