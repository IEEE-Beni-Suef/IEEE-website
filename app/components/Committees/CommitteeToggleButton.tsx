import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import type { MouseEvent } from "react";

interface IProps {
  commmitteList: "technicalcommittees" | "operationalcommittees";
  handleChange: (
    event: MouseEvent<HTMLElement>,
    newCommmitteList: "technicalcommittees" | "operationalcommittees",
  ) => void;
}

const CommitteeToggleButton = ({ commmitteList, handleChange }: IProps) => {
  return (
    <div>
      <ToggleButtonGroup
        className="w-95 md:w-122.5"
        value={commmitteList}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{
          backgroundColor: "#F1F5F9",
          p: "6px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          borderRadius: "12px",

          "& .MuiToggleButton-root": {
            border: 0,
            borderRadius: "8px",
            flex: 1,
            textTransform: "none",
            color: "#475569",
            fontWeight: 600,
            fontSize: "14px",
            py: "10px",
            transition: "all 0.2s ease-in-out",
          },

          "& .MuiToggleButton-root.Mui-selected": {
            backgroundColor: "white",
            color: "#5A10A5",
            fontWeight: "bold",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          },
          "& .MuiToggleButton-root.Mui-selected:hover": {
            backgroundColor: "white",
          }
        }}
      >
        <ToggleButton value="technicalcommittees">
          Technical Committees
        </ToggleButton>

        <ToggleButton value="operationalcommittees">
          Operational Committees
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default CommitteeToggleButton;
