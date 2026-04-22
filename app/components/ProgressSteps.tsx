import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

export const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  step.id < currentStep
                    ? "bg-blue-600 border-blue-600 text-white"
                    : step.id === currentStep
                      ? "bg-blue-50 border-blue-600 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "bg-gray-50 border-gray-300 text-gray-400 dark:bg-gray-800 dark:border-gray-600"
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <div className="mt-2 text-center">
                <div
                  className={`text-sm font-medium ${
                    step.id <= currentStep
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.title}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-colors duration-200 ${
                  step.id < currentStep
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
