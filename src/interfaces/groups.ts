export interface ITaskData {
  name?: string;
  description?: string;
  value: number;
  checked: boolean;
}

export interface IGroupData {
  name: string;
  tasks: ITaskData[];
}
