import { IGroupData } from 'interfaces/groups';
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

interface IContextData {
  usersGroups: IGroupData[];
  setUsersGroups: Dispatch<SetStateAction<IGroupData[]>>;
}

export const GroupsContext = createContext<IContextData>({
  usersGroups: [],
  setUsersGroups: () => {},
});

export const GroupsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [usersGroups, setUsersGroups] = useState<IGroupData[]>([]);

  useEffect(() => {
    fetchUsersGroups().then((groups) => {
      const formattedGroups = getGroupsWithId(groups);
      setUsersGroups(formattedGroups);
    });
  }, []);

  const memoizedGroups = useMemo(() => ({ usersGroups, setUsersGroups }), [usersGroups]);

  return <GroupsContext.Provider value={memoizedGroups}>{children}</GroupsContext.Provider>;
};
