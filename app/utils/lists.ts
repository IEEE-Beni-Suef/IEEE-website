import type { ISponserCard } from "~/types";

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
      { to: "/dashboard/meetings", icon: "Calendar", label: "Meetings" },
      { to: "/dashboard/articles", icon: "FileText", label: "Articles" },
      { to: "/dashboard/emails", icon: "Mail", label: "Emails" },
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
      { to: "/dashboard/meetings", icon: "Calendar", label: "Meetings" },
      { to: "/dashboard/articles", icon: "FileText", label: "Articles" },
      // { to: "/dashboard/reports", icon: "FileText", label: "Reports" },
    ],
  },
  3: {
    // Member
    title: "Member",
    description: "Committee member",
    navigation: [
      { to: "/dashboard", icon: "LayoutDashboard", label: "Dashboard" },
      { to: "/dashboard/profile", icon: "User", label: "My Profile" },
      { to: "/dashboard/meetings", icon: "Calendar", label: "Meetings" },
      // { to: "/dashboard/tasks", icon: "CheckSquare", label: "My Tasks" },
      // { to: "/dashboard/committee", icon: "Building", label: "My Committee" },
    ],
  },
  4: {
    // HR
    title: "HR",
    description: "Human Resources",
    navigation: [
      { to: "/dashboard", icon: "LayoutDashboard", label: "Dashboard" },
      { to: "/dashboard/profile", icon: "User", label: "My Profile" },
      { to: "/dashboard/meetings", icon: "Calendar", label: "Meetings" },
      // { to: "/dashboard/events", icon: "Calendar", label: "Events" },
    ],
  },
  5: {
    // Vice
    title: "Vice",
    description: "Vice President",
    navigation: [
      { to: "/dashboard", icon: "LayoutDashboard", label: "Dashboard" },
      { to: "/dashboard/profile", icon: "User", label: "My Profile" },
      { to: "/dashboard/meetings", icon: "Calendar", label: "Meetings" },
      // { to: "/dashboard/events", icon: "Calendar", label: "Events" },
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

export const sponsers: ISponserCard[] = [
  {
    id: 1,
    img: "https://scontent.faly2-2.fna.fbcdn.net/v/t39.30808-1/454639294_343780712134741_6213289949303508721_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=2QS-iJYOiV4Q7kNvwHzPgoi&_nc_oc=AdlWOSYaFf0ATL9E_ey9w5mq6q9cTqqC9SkVzcKrWONx9OdmpHJFAOnsJUz-FLmVcus&_nc_zt=24&_nc_ht=scontent.faly2-2.fna&_nc_gid=k2sLXW1WlBtGaq1m3wIIoA&_nc_ss=8&oh=00_Afzm_yt-s6LcuP9K1e6Ulzq0_kEdfrFu1tsf8miQ6LCekw&oe=69BBE29F",
    title: "Creativa Hub Beni-Suef",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, fugiat?",
  },
  {
    id: 2,
    img: "https://scontent.faly2-2.fna.fbcdn.net/v/t39.30808-1/454639294_343780712134741_6213289949303508721_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=2QS-iJYOiV4Q7kNvwHzPgoi&_nc_oc=AdlWOSYaFf0ATL9E_ey9w5mq6q9cTqqC9SkVzcKrWONx9OdmpHJFAOnsJUz-FLmVcus&_nc_zt=24&_nc_ht=scontent.faly2-2.fna&_nc_gid=k2sLXW1WlBtGaq1m3wIIoA&_nc_ss=8&oh=00_Afzm_yt-s6LcuP9K1e6Ulzq0_kEdfrFu1tsf8miQ6LCekw&oe=69BBE29F",
    title: "Creativa Hub Beni-Suef",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, fugiat?",
  },
  {
    id: 3,
    img: "https://scontent.faly2-2.fna.fbcdn.net/v/t39.30808-1/454639294_343780712134741_6213289949303508721_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=2QS-iJYOiV4Q7kNvwHzPgoi&_nc_oc=AdlWOSYaFf0ATL9E_ey9w5mq6q9cTqqC9SkVzcKrWONx9OdmpHJFAOnsJUz-FLmVcus&_nc_zt=24&_nc_ht=scontent.faly2-2.fna&_nc_gid=k2sLXW1WlBtGaq1m3wIIoA&_nc_ss=8&oh=00_Afzm_yt-s6LcuP9K1e6Ulzq0_kEdfrFu1tsf8miQ6LCekw&oe=69BBE29F",
    title: "Creativa Hub Beni-Suef",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi ipsa consectetur ex? Cupiditate eligendi incidunt obcaecati recusandae laudantium reprehenderit ducimus veniam harum, culpa tempora dolorem voluptatem aperiam porro reiciendis ipsum placeat totam nisi soluta. Dignissimos nam rerum fugit odit, recusandae fugiat placeat, hic non cumque nostrum accusantium quibusdam mollitia, doloremque magnam cupiditate omnis. Facilis provident explicabo magnam unde perferendis? Unde voluptas placeat autem doloremque vel nemo velit voluptatem nesciunt ea minima aperiam hic laudantium in nostrum aspernatur accusamus quidem perferendis, sint fugit! Sequi fugit dignissimos saepe nemo expedita corrupti quam blanditiis nihil aperiam soluta libero repellat error culpa consequatur facere reiciendis dicta voluptatibus cumque, provident aut numquam minus. Ex harum itaque quibusdam recusandae maxime, rem ipsa fugiat velit error odit tempore, optio eius. Rerum doloremque amet nobis et aliquam qui aperiam perferendis ipsa quasi at aspernatur recusandae laborum quos, nihil, iusto velit asperiores debitis. Velit excepturi hic debitis quos?",
  },
  {
    id: 4,
    img: "https://scontent.faly2-2.fna.fbcdn.net/v/t39.30808-1/454639294_343780712134741_6213289949303508721_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=2QS-iJYOiV4Q7kNvwHzPgoi&_nc_oc=AdlWOSYaFf0ATL9E_ey9w5mq6q9cTqqC9SkVzcKrWONx9OdmpHJFAOnsJUz-FLmVcus&_nc_zt=24&_nc_ht=scontent.faly2-2.fna&_nc_gid=k2sLXW1WlBtGaq1m3wIIoA&_nc_ss=8&oh=00_Afzm_yt-s6LcuP9K1e6Ulzq0_kEdfrFu1tsf8miQ6LCekw&oe=69BBE29F",
    title: "Creativa Hub Beni-Suef",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, vitae!",
  },
  {
    id: 5,
    img: "https://scontent.faly2-2.fna.fbcdn.net/v/t39.30808-1/454639294_343780712134741_6213289949303508721_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=2QS-iJYOiV4Q7kNvwHzPgoi&_nc_oc=AdlWOSYaFf0ATL9E_ey9w5mq6q9cTqqC9SkVzcKrWONx9OdmpHJFAOnsJUz-FLmVcus&_nc_zt=24&_nc_ht=scontent.faly2-2.fna&_nc_gid=k2sLXW1WlBtGaq1m3wIIoA&_nc_ss=8&oh=00_Afzm_yt-s6LcuP9K1e6Ulzq0_kEdfrFu1tsf8miQ6LCekw&oe=69BBE29F",
    title: "Creativa Hub Beni-Suef",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi ipsa consectetur ex? Cupiditate eligendi incidunt obcaecati recusandae laudantium reprehenderit ducimus veniam harum, culpa tempora dolorem voluptatem aperiam porro reiciendis ipsum placeat totam nisi soluta. Dignissimos nam rerum fugit odit, recusandae fugiat placeat, hic non cumque nostrum accusantium quibusdam mollitia, doloremque magnam cupiditate omnis. Facilis provident explicabo magnam unde perferendis? Unde voluptas placeat autem doloremque vel nemo velit voluptatem nesciunt ea minima aperiam hic laudantium in nostrum aspernatur accusamus quidem perferendis, sint fugit! Sequi fugit dignissimos saepe nemo expedita corrupti quam blanditiis nihil aperiam soluta libero repellat error culpa consequatur facere reiciendis dicta voluptatibus cumque, provident aut numquam minus. Ex harum itaque quibusdam recusandae maxime, rem ipsa fugiat velit error odit tempore, optio eius. Rerum doloremque amet nobis et aliquam qui aperiam perferendis ipsa quasi at aspernatur recusandae laborum quos, nihil, iusto velit asperiores debitis. Velit excepturi hic debitis quos?",
  },
  {
    id: 6,
    img: "https://scontent.faly2-2.fna.fbcdn.net/v/t39.30808-1/454639294_343780712134741_6213289949303508721_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=2QS-iJYOiV4Q7kNvwHzPgoi&_nc_oc=AdlWOSYaFf0ATL9E_ey9w5mq6q9cTqqC9SkVzcKrWONx9OdmpHJFAOnsJUz-FLmVcus&_nc_zt=24&_nc_ht=scontent.faly2-2.fna&_nc_gid=k2sLXW1WlBtGaq1m3wIIoA&_nc_ss=8&oh=00_Afzm_yt-s6LcuP9K1e6Ulzq0_kEdfrFu1tsf8miQ6LCekw&oe=69BBE29F",
    title: "Creativa Hub Beni-Suef",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, vitae!",
  },
  {
    id: 7,
    img: "https://scontent.faly2-2.fna.fbcdn.net/v/t39.30808-1/454639294_343780712134741_6213289949303508721_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=2QS-iJYOiV4Q7kNvwHzPgoi&_nc_oc=AdlWOSYaFf0ATL9E_ey9w5mq6q9cTqqC9SkVzcKrWONx9OdmpHJFAOnsJUz-FLmVcus&_nc_zt=24&_nc_ht=scontent.faly2-2.fna&_nc_gid=k2sLXW1WlBtGaq1m3wIIoA&_nc_ss=8&oh=00_Afzm_yt-s6LcuP9K1e6Ulzq0_kEdfrFu1tsf8miQ6LCekw&oe=69BBE29F",
    title: "Creativa Hub Beni-Suef",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, vitae!",
  },
];
