"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoList } from "@/components/todos/TodoList";
import { Todo } from "@/lib/types";
import { api, TodoFilter, TodoSort } from "@/lib/api";
import toast from "react-hot-toast";

export default function Home() {
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState<TodoFilter>("all");
  const [sort, setSort] = useState<TodoSort>("createdAt");

  const { data: todos = [] } = useQuery({
    queryKey: ["todos", filter, sort],
    queryFn: () => api.getTodos({ status: filter, sortBy: sort }),
  });

  const createMutation = useMutation({
    mutationFn: ({ title, dueDate }: { title: string; dueDate?: string }) =>
      api.createTodo(title, dueDate),
    onMutate: async ({ title, dueDate }) => {
      await queryClient.cancelQueries({ queryKey: ["todos", filter, sort] });
      const previousTodos = queryClient.getQueryData<Todo[]>([
        "todos",
        filter,
        sort,
      ]);

      if (previousTodos) {
        const newTodo: Todo = {
          id: `temp-${Date.now()}`,
          title,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...(dueDate && { dueDate }),
        };

        if (filter !== "completed") {
          queryClient.setQueryData<Todo[]>(["todos", filter, sort], (old) => [
            newTodo,
            ...(old || []),
          ]);
        }
      }
      return { previousTodos };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Task created successfully");
    },
    onError: (error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(
          ["todos", filter, sort],
          context.previousTodos
        );
      }
      toast.error(`Failed to create task: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Todo> }) =>
      api.updateTodo(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["todos", filter, sort] });
      const previousTodos = queryClient.getQueryData<Todo[]>([
        "todos",
        filter,
        sort,
      ]);

      if (previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos", filter, sort], (old) => {
          if (!old) return [];
          return old.map((t) => (t.id === id ? { ...t, ...data } : t));
        });
      }
      return { previousTodos };
    },
    onSuccess: (_, variables) => {
      if (variables.data.completed !== undefined) {
        toast.success(
          variables.data.completed ? "Task completed" : "Task active"
        );
      } else {
        toast.success("Task updated successfully");
      }
    },
    onError: (err, newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(
          ["todos", filter, sort],
          context.previousTodos
        );
      }
      toast.error(`Failed to update task: ${err.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: api.deleteTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos", filter, sort] });
      const previousTodos = queryClient.getQueryData<Todo[]>([
        "todos",
        filter,
        sort,
      ]);

      if (previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos", filter, sort], (old) =>
          old?.filter((t) => t.id !== id)
        );
      }
      return { previousTodos };
    },
    onSuccess: () => {
      toast.success("Task deleted successfully");
    },
    onError: (err, id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(
          ["todos", filter, sort],
          context.previousTodos
        );
      }
      toast.error(`Failed to delete task: ${err.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAdd = (title: string, dueDate?: string) =>
    createMutation.mutate({ title, dueDate });

  const handleToggle = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo)
      updateMutation.mutate({ id, data: { completed: !todo.completed } });
  };
  const handleUpdate = (id: string, data: Partial<Todo>) =>
    updateMutation.mutate({ id, data });
  const handleDelete = (id: string) => deleteMutation.mutate(id);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        mt: 8,
        "& *": {
          outline: "1px solid red",
        },
      }}
    >
      <TodoList
        todos={todos}
        onAdd={handleAdd}
        onToggle={handleToggle}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        filter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
      />
    </Box>
  );
}
