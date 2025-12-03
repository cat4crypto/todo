import React from "react";
import { IconButton, IconButtonProps } from "@mui/material";
import Image from "next/image";

interface CustomIconButtonProps extends IconButtonProps {
  active?: boolean;
  src?: string; // Optional src for quick icon usage
}

export const CustomIconButton: React.FC<CustomIconButtonProps> = ({
  sx,
  children,
  active,
  src,
  ...props
}) => {
  return (
    <IconButton
      sx={{
        width: 30,
        height: 28,
        padding: "4px",
        borderRadius: 1,
        // Apply background color if active
        backgroundColor: active ? "rgba(255, 255, 255, 0.08)" : "transparent",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        },
        ...sx,
      }}
      {...props}
    >
      {src ? (
        <Image src={src} alt="icon" width={14} height={14} />
      ) : (
        children
      )}
    </IconButton>
  );
};
