import { IGroupData, ITaskData } from 'interfaces/groups';
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fetchUsersGroups } from 'services/groups.service';
import { getGroupsWithId } from 'utils/formatData';

interface ICheckboxProps {
  id: string;
  value: number;
}
interface IContextData {
  usersGroups: IGroupData[];
  setUsersGroups: Dispatch<SetStateAction<IGroupData[]>>;
  updateCheckboxInfo: Dispatch<ICheckboxProps>;
  currentPercentage: number;
}

export const GroupsContext = createContext<IContextData>({
  usersGroups: [],
  setUsersGroups: () => {},
  updateCheckboxInfo: () => {},
  currentPercentage: 0,
});

export const GroupsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [usersGroups, setUsersGroups] = useState<IGroupData[]>([]);
  const [allCheckedValues, setAllCheckedValues] = useState<number[]>([]);
  const [allTasks, setAllTasks] = useState<ITaskData[]>([]);
  const [allCheckedIds, setAllCheckedIds] = useState<string[]>([]);
  const [totalValues, setTotalValues] = useState<number>(0);
  const [currentPercentage, setCurrentPercentage] = useState<number>(0);

  useEffect(() => {
    fetchUsersGroups().then((groups) => {
      const formattedGroups = getGroupsWithId(groups);
      setUsersGroups(formattedGroups);
    });
  }, []);

  const updateAllTasks = (): void => {
    const tasks = usersGroups.flatMap((groups) => groups.tasks);
    setAllTasks(tasks);
  };

  const updateCheckedValues = (): void => {
    const checkedValues = allTasks
      .filter((task) => task.checked)
      .flatMap((checkedTask) => checkedTask.value);

    setAllCheckedValues(checkedValues);
  };

  const updateAllCheckIds = (): void => {
    const checkedIds = allTasks
      .filter((task) => task.checked)
      .flatMap((checkedTask) => checkedTask.id);

    setAllCheckedIds(checkedIds);
  };

  const updateTotalValues = (): void => {
    const total = allTasks
      .flatMap((task) => task.value)
      .reduce((previousValue, currentValue) => previousValue + currentValue);

    setTotalValues(total);
  };

  useEffect(() => {
    if (usersGroups.length) {
      updateAllTasks();
    }
  }, [usersGroups]);

  useEffect(() => {
    if (allTasks.length) {
      updateCheckedValues();
      updateAllCheckIds();
      updateTotalValues();
    }
  }, [allTasks]);

  const updateCurrentPercentage = (): void => {
    if (allCheckedValues.length) {
      const percentage = allCheckedValues
        .map((value) => (value * 100) / totalValues)
        .reduce((previousValue, currentValue) => previousValue + currentValue);

      setCurrentPercentage(Math.round(percentage));
    } else {
      setCurrentPercentage(0);
    }
  };

  useEffect(() => {
    updateCurrentPercentage();
  }, [allCheckedValues]);

  const insertCheckedInfo = (id: string): void => {
    const index = allCheckedIds.indexOf(id);

    const newCheckedValues = [...allCheckedValues];
    newCheckedValues.splice(index, 1);
    setAllCheckedValues(newCheckedValues);

    const newCheckedIds = [...allCheckedIds];
    newCheckedIds.splice(index, 1);
    setAllCheckedIds(newCheckedIds);
  };

  const removeCheckedInfo = ({ id, value }: ICheckboxProps): void => {
    setAllCheckedValues([...allCheckedValues, value]);
    setAllCheckedIds([...allCheckedIds, id]);
  };

  const updateCheckboxInfo = ({ id, value }: ICheckboxProps): void => {
    const hasCheckedId = allCheckedIds.includes(id);

    hasCheckedId ? insertCheckedInfo(id) : removeCheckedInfo({ id, value });
  };

  const memoizedGroups = useMemo(
    () => ({ usersGroups, setUsersGroups, updateCheckboxInfo, currentPercentage }),
    [usersGroups, allCheckedValues, allTasks, allCheckedIds, totalValues, currentPercentage]
  );

  return <GroupsContext.Provider value={memoizedGroups}>{children}</GroupsContext.Provider>;
};
