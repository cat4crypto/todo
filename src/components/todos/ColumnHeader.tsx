import React from "react";
import { Box, TableCell, Typography } from "@mui/material";
import Image from "next/image";

interface ColumnHeaderProps {
  icon?: string;
  label: string;
  width?: string;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ icon, label, width }) => {
  return (
    <TableCell sx={{ py: 1 / 2, width }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 / 2 }}>
        {icon && <Image src={icon} alt="" width={12} height={12} />}
        <Typography variant="h4" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </TableCell>
  );
};
