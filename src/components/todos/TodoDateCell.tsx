import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { TodoDatePicker } from "./TodoDatePicker";

interface TodoDateCellProps {
  date?: string;
  onDateChange: (newDate: string) => void;
  disabled?: boolean;
  showIconOnEmpty?: boolean; // If true, show calendar icon when no date is set
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

const isOverdue = (dateString?: string) => {
  if (!dateString) return false;
  return new Date(dateString) < new Date();
};

export const TodoDateCell: React.FC<TodoDateCellProps> = ({
  date,
  onDateChange,
  disabled = false,
  showIconOnEmpty = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = (newDate: string) => {
    onDateChange(newDate);
    handleClose();
  };

  const overdue = !disabled && isOverdue(date);
  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          cursor: disabled ? "default" : "pointer",
          display: "inline-flex",
          alignItems: "center",
          minHeight: "24px",
          color: overdue ? "error.main" : "text.secondary",
          "&:hover": {
            opacity: disabled ? 1 : 0.7,
          },
        }}
      >
        {/* 如果没有日期且由 showIconOnEmpty 控制（用于 TodoInput），则显示图标，否则显示格式化日期 */}
        {!date && showIconOnEmpty ? (
          <CalendarTodayIcon fontSize="small" sx={{ fontSize: 18 }} />
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: "inherit",
            }}
          >
            {formatDate(date)}
          </Typography>
        )}
      </Box>

      <TodoDatePicker
        open={open}
        anchorEl={anchorEl}
        initialDate={date}
        onClose={handleClose}
        onSave={handleSave}
      />
    </>
  );
};

