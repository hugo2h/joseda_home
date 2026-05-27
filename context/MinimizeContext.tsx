'use client';

// ─────────────────────────────────────────────────────────────────────────────
// MinimizeContext — estado global "isMinimized" sin librerías externas
//
// Por qué Context y no Zustand:
//   Zustand no está en el proyecto. Un Context puro es suficiente para un
//   booleano compartido entre 3 componentes (TopBar → provider → Shell/Modal).
//   Si el proyecto crece, migrar a Zustand es trivial (mismo API).
//
// Uso:
//   import { useMinimize } from '@/context/MinimizeContext';
//   const { isMinimized, toggle, setMinimized } = useMinimize();
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface MinimizeCtx {
  isMinimized : boolean;
  toggle      : () => void;
  setMinimized: (v: boolean) => void;
}

const MinimizeContext = createContext<MinimizeCtx>({
  isMinimized : false,
  toggle      : () => {},
  setMinimized: () => {},
});

export function MinimizeProvider({ children }: { children: ReactNode }) {
  const [isMinimized, setMinimized] = useState(false);
  const toggle = useCallback(() => setMinimized(v => !v), []);

  return (
    <MinimizeContext.Provider value={{ isMinimized, toggle, setMinimized }}>
      {children}
    </MinimizeContext.Provider>
  );
}

export const useMinimize = () => useContext(MinimizeContext);
