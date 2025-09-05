import React from "react";

const sectionVariants = {
  default: "bg-transparent",
  primary: "bg-gray-50 dark:bg-gray-900/50",
  secondary: "bg-white dark:bg-gray-900",
  gradient:
    "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/20 text-gray-900 dark:text-gray-100",
  feature: "bg-gradient-to-r from-blue-600 to-purple-700 text-white",
};

const paddingVariants = {
  none: "",
  sm: "py-8 sm:py-12",
  default: "py-12 sm:py-16 lg:py-20",
  lg: "py-16 sm:py-20 lg:py-24",
  xl: "py-20 sm:py-24 lg:py-32",
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: keyof typeof sectionVariants;
  padding?: keyof typeof paddingVariants;
  container?: boolean;
  background?: React.ReactNode;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className = "",
      variant = "default",
      padding = "default",
      container = true,
      background,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = "relative";
    const variantClasses = sectionVariants[variant];
    const paddingClasses = paddingVariants[padding];

    return (
      <section
        ref={ref}
        className={` ${baseClasses} ${variantClasses} ${paddingClasses} ${className} px-4 sm:px-6 lg:px-8`}
        {...props}
      >
        {/* Background element */}
        {background && (
          <div className="absolute inset-0 -z-10">{background}</div>
        )}

        {/* Content container */}
        {container ? (
          <div className=" mx-auto flex-1">{children}</div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = "Section";

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`text-center space-y-4 mb-12 sm:mb-16 ${className}`}
    {...props}
  />
));
SectionHeader.displayName = "SectionHeader";

const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", ...props }, ref) => (
  <h2
    ref={ref}
    className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight ${className}`}
    {...props}
  />
));
SectionTitle.displayName = "SectionTitle";

const SectionSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", ...props }, ref) => (
  <p
    ref={ref}
    className={`text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto ${className}`}
    {...props}
  />
));
SectionSubtitle.displayName = "SectionSubtitle";

export { Section, SectionHeader, SectionTitle, SectionSubtitle };
