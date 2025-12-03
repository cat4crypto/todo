"use client";
import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { CustomIconButton } from "@/components/common/CustomIconButton";
export type FilterType = "all" | "active" | "completed";

interface TodoFilterMenuProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: "all", label: "全部任務" },
  { value: "active", label: "進行中" },
  { value: "completed", label: "已完成" },
];

export const TodoFilterMenu: React.FC<TodoFilterMenuProps> = ({
  currentFilter,
  onFilterChange,
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
      <CustomIconButton
        onClick={handleClick}
        src="/icons/filter.svg"
        active={Boolean(anchorEl)}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {FILTER_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => {
              onFilterChange(option.value);
              handleClose();
            }}
            selected={currentFilter === option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
