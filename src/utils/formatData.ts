import { IGroupData, ITaskData } from 'interfaces/groups';
import { nanoid } from 'nanoid';

export const getGroupsWithId = (groups: IGroupData[]): IGroupData[] =>
  groups.map((group) => {
    const newTasks: ITaskData[] = [];

    group.tasks.forEach((task) => {
      newTasks.push({
        ...task,
        id: nanoid(),
      });
    });

    return {
      ...group,
      tasks: newTasks,
      id: nanoid(),
    };
  });
