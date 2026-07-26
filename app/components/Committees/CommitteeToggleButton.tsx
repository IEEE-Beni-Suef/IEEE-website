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
    <div className="flex justify-center w-full my-2">
      <ToggleButtonGroup
        className="w-full max-w-[460px]"
        value={commmitteList}
        exclusive
        onChange={handleChange}
        aria-label="Committee Category Toggle"
        sx={{
          backgroundColor: "#EAEDF6",
          p: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "30px",

          "& .MuiToggleButton-root": {
            border: 0,
            borderRadius: "24px",
            flex: 1,
            textTransform: "none",
            color: "#5C6B89",
            fontWeight: 600,
            fontSize: "14px",
            py: "10px",
            px: "20px",
            transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          },

          "& .MuiToggleButton-root.Mui-selected": {
            backgroundColor: "white",
            color: "#5A10A5",
            fontWeight: 700,
            boxShadow: "0 2px 8px rgba(90, 16, 165, 0.12)",
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
