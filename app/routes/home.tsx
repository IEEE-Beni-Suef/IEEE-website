import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Section } from "../components/ui/Section";
import type { MetaArgs } from "react-router";

export function meta({}: MetaArgs) {
  return [
    { title: "IEEE BSU - Beni Suef University Student Branch" },
    {
      name: "description",
      content:
        "Join IEEE BSU - Connecting students with technology, innovation, and professional development opportunities in electrical engineering and related fields.",
    },
  ];
}

export default function Home() {
  return (
    <Section
      variant="gradient"
      padding="xl"
      className="min-h-screen flex items-center"
    >
      Home
    </Section>
  );
}
