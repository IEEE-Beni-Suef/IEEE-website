import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Clock } from "lucide-react";

export function InactiveBanner() {
  const { user } = useAuth();

  if (!user || user.isActive) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-1/2 transform translate-x-1/2 md:translate-0 md:right-4 z-20 w-full max-w-md mx-auto px-4 animate-in slide-in-from-top duration-500">
      <div className="bg-gradient-to-r from-orange-100/40 to-amber-100/40 dark:from-orange-900/40 dark:to-amber-900/40 backdrop-blur-sm border border-orange-200/40 dark:border-orange-700/40 rounded-lg shadow-lg">
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full">
                <Clock color="#fff" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-200">
                Account Pending Activation
              </h3>
              <p className="mt-1 text-xs text-orange-700 dark:text-orange-300">
                Waiting for High Board approval. You'll receive an email
                notification once approved.
              </p>
              <div className="flex items-center space-x-1 mt-2">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                  <div
                    className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                  Processing...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
