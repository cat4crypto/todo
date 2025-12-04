"use client";
import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Todo } from "@/lib/types";
import { TodoItem } from "./TodoItem";
import { FilterMenu, FilterType } from "./FilterMenu";
import { SortMenu, SortType } from "./SortMenu";
import { AddingRow } from "./AddingRow";
import { ColumnHeader } from "./ColumnHeader";
import Image from "next/image";

interface TodoListProps {
  todos: Todo[];
  onAdd: (title: string, dueDate?: string) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, data: Partial<Todo>) => void;
  onDelete?: (id: string) => void;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  sort: SortType;
  onSortChange: (sort: SortType) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onAdd,
  onToggle,
  onUpdate,
  onDelete,
  filter,
  onFilterChange,
  sort,
  onSortChange,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNew = () => {
    setIsAdding(true);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1000, margin: "0 auto", p: 2 }}>
      <Typography variant="h1" sx={{ mb: 3 }}>
        Tasks
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="outlined"
          startIcon={
            <Image src={"/icons/plus.svg"} alt="add" width={12} height={12} />
          }
          size="small"
          onClick={handleAddNew}
          sx={{
            color: "text.primary",
            borderColor: "grey.500",
            "&:hover": {
              borderColor: "text.primary",
            },
          }}
        >
          New Task
        </Button>

        <Stack spacing={1} direction="row" alignItems="center">
          <FilterMenu currentFilter={filter} onFilterChange={onFilterChange} />
          <SortMenu currentSort={sort} onSortChange={onSortChange} />
        </Stack>
      </Stack>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ bgcolor: "transparent" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <ColumnHeader label="Task Title" icon="/icons/text.svg" />
              </TableCell>
              <TableCell>
                <ColumnHeader label="Due Date" icon="/icons/calendar.svg" />
              </TableCell>
              <TableCell>
                <ColumnHeader label="Created at" icon="/icons/calendar-1.svg" />
              </TableCell>
              <TableCell>
                <ColumnHeader label="Task ID" icon="/icons/link.svg" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
            {isAdding && (
              <AddingRow
                onSave={(title, dueDate) => {
                  onAdd(title, dueDate);
                  setIsAdding(false);
                }}
                onCancel={() => setIsAdding(false)}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!isAdding && (
        <Box
          onClick={handleAddNew}
          sx={{
            p: 2,
            pl: 6,
            cursor: "pointer",
            color: "text.secondary",
            "&:hover": { color: "text.primary" },
          }}
        >
          New Task
        </Box>
      )}
    </Box>
  );
};
