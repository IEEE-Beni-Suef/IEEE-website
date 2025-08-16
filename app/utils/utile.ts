// Role name helper
export const getRoleName = (roleId?: number): string => {
  switch (roleId) {
    case 1:
      return "High Board";
    case 2:
      return "Head";
    case 3:
      return "Member";
    case 4:
      return "Hr";
    case 5:
      return "Vice";
    default:
      return "Unknown";
  }
};
