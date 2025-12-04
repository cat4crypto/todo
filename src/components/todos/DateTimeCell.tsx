import React, { useState } from "react";
import { TableCell, Box, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DateTimePicker } from "./DatePicker";

interface DateTimeCellProps {
  date?: string;
  onDateChange: (newDate: string) => void;
  onOpenChange?: (isOpen: boolean) => void;
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

export const DateTimeTableCell: React.FC<DateTimeCellProps> = ({
  date,
  onDateChange,
  onOpenChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    onOpenChange?.(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onOpenChange?.(false);
  };

  const handleSave = (newDate: string) => {
    onDateChange(newDate);
    handleClose();
  };

  const overdue = isOverdue(date);
  const open = Boolean(anchorEl);

  return (
    <TableCell
      sx={{
        width: "180px",
      }}
    >
      <Box
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          minHeight: "24px",

          color: overdue ? "error.main" : "text.secondary",
          "&:hover": {
            opacity: 0.7,
          },
        }}
      >
        {!date ? (
          <CalendarTodayIcon
            role="button"
            data-id="date-time-cell-icon"
            fontSize="small"
            sx={{ fontSize: 18 }}
            tabIndex={10}
            aria-label="Open date picker"
          />
        ) : (
          <Typography variant="body2">{formatDate(date)}</Typography>
        )}
      </Box>
      {open && (
        <DateTimePicker
          open={open}
          anchorEl={anchorEl}
          initialDate={date}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </TableCell>
  );
};
