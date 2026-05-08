import React, { createContext, useContext, useEffect, useState } from "react";

const INTRO_DELAY_MS = 3000;

interface IntroContextValue {
  introReady: boolean;
}

const IntroContext = createContext<IntroContextValue>({ introReady: false });

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroReady(true), INTRO_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <IntroContext.Provider value={{ introReady }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
