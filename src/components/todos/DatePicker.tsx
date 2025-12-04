import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface DateTimePickerProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  initialDate?: string;
  onClose: () => void;
  onSave: (date: string) => void;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  open,
  anchorEl,
  initialDate,
  onClose,
  onSave,
}) => {
  const [tempDate, setTempDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (open) {
      setTempDate(initialDate ? dayjs(initialDate) : dayjs());
    }
  }, [open, initialDate]);

  const handleAccept = (date: Dayjs | null) => {
    if (date) {
      onSave(date.toISOString());
    }
    onClose();
  };

  if (!open) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDateTimePicker
        open={open}
        onClose={onClose}
        onAccept={handleAccept}
        value={tempDate}
        onChange={(newValue) => setTempDate(newValue)}
        localeText={{
          cancelButtonLabel: "取消",
          okButtonLabel: "確認",
        }}
        slots={{
          leftArrowIcon: KeyboardArrowUpIcon,
          rightArrowIcon: KeyboardArrowDownIcon,
        }}
        slotProps={{
          textField: {
            sx: { display: "none" },
          },
          popper: {
            anchorEl: anchorEl,
            placement: "bottom-start",
          },
          layout: {
            sx: {
              ".MuiPickersLayout-actionBar": {
                padding: 2,
                "& button:first-of-type": {
                  bgcolor: "#e0e0e0",
                  color: "#333",
                  fontWeight: "bold",
                  mr: 1,
                  borderRadius: 1,
                  px: 2,
                  "&:hover": { bgcolor: "#d5d5d5" },
                },
                "& button:last-of-type": {
                  bgcolor: "#42a5f5",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 1,
                  px: 2,
                  "&:hover": { bgcolor: "#2196f3" },
                },
              },
              ".MuiPickersDay-root": {
                borderRadius: 1,
                "&.Mui-selected": {
                  borderRadius: 1,
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
