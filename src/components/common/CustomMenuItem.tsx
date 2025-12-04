import React from "react";
import {
  MenuItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface CustomMenuItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const CustomMenuItem: React.FC<CustomMenuItemProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <MenuItem
      onClick={onClick}
      selected={selected}
      sx={{
        color: selected ? "primary.main" : "text.primary",
        justifyContent: "space-between",
        px: 2,
      }}
    >
      <Typography variant="body2">{label}</Typography>
      {selected && <CheckIcon fontSize="small" />}
    </MenuItem>
  );
};
