export interface ITaskData {
  name?: string;
  description?: string;
  value: number;
  checked: boolean;
}

export interface IGroupData {
  id: string;
  name: string;
  tasks: ITaskData[];
}
