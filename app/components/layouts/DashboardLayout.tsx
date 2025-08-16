import { Outlet } from "react-router";
import type { ReactNode } from "react";
import { Section } from "../ui/Section";

interface DashboardLayoutProps {
  children?: ReactNode;
  sidebar: ReactNode;
  header?: ReactNode;
}

export function DashboardLayout({
  children,
  sidebar,
  header,
}: DashboardLayoutProps) {
  return (
    <Section
      variant="gradient"
      padding="none"
      className="min-h-screen flex items-center pt-16"
    >
      {header && <div className=" shadow-sm ">{header}</div>}

      <div className="flex min-h-[calc(100vh-9rem)]">
        <div className="w-64 shadow-sm border-r ">{sidebar}</div>
        <div className="flex-1 p-6">{children || <Outlet />}</div>
      </div>
    </Section>
  );
}
