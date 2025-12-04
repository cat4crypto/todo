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
import Divider from "@mui/material/Divider";

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
    <Box
      sx={{
        maxWidth: '944px',
        margin: '0 auto',
        px: 2.5,
      }}
    >
      <Typography variant="h1" sx={{ my: 1.25 }}>
        Tasks
      </Typography>
      <Divider></Divider>

      <Stack direction="row" spacing={2} alignItems="center" mt={2.5} mb={1.25}>
        <Button
          variant="outlined"
          startIcon={
            <Image src={"/icons/plus.svg"} alt="add" width={12} height={12} />
          }
          onClick={handleAddNew}
          sx={{
            color: "text.primary",
            borderColor: "grey.500",
            textTransform: "none",
            px: 1,
            py: 1 / 2,
            gap: 1 / 4,
            "&:hover": {
              borderColor: "text.primary",
            },
            "& .MuiButton-startIcon": {
              marginRight: 1 / 2,
              marginLeft: 0,
            },
          }}
        >
          <Typography variant="h4">New Task</Typography>
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
        <Table
          sx={{
            tableLayout: "fixed",
            width: "904px",
          }}
        >
          <TableHead>
            <TableRow>
              <ColumnHeader label="Task Title" icon="/icons/text.svg" width="424px" />
              <ColumnHeader label="Due Date" icon="/icons/calendar.svg" width="180px" />
              <ColumnHeader label="Created at" icon="/icons/calendar-1.svg" width="160px" />
              <ColumnHeader label="Task ID" icon="/icons/link.svg" width="120px" />
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
            pl: 5,
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
