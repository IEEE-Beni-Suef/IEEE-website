// List might come form the backend
export const yearOptions = [
  { value: "First", label: "First Year" },
  { value: "Second", label: "Second Year" },
  { value: "Third", label: "Third Year" },
  { value: "Fourth", label: "Fourth Year" },
  { value: "Fifth", label: "Fifth Year" },
];

export const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export const facultyOptions = [
  { value: "Commerce", label: "Commerce" },
  { value: "Arts", label: "Arts" },
  { value: "Education", label: "Education" },
  { value: "Law", label: "Law" },
  { value: "Medicine", label: "Medicine" },
  { value: "VeterinaryMedicine", label: "Veterinary Medicine" },
  { value: "Science", label: "Science" },
  { value: "Pharmacy", label: "Pharmacy" },
  { value: "Nursing", label: "Nursing" },
  { value: "PhysicalEducation", label: "Physical Education" },
  { value: "Engineering", label: "Engineering" },
  { value: "IndustrialEducation", label: "Industrial Education" },
  { value: "ComputersAndInformation", label: "Computers And Information" },
  {
    value: "EconomicStudiesAndPoliticalScience",
    label: "Economic Studies And Political Science",
  },
  {
    value: "PostGraduateStudiesAndAdvancedSciences",
    label: "Post Graduate Studies And Advanced Sciences",
  },
  { value: "Dentistry", label: "Dentistry" },
  { value: "MassCommunications", label: "Mass Communications" },
  { value: "Physiotherapy", label: "Physiotherapy" },
  { value: "Agriculture", label: "Agriculture" },
  { value: "HealthScience", label: "Health Science" },
  { value: "EarlyChildhoodEducation", label: "Early Childhood Education" },
  { value: "AppliedArts", label: "Applied Arts" },
  { value: "AlAlsun", label: "Al Alsun" },
  { value: "DevelopmentalSocialWork", label: "Developmental Social Work" },
  { value: "EarthScience", label: "Earth Science" },
  { value: "TourismAndHotels", label: "Tourism And Hotels" },
  { value: "SpecialNeedsScience", label: "Special Needs Science" },
  {
    value: "NavigationAndSpaceTechnology",
    label: "Navigation And Space Technology",
  },
];

export const roleOptions = [
  { value: "1", label: "High Board" },
  { value: "2", label: "Committee Head" },
  { value: "3", label: "Member" },
  { value: "4", label: "HR" },
  { value: "5", label: "Vice" },
];

export const governorateOptions = [
  { value: "Cairo", label: "Cairo" },
  { value: "Giza", label: "Giza" },
  { value: "Alexandria", label: "Alexandria" },
  { value: "PortSaid", label: "Port Said" },
  { value: "Suez", label: "Suez" },
  { value: "Damietta", label: "Damietta" },
  { value: "Dakahlia", label: "Dakahlia" },
  { value: "Sharkia", label: "Sharkia" },
  { value: "Qalyubia", label: "Qalyubia" },
  { value: "KafrElSheikh", label: "Kafr El Sheikh" },
  { value: "Gharbia", label: "Gharbia" },
  { value: "Monufia", label: "Monufia" },
  { value: "Beheira", label: "Beheira" },
  { value: "Ismailia", label: "Ismailia" },
  { value: "Minya", label: "Minya" },
  { value: "BeniSuef", label: "Beni Suef" },
  { value: "Fayoum", label: "Fayoum" },
  { value: "Assiut", label: "Assiut" },
  { value: "Sohag", label: "Sohag" },
  { value: "Qena", label: "Qena" },
  { value: "Luxor", label: "Luxor" },
  { value: "Aswan", label: "Aswan" },
  { value: "RedSea", label: "Red Sea" },
  { value: "NewValley", label: "New Valley" },
  { value: "Matrouh", label: "Matrouh" },
  { value: "NorthSinai", label: "North Sinai" },
  { value: "SouthSinai", label: "South Sinai" },
];

// Sidebar navigation configurations for different roles
export const sidebarConfigs = {
  1: {
    // High Board
    title: "High Board",
    description: "Full system access",
    navigation: [
      { to: "/dashboard", icon: "LayoutDashboard", label: "Dashboard" },
      { to: "/dashboard/users", icon: "Users", label: "Users" },
      { to: "/dashboard/committees", icon: "Boxes", label: "Committees" },
      { to: "/dashboard/articles", icon: "FileText", label: "Articles" },
      { to: "/dashboard/settings", icon: "Split", label: "Branch" },
    ],
  },
  2: {
    // Head
    title: "Admin",
    description: "Committee management",
    navigation: [
      { to: "/dashboard", icon: "LayoutDashboard", label: "Dashboard" },
      { to: "/dashboard/users", icon: "Users", label: "Users" },
      { to: "/dashboard/committees", icon: "Building", label: "My Committee" },
      { to: "/dashboard/articles", icon: "FileText", label: "Articles" },
      { to: "/dashboard/reports", icon: "FileText", label: "Reports" },
    ],
  },
  3: {
    // Member
    title: "Member",
    description: "Committee member",
    navigation: [
      { to: "/dashboard", icon: "LayoutDashboard", label: "Dashboard" },
      { to: "/dashboard/profile", icon: "User", label: "My Profile" },
      { to: "/dashboard/tasks", icon: "CheckSquare", label: "My Tasks" },
      { to: "/dashboard/committee", icon: "Building", label: "My Committee" },
    ],
  },
  4: {
    // HR
    title: "HR",
    description: "Human Resources",
    navigation: [
      { to: "/dashboard", icon: "LayoutDashboard", label: "Dashboard" },
      { to: "/dashboard/profile", icon: "User", label: "My Profile" },
      { to: "/dashboard/events", icon: "Calendar", label: "Events" },
    ],
  },
  5: {
    // Vice
    title: "Vice",
    description: "Vice President",
    navigation: [
      { to: "/dashboard", icon: "LayoutDashboard", label: "Dashboard" },
      { to: "/dashboard/profile", icon: "User", label: "My Profile" },
      { to: "/dashboard/events", icon: "Calendar", label: "Events" },
    ],
  },
  default: {
    // Guest
    title: "Guest",
    description: "Limited access",
    navigation: [
      { to: "/dashboard", icon: "LayoutDashboard", label: "Dashboard" },
    ],
  },
};
