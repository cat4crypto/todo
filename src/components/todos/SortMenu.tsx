"use client";
import React from "react";
import { Menu } from "@mui/material";
import { CustomIconButton } from "@/components/common/CustomIconButton";
import { CustomMenuItem } from "@/components/common/CustomMenuItem";

export type SortType = "dueDate" | "createdAt" | "title" | "order";

interface SortMenuProps {
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
}

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: "createdAt", label: "Created At" },
  { value: "dueDate", label: "Due Date" },
  { value: "order", label: "Manual Order" },
];

export const SortMenu: React.FC<SortMenuProps> = ({
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
      <CustomIconButton
        onClick={handleClick}
        src="/icons/sorter.svg"
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
              py: 1,
              bgcolor: "background.paper",
            },
          },
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <CustomMenuItem
            key={option.value}
            label={option.label}
            selected={currentSort === option.value}
            onClick={() => {
              onSortChange(option.value);
              handleClose();
            }}
          />
        ))}
      </Menu>
    </>
  );
};
