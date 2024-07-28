import React from 'react';

// Define the shape of the data for tasks
interface TaskType {
    id: number;
    columnId: number;
    title: string;
    user: string;
}
// Define the shape of the data for columns
interface ColumnType {
  id: number;
  title: string;
  limit: number;
  className: string;
  // Add other column properties as needed
}

// Define the context types
interface TaskContextType {
  tasks: TaskType[];
  moveTask: (task: TaskType) => void;
  moveBackTask: (task: TaskType) => void;
  removeTask: (task: TaskType) => void;
}

interface ColumnContextType {
  columns: ColumnType[];
}

// Create the contexts with the correct types
const TaskContext = React.createContext<TaskContextType | null>(null);
const ColumnContext = React.createContext<ColumnContextType | null>(null);

export { TaskContext, ColumnContext };