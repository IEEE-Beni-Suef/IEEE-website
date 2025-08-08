import type { MetaArgs } from "react-router";
import { Section } from "../components/ui/Section";

export function meta({}: MetaArgs) {
  return [
    { title: "About - IEEE BSU" },
    {
      name: "description",
      content: "Learn about IEEE BSU and our mission at Beni Suef University",
    },
  ];
}

const About = () => {
  return (
    <main className="min-h-screen ">
      <Section
        variant="gradient"
        padding="xl"
        className="min-h-screen flex items-center"
      >
        About
      </Section>
    </main>
  );
};

export default About;
