export interface Ambassador {
  id: string;
  name: string;
  image: string;
  role: string;
  description: string;
}

export const ambassadors: Ambassador[] = [
  {
    id: "ambassador-1",
    name: "Ambassador Name 1",
    image: "/assets/ambassadors/ambassador-1.webp",
    role: "IEEE SAC Ambassador",
    description:
      "Representing Beni-Suef University and helping connect students with IEEE opportunities, technical activities, and the wider IEEE community.",
  },
  {
    id: "ambassador-2",
    name: "Ambassador Name 2",
    image: "/assets/ambassadors/ambassador-2.webp",
    role: "IEEE SAC Ambassador",
    description:
      "Supporting student engagement, encouraging participation in IEEE initiatives, and building connections between local students and the IEEE Region 8 community.",
  },
  {
    id: "ambassador-3",
    name: "Ambassador Name 3",
    image: "/assets/ambassadors/ambassador-3.webp",
    role: "IEEE SAC Ambassador",
    description:
      "Promoting collaboration, sharing opportunities, and helping students discover ways to grow through IEEE activities and initiatives.",
  },
  {
    id: "ambassador-4",
    name: "Ambassador Name 4",
    image: "/assets/ambassadors/ambassador-4.webp",
    role: "IEEE SAC Ambassador",
    description:
      "Helping strengthen the connection between Beni-Suef students and the wider IEEE community through communication and student involvement.",
  },
];
