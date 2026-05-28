'use client';

import type { ReactNode } from 'react';

import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Nav, { type NavItem } from '@/components/Nav';
import CustomScrollbar     from '@/components/CustomScrollbar';

interface PageLayoutProps {
  children   : ReactNode;
  navConfig ?: NavItem[];
}

export default function PageLayout({ children, navConfig }: PageLayoutProps) {
  return (
    <div className="app-shell">
      <SmoothScrollProvider>
        {/* Navbar flotante — posición fixed, fuera del scroll-viewport */}
        <Nav navConfig={navConfig} />

        <div className="scroll-viewport">
          <div className="content-flow">
            {children}
          </div>
        </div>
      </SmoothScrollProvider>
      <CustomScrollbar />
    </div>
  );
}
