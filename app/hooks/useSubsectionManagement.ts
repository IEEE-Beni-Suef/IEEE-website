import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useSubsectionManagement() {
  const queryClient = useQueryClient();

  // Subsection state
  const [subsectionActionLoadingId, setSubsectionActionLoadingId] = useState<
    number | null
  >(null);

  const setSubsectionActionLoading = (id: number | null) => {
    setSubsectionActionLoadingId(id);
  };

  const invalidateSubsections = () => {
    queryClient.invalidateQueries({ queryKey: ["articleSubsection"] });
  };

  return {
    // State
    subsectionActionLoadingId,

    // Setters
    setSubsectionActionLoading,

    // Handlers
    invalidateSubsections,
  };
}
