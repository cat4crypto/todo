"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  Checkbox,
  TextField,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { Todo } from "@/lib/types";
import Image from "next/image";
import { DateTimeTableCell } from "./DateTimeCell";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, data: Partial<Todo>) => void;
  onDelete?: (id: string) => void;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingTitle]);

  const handleTitleClick = () => {
    setIsEditingTitle(true);
    setEditTitle(todo.title);
  };

  const handleTitleSave = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onUpdate(todo.id, { title: editTitle });
    } else {
      setEditTitle(todo.title);
    }
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleSave();
    } else if (e.key === "Escape") {
      setEditTitle(todo.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <TableRow
      hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TableCell 
        sx={{ 
          width: "424px",
          minWidth: "424px",
          maxWidth: "424px",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            checkedIcon={
              <Image
                src="/icons/checked.svg"
                alt="checked"
                width={16}
                height={16}
              />
            }
            icon={
              <Image
                src="/icons/active.svg"
                alt="unchecked"
                width={16}
                height={16}
              />
            }
            color="primary"
            sx={{
              p: 0,
              pr: 1,
              "&.Mui-checked": {
                color: "primary.main",
              },
            }}
          />
          {isEditingTitle ? (
            <TextField
              fullWidth
              variant="standard"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={handleKeyDown}
              inputRef={inputRef}
              InputProps={{ disableUnderline: true }}
            />
          ) : (
            <Typography
              variant="body1"
              onClick={handleTitleClick}
              sx={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "text.secondary" : "text.primary",
              }}
            >
              {todo.title}
            </Typography>
          )}
        </Box>
      </TableCell>

      {/* Due Date */}
      <DateTimeTableCell
        date={todo.dueDate}
        onDateChange={(newDate) => onUpdate(todo.id, { dueDate: newDate })}
      />

      <TableCell
        sx={{
          width: "160px",
          minWidth: "160px",
          maxWidth: "160px",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {formatDate(todo.createdAt)}
        </Typography>
      </TableCell>

      {/* taskID */}
      <TableCell 
        sx={{ 
          position: "relative", 
          width: "120px",
          minWidth: "120px",
          maxWidth: "120px",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {todo.id.substring(0, 8)}...
        </Typography>
        {isHovered && onDelete && (
          <IconButton
            size="small"
            onClick={() => onDelete(todo.id)}
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              boxShadow: 1,
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};
