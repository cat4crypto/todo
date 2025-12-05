"use client";
import React from "react";
import { Menu } from "@mui/material";
import { CustomIconButton } from "@/components/common/CustomIconButton";
import { CustomMenuItem } from "@/components/common/CustomMenuItem";

export type FilterType = "all" | "active" | "completed";

interface TodoFilterMenuProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: "active", label: "進行中" },
  { value: "completed", label: "已完成" },
  { value: "all", label: "全部任務" },
];

export const FilterMenu: React.FC<TodoFilterMenuProps> = ({
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              minWidth: 152,
              bgcolor: "background.paper",
              borderRadius: 1,
            },
          },
        }}
      >
        {FILTER_OPTIONS.map((option) => (
          <CustomMenuItem
            key={option.value}
            label={option.label}
            selected={currentFilter === option.value}
            onClick={() => {
              onFilterChange(option.value);
              handleClose();
            }}
          />
        ))}
      </Menu>
    </>
  );
};
