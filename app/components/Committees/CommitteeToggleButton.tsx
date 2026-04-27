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
          backgroundColor: "#E7EAEF",
          p: 1,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          borderRadius: "16px",

          "& .MuiToggleButton-root": {
            border: 0,
            borderRadius: "12px",
            flex: 1,
            textTransform: "none",
          },

          "& .Mui-selected": {
            backgroundColor: "white !important",
            borderRadius: "12px",
            color: "#5A10A5",
          },
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
