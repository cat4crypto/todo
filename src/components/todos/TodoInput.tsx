"use client";
import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, TableRow, TableCell, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Image from "next/image";

interface TodoInputProps {
  onSave: (title: string) => void;
  onCancel: () => void;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

export const TodoInput: React.FC<TodoInputProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  // Use current time for display, similar to design
  const [createdAt] = useState(new Date());

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (title.trim()) {
        onSave(title);
        setTitle("");
      } else {
        onCancel();
      }
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  const handleBlur = () => {
    onCancel();
  };

  return (
    <TableRow hover>
      {/* 1. Checkbox Column - shows Add Icon */}
      <TableCell padding="checkbox">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 24,
            height: 24,
          }}
        >
          <Image src="/icons/add.svg" alt="add" width={16} height={16} />
        </Box>
      </TableCell>

      <TableCell sx={{ width: "40%" }}>
        <TextField
          fullWidth
          variant="standard"
          placeholder="輸入後按下Enter進行儲存"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          inputRef={inputRef}
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: "0.875rem" },
          }}
        />
      </TableCell>

      {/* 3. Due Date Column - Placeholder Icon */}
      <TableCell>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <CalendarTodayIcon fontSize="small" sx={{ fontSize: 18 }} />
        </Box>
      </TableCell>

      {/* 4. Created At Column - Current Time */}
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {formatDate(createdAt)}
        </Typography>
      </TableCell>

      {/* 5. Task ID Column - Empty */}
      <TableCell></TableCell>
    </TableRow>
  );
};
