"use client";
import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export type SortType = "dueDate" | "createdAt" | "title" | "order";

interface TodoSortMenuProps {
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
}

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: "dueDate", label: "Due Date" },
  { value: "createdAt", label: "Created Date" },
  { value: "order", label: "Manual Order" },
  //TaskID
  // { value: "taskID", label: "Task ID" },
];

export const TodoSortMenu: React.FC<TodoSortMenuProps> = ({
  currentSort,
  onSortChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <SwapVertIcon fontSize="small" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => {
              onSortChange(option.value);
              handleClose();
            }}
            selected={currentSort === option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
