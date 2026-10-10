import React from "react";
import { ChevronRight } from "lucide-react";

export interface PipelineStep {
  id: number;
  title: string;
  description: string;
}

const defaultSteps: PipelineStep[] = [
  {
    id: 1,
    title: "Events",
    description: "Technical workshops and learning experiences",
  },
  {
    id: 2,
    title: "Participants",
    description: "Students who engaged and grew",
  },
  {
    id: 3,
    title: "Skills",
    description: "Capabilities built through practice",
  },
  {
    id: 4,
    title: "Opportunities",
    description: "Connections, internships, and roles",
  },
  {
    id: 5,
    title: "Impact",
    description: "Measurable change for students and communities",
  },
];

export const ImpactPipeline: React.FC<{ steps?: PipelineStep[] }> = ({
  steps = defaultSteps,
}) => {
  return (
    <div className="w-full mb-12 overflow-x-auto pb-4">
      <div className="flex items-center justify-between min-w-[768px] lg:min-w-full px-2 gap-2">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            {/* Step Card Node */}
            <div className="flex flex-col items-center flex-1 min-w-[140px]">
              {/* Top Purple Dot Indicator */}
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#5A10A5",
                  borderRadius: "50%",
                  marginBottom: "8px",
                }}
              />

              {/* Node Card */}
              <div
                className="w-full p-3.5 flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.03]"
                style={{
                  background: "#FFFFFF",
                  border: "0.8px solid #5A10A52A",
                  borderRadius: "14px",
                  boxShadow: "0px 2px 10px rgba(90, 16, 165, 0.04)",
                  minHeight: "84px",
                  justifyContent: "center",
                }}
              >
                <h4
                  style={{
                    fontFamily:
                      "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                    fontWeight: 700,
                    fontSize: "13px",
                    lineHeight: "18px",
                    color: "#5A10A5",
                    marginBottom: "2px",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontFamily:
                      "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                    fontWeight: 400,
                    fontSize: "10.5px",
                    lineHeight: "14.5px",
                    color: "#5A6A8A",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connecting Arrow between nodes (except after last node) */}
            {idx < steps.length - 1 && (
              <div className="flex items-center justify-center text-[#5A10A580] shrink-0 pt-4">
                <ChevronRight className="w-4 h-4 text-[#5A10A5]/40" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ImpactPipeline;
