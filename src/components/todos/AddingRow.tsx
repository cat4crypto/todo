"use client";
import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, TableRow, TableCell, Typography } from "@mui/material";
import Image from "next/image";
import { DateTimeTableCell } from "./DateTimeCell";

interface TodoInputProps {
  onSave: (title: string, dueDate?: string) => void;
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

export const AddingRow: React.FC<TodoInputProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [createdAt] = useState(new Date());

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleSave = (title: string, dueDate?: string) => {
    onSave(title, dueDate);
    setTitle("");
    setDueDate(undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (title.trim()) {
        handleSave(title, dueDate);
      } else {
        onCancel();
      }
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    setTimeout(() => {
      console.log({ isDatePickerOpen, aa: 22, relatedTarget: e.relatedTarget });
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (relatedTarget?.dataset?.id === "date-time-cell-icon") {
        return;
      }

      if (title.trim()) {
        handleSave(title, dueDate);
      } else {
        onCancel();
      }
    }, 0);
  };
  console.log({ isDatePickerOpen });
  return (
    <TableRow hover>
      {/* 1. Checkbox */}

      <TableCell
        sx={{
          pt: 0,
          pb: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 / 2 }}>
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
          <TextField
            fullWidth
            variant="outlined"
            placeholder="輸入後按下Enter進行儲存"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            inputRef={inputRef}
          />
        </Box>
      </TableCell>

      {/* 3. Due Date  */}
      <DateTimeTableCell
        date={dueDate}
        onDateChange={setDueDate}
        onOpenChange={setIsDatePickerOpen}
      />

      {/* 4. Created At */}
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {formatDate(createdAt)}
        </Typography>
      </TableCell>

      {/* 5. Task ID */}
      <TableCell></TableCell>
    </TableRow>
  );
};
