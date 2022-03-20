import { GroupsContext } from 'contexts/GroupsContext';
import { ITaskData } from 'interfaces/groups';
import { FC, ReactElement, useContext } from 'react';
import './CheckboxList.css';

export const CheckboxList: FC<{ tasks: ITaskData[] }> = ({ tasks }): ReactElement => {
  const { updateCheckboxInfo } = useContext(GroupsContext);

  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="checkbox-item">
          <input
            className="checkbox-input"
            type="checkbox"
            name=""
            id={task.description}
            defaultChecked={task.checked}
            onChange={() => updateCheckboxInfo({ id: task.id, value: task.value })}
          />
          <div>{task.description ?? task.name}</div>
        </div>
      ))}
    </>
  );
};
