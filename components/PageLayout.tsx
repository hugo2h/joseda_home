'use client';

import type { ReactNode } from 'react';
import Nav,            { type NavItem } from '@/components/Nav';
import CustomScrollbar from '@/components/CustomScrollbar';

interface PageLayoutProps {
  children   : ReactNode;
  navConfig ?: NavItem[];
}

/**
 * PageLayout — wrapper de página (Nav + contenido + scrollbar).
 * SmoothScrollProvider y scroll-viewport ya viven en app/layout.tsx.
 */
export default function PageLayout({ children, navConfig }: PageLayoutProps) {
  return (
    <>
      <Nav navConfig={navConfig} />
      <main>{children}</main>
      <CustomScrollbar />
    </>
  );
}
