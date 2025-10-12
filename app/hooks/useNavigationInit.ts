import { useEffect } from "react";
import { useNavigate } from "react-router";
import { navigationService } from "~/utils/navigation";

export const useNavigationInit = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigationService.setNavigate(navigate);
  }, [navigate]);
};
