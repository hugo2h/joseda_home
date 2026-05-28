'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TOPBAR_H    = 40;
const BOTTOMBAR_H = 44;
const OUTER_PAD   = 6;
const THUMB_H     = 80;
const ARROW_SCROLL = 180;

type LenisInstance = {
  scrollTo: (target: number | string, opts?: { immediate?: boolean }) => void;
};

const getLenis = () =>
  (window as unknown as Record<string, unknown>)['lenis'] as LenisInstance | undefined;

const getScrollViewport = () =>
  document.querySelector<HTMLElement>('.scroll-viewport');

function Chevron({ up }: { up: boolean }) {
  return (
    <svg
      width="8" height="5" viewBox="0 0 8 5"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', transform: up ? 'none' : 'rotate(180deg)' }}
    >
      <path d="M1 4L4 1L7 4" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function CustomScrollbar() {
  const trackRef      = useRef<HTMLDivElement>(null);
  const thumbRef      = useRef<HTMLDivElement>(null);
  const progressRef   = useRef(0);
  const isDragging    = useRef(false);
  const dragStartY    = useRef(0);
  const dragStartProg = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;

    const getMaxY = () => track.offsetHeight - THUMB_H;

    // Rastrear scroll de window (Lenis sobre window, no sobre contenedor)
    const onWindowScroll = () => {
      if (isDragging.current) return;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const prog = window.scrollY / maxScroll;
      progressRef.current = prog;
      gsap.set(thumb, { y: prog * getMaxY() });
    };

    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('resize', onWindowScroll);

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const maxY  = getMaxY();
      const delta = (e.clientY - dragStartY.current) / maxY;
      const prog  = Math.min(1, Math.max(0, dragStartProg.current + delta));

      progressRef.current = prog;
      gsap.set(thumb, { y: prog * maxY });

      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(prog * scrollMax, { immediate: true });
      } else {
        window.scrollTo(0, prog * scrollMax);
      }
    };

    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.userSelect = '';
      if (thumb) thumb.style.cursor = 'grab';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',   onMouseUp);

    return () => {
      window.removeEventListener('scroll',    onWindowScroll);
      window.removeEventListener('resize',    onWindowScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',   onMouseUp);
    };
  }, []);

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current    = true;
    dragStartY.current    = e.clientY;
    dragStartProg.current = progressRef.current;
    document.body.style.userSelect = 'none';
    if (thumbRef.current) thumbRef.current.style.cursor = 'grabbing';
  };

  const scrollBy = (direction: 'up' | 'down') => {
    const amount = direction === 'up' ? -ARROW_SCROLL : ARROW_SCROLL;
    const lenis  = getLenis();
    if (lenis) {
      lenis.scrollTo(window.scrollY + amount);
    } else {
      window.scrollBy({ top: amount, behavior: 'smooth' });
    }
  };

  const arrowBtnStyle: React.CSSProperties = {
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    width          : 14,
    height         : 18,
    flexShrink     : 0,
    background     : 'none',
    border         : 'none',
    padding        : 0,
    cursor         : 'pointer',
    pointerEvents  : 'auto',
  };

  return (
    <div
      className="z-[9999] pointer-events-none flex flex-col items-center"
      style={{
        position: 'fixed',
        right   : '0.5rem',
        top     : TOPBAR_H + OUTER_PAD,
        bottom  : BOTTOMBAR_H + OUTER_PAD,
        width   : 14,
      }}
      aria-hidden="true"
    >
      <button
        className="cscroll-btn"
        style={arrowBtnStyle}
        onClick={() => scrollBy('up')}
        tabIndex={-1}
      >
        <Chevron up />
      </button>

      <div
        ref={trackRef}
        className="cscroll-track"
        style={{
          flex        : 1,
          position    : 'relative',
          width       : 4,
          borderRadius: 999,
          margin      : '4px 0',
        }}
      >
        <div
          ref={thumbRef}
          className="cscroll-thumb"
          onMouseDown={handleThumbMouseDown}
          style={{
            position     : 'absolute',
            top          : 0,
            left         : '50%',
            marginLeft   : -2.5,
            width        : 5,
            height       : THUMB_H,
            borderRadius : 999,
            background   : 'rgba(255,255,255,0.85)',
            cursor       : 'grab',
            pointerEvents: 'auto',
          }}
        />
      </div>

      <button
        className="cscroll-btn"
        style={arrowBtnStyle}
        onClick={() => scrollBy('down')}
        tabIndex={-1}
      >
        <Chevron up={false} />
      </button>
    </div>
  );
}
