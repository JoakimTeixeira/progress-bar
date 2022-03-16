type TaskData = {
  description: string;
  value: number;
  checked: boolean;
};

export interface IGroupData {
  name: string;
  tasks: TaskData[];
}
