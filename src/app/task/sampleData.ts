export interface dataInterface {
  taskID: number;
  taskName: string;
  startDate: string;
  endDate: string;
  progress: number;
  duration: number;
  priority: string;
  approved: boolean;
  subtasks: Object;
}
