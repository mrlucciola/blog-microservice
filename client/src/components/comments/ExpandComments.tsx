import { FC } from "react";
// mui
import { IconButton, useTheme } from "@mui/material";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";

const ExpandComments: FC<{
  isExpanded: boolean;
  handleExpandClick: (_: boolean) => void;
}> = ({ isExpanded, handleExpandClick }) => {
  const theme = useTheme();

  return (
    <IconButton
      sx={{
        background: "whitesmoke",
        marginLeft: "auto",
        transform: !isExpanded ? "rotate(0deg)" : "rotate(180deg)",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
        }),
      }}
      aria-expanded={isExpanded}
      aria-label="Show more"
      onClick={() => handleExpandClick(isExpanded)}
    >
      <ExpandMoreOutlined />
    </IconButton>
  );
};

export default ExpandComments;
