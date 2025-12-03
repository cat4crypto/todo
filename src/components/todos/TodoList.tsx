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
import { TodoFilterMenu, FilterType } from "./TodoFilterMenu";
import { TodoSortMenu, SortType } from "./TodoSortMenu";
import { TodoInput } from "./TodoInput";

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

  // No local filtering/sorting logic anymore!
  // We render what is passed in props.

  const handleAddNew = () => {
    setIsAdding(true);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1000, margin: "0 auto", p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Tasks
      </Typography>

      {/* Toolbar */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="small"
          sx={{ textTransform: "none" }}
          onClick={handleAddNew}
        >
          New Task
        </Button>

        <TodoFilterMenu
          currentFilter={filter}
          onFilterChange={onFilterChange}
        />

        <TodoSortMenu currentSort={sort} onSortChange={onSortChange} />
      </Stack>
      {/* </Box> */}

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ bgcolor: "transparent" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Task Title</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Task ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.length === 0 && !isAdding ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{ py: 4, color: "text.secondary" }}
                >
                  No tasks found
                </TableCell>
              </TableRow>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={onToggle}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              ))
            )}
            {isAdding && (
              <TodoInput
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
        <Box sx={{ mt: 2 }}>
          <Box
            onClick={handleAddNew}
            sx={{
              p: 2,
              cursor: "pointer",
              color: "text.secondary",
              "&:hover": { color: "text.primary" },
            }}
          >
            + New Task
          </Box>
        </Box>
      )}
    </Box>
  );
};
