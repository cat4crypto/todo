import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface ColumnHeaderProps {
  icon?: string;
  label: string;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ icon, label }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1/2 }}>
      {icon && <Image src={icon} alt="" width={12} height={12} />}
      <Typography variant="h4" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
};
