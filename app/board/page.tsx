"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { Task } from "@/components/kanban/TaskCard";
import { Column } from "@/components/kanban/BoardColumn";

export type ColumnId = string;

type ApiResponse = {
  categories: { id: string; title: string; }[];
  tasks: Record<string, string[]>;
};

export default function Planning() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const apiResponse = sessionStorage.getItem("apiResponse");
      if (apiResponse) {
        try {
          const parsedResponse = JSON.parse(apiResponse) as ApiResponse;
          const newColumns = parsedResponse.categories.map(cat => ({
            id: cat.id,
            title: cat.title,
          })) as Column[];
          
          const newTasks: Task[] = [];
          Object.entries(parsedResponse.tasks).forEach(([categoryId, taskList]) => {
            if (Array.isArray(taskList)) {
              taskList.forEach((content, index) => {
                newTasks.push({
                  id: `${categoryId}_${index + 1}`,
                  columnId: categoryId,
                  content,
                });
              });
            }
          });
  
          console.log("Parsed columns:", newColumns);
          console.log("Parsed tasks:", newTasks);
          setColumns(newColumns);
          setTasks(newTasks);
          setIsLoading(false);
        } catch (error) {
          console.error("Error parsing API response:", error);
        }
      } else {
        setIsLoading(false);
      }
    }, []);

  return (
    <div className="dark flex flex-col min-h-screen bg-zinc-900 font-btdfont text-white">
      <header className="w-full p-4 bg-zinc-800 border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image src='/logo.png' alt="BetterToDo Logo" width={120} height={120} className='rounded-full shadow-md' />
          </Link>
          <h1 className="text-2xl font-bold ml-4">BetterToDo</h1>
        </div>
      </header>
      <main className="container mx-auto flex-1 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-700">Your Ideal Plan for Today</h2>
        <div className="flex justify-around">
          {isLoading ? (
            <div>Loading tasks...</div>
          ) : (
            <KanbanBoard columns={columns} tasks={tasks} />
          )}
        </div>
      </main>
    </div>
  );
}
