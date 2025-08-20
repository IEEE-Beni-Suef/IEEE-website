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

// Get user's full name
export const getFullName = (user: any): string => {
  const { fName = "", mName = "", lName = "" } = user;
  return (
    `${fName} ${mName} ${lName}`.trim() ||
    user.email ||
    user.userName ||
    "Unknown User"
  );
};

export const getInitials = (user: any): string => {
  const fullName = getFullName(user);
  if (fullName === user.email || fullName === user.userName) {
    return fullName.charAt(0).toUpperCase();
  }

  const names = fullName.split(" ").filter(Boolean);
  if (names.length >= 2) {
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  }
  return names[0]?.charAt(0).toUpperCase() || "U";
};
