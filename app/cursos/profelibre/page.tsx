'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';
import Reveal from '@/components/Reveal';
import Accordion from '@/components/Accordion';
import AnimatedCounter from '@/components/AnimatedCounter';
import TypewriterText from '@/components/TypewriterText';
import ModulosScrollSpy from '@/components/ModulosScrollSpy';

// ── PROFELIBRE — Página de ventas del curso ──
// isCartOpen: false = lista de espera / true = carrito abierto
const isCartOpen = false;

const CTA_LABEL  = isCartOpen ? 'Quiero entrar ahora' : 'Apúntame a la lista de espera';
const CTA_HREF   = isCartOpen ? '/cursos/profelibre/compra' : '/lista-espera';

const MODULOS = [
  { icon: '🧠', title: 'Fundamentos de IA para docentes', body: 'Qué es realmente la IA, cómo funciona y qué implica para tu práctica docente. Sin jerga técnica.' },
  { icon: '⚡', title: 'Productividad docente con IA', body: 'Planificaciones, rúbricas, adaptaciones y correcciones en minutos. Recupera horas cada semana.' },
  { icon: '🎯', title: 'Diseño de actividades con IA', body: 'Cómo integrar la IA en el diseño de actividades que desarrollen el pensamiento crítico.' },
  { icon: '📊', title: 'Evaluación en la era de la IA', body: 'Repensar la evaluación cuando la IA puede hacer los deberes. Nuevos formatos y rúbricas.' },
  { icon: '🎨', title: 'Creación de contenido educativo', body: 'Vídeos, presentaciones, imágenes y texto generado con IA para tus clases.' },
  { icon: '💬', title: 'Prompting avanzado para educadores', body: 'Técnicas de prompting específicas para contextos educativos. Consigue lo que necesitas de la IA.' },
  { icon: '🔒', title: 'Ética, privacidad y uso responsable', body: 'Marco práctico para enseñar a tus alumnos a usar la IA con responsabilidad y criterio.' },
  { icon: '🚀', title: 'Implementación en tu centro', body: 'Cómo proponer e implementar la IA en tu claustro aunque haya escepticismo inicial.' },
  { icon: '🏆', title: 'Tu sistema docente con IA', body: 'Integra todo lo aprendido en un sistema personal sostenible que funcione a largo plazo.' },
];

const TIMELINE = [
  { number: '01', title: 'Te apuntas', desc: 'Acceso inmediato a la plataforma con todos los módulos y materiales.' },
  { number: '02', title: 'Avanzas a tu ritmo', desc: '9 módulos en vídeo + ejercicios prácticos. Sin fechas de entrega.' },
  { number: '03', title: 'Practicas de verdad', desc: 'Cada módulo incluye un reto semanal aplicable directamente en tu aula.' },
  { number: '04', title: 'Compartes y creces', desc: 'Comunidad privada para resolver dudas y compartir experiencias con otros docentes.' },
  { number: '05', title: 'Tienes tu sistema', desc: 'Al terminar, tienes un sistema docente con IA listo para usar el lunes.' },
];

const RESULTADOS = [
  { value: 10, prefix: '', suffix: ' h', desc: 'de trabajo docente ahorradas cada semana de media.' },
  { value: 847, prefix: '', suffix: '+', desc: 'docentes que han completado el programa.' },
  { value: 98, prefix: '', suffix: '%', desc: 'de alumnos recomendarían ProfeLibre a un compañero.' },
  { value: 4.9, prefix: '', suffix: '/5', desc: 'valoración media del programa.' },
  { value: 15, prefix: '+', suffix: ' min', desc: 'de vídeo por módulo. Concreto y sin relleno.' },
  { value: 1, prefix: '', suffix: ' pago', desc: 'Acceso de por vida. Sin suscripciones.' },
];

const HERO_TESTIMONIALS = [
  { ini: 'SM', name: 'Sara M.', role: 'Profesora de Secundaria', text: 'En dos semanas recuperé más de 8 horas. No exagero. La planificación que me llevaba una tarde ahora la hago en 20 minutos.' },
  { ini: 'JP', name: 'Juan P.', role: 'Orientador escolar', text: 'Creía que era demasiado mayor para esto. ProfeLibre me demostró que la IA no es para "los de tecnología". Es para todos.' },
  { ini: 'LG', name: 'Lucía G.', role: 'Maestra de Primaria', text: 'El módulo de evaluación me cambió la forma de ver mis exámenes. No esperaba algo tan profundo en un curso de IA.' },
  { ini: 'MR', name: 'Miguel R.', role: 'Jefe de Estudios', text: 'Lo recomendé a todo mi claustro. Hemos empezado un proyecto de centro gracias a lo que aprendí aquí.' },
];

const FAQS = [
  { title: '¿Necesito saber de tecnología para hacer ProfeLibre?', content: 'No. El curso empieza desde cero. Si sabes usar el email y WhatsApp, tienes suficiente.' },
  { title: '¿Cuánto tiempo necesito dedicarle a la semana?', content: 'Con 2-3 horas semanales vas bien. Los módulos están diseñados para ser cortos y directos: menos de 20 minutos de vídeo por módulo + el tiempo que quieras dedicar a los ejercicios prácticos.' },
  { title: '¿Tengo acceso de por vida?', content: 'Sí. Una vez dentro, el acceso es permanente. Incluidas todas las actualizaciones futuras del programa.' },
  { title: '¿Hay certificado?', content: 'Sí. Al completar el programa recibes un certificado de finalización que puedes añadir a tu CV o portfolio.' },
  { title: '¿Qué pasa si no me gusta?', content: 'Tienes 14 días de garantía. Si en ese tiempo decides que no es para ti, te devuelvo el dinero sin preguntas.' },
  { title: '¿Es válido para cualquier etapa educativa?', content: 'Sí. Docentes de Infantil, Primaria, Secundaria, FP, universidad y formación de adultos están haciendo el programa. Los conceptos y herramientas son transferibles a cualquier etapa.' },
  { title: '¿Puedo hacer el curso a mi ritmo?', content: 'Completamente. No hay fechas de inicio ni de entrega. Accedes cuando quieres, avanzas cuando puedes.' },
  { title: '¿Hay comunidad?', content: 'Sí. Con tu acceso entras a una comunidad privada de docentes ProfeLibre donde compartir dudas, proyectos y recursos.' },
];

const h2s: React.CSSProperties = { fontFamily: 'var(--sans)', fontSize: 'clamp(1.75rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff' };
const wrap: React.CSSProperties = { width: '100%', maxWidth: 1280, marginInline: 'auto', paddingInline: 'clamp(1.25rem,5vw,4rem)' };

export default function ProfeLibrePage() {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* 01 · HERO */}
      <section className="section" style={{ background: 'var(--bg-primary)', minHeight: '95svh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ ...wrap, display: 'flex', flexDirection: 'column', gap: 'clamp(2rem,5vw,4rem)' }}>
          <div style={{ maxWidth: 700 }}>
            <SectionEyebrow text="Curso · ProfeLibre" />
            <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.6rem,8vw,5rem)', fontWeight: 800,
              letterSpacing: '-0.045em', lineHeight: 0.98, color: '#fff', margin: '0.75rem 0 1.25rem' }}>
              El sistema de IA para docentes que quieren resultados reales.
            </h1>
            <p style={{ fontSize: 'clamp(1rem,1.8vw,1.2rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.78)', marginBottom: '2rem', maxWidth: '52ch' }}>
              9 módulos. 0 jerga técnica. Un sistema que funciona el lunes siguiente.
            </p>
            <CTAButton href={CTA_HREF} variant="primary">{CTA_LABEL}</CTAButton>
          </div>

          {/* Foto del curso */}
          <div style={{ position: 'relative', width: 'min(480px, 100%)', aspectRatio: '4/3', borderRadius: 16,
            overflow: 'hidden', border: '2px solid transparent',
            backgroundImage: 'linear-gradient(var(--bg-card),var(--bg-card)), var(--brand-gradient)',
            backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}>
            <Image
              src="/images/Copia de Captura_C2183_1.1.14.jpg"
              alt="ProfeLibre — curso de IA para docentes"
              fill quality={85} sizes="(max-width:768px) 100vw, 480px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* 02 · LA PROMESA */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div style={{ ...wrap, maxWidth: 760, textAlign: 'center' }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.5rem,4vw,2.6rem)', fontWeight: 700,
              letterSpacing: '-0.03em', lineHeight: 1.2, color: '#fff' }}>
              <TypewriterText text="La IA no va a quitarte el trabajo. Pero el docente que sabe usarla sí puede quitarte el tuyo." speed={22} />
            </p>
          </Reveal>
        </div>
      </section>

      {/* 03 · PARA QUIÉN ES */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div style={wrap}>
          <SectionEyebrow number="03" text="Para quién es" />
          <h2 style={{ ...h2s, marginBottom: 'clamp(2.5rem,6vh,4rem)', maxWidth: '28ch' }}>¿Este curso es para ti?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '1.5rem' }}>
            {/* ProfeLibre */}
            <Reveal delay={0}>
              <div style={{ background: 'var(--bg-card)', border: '2px solid var(--brand-violet)', borderRadius: 16, padding: '2rem',
                boxShadow: '0 0 40px rgba(94,45,214,0.15)' }}>
                <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>✅ ProfeLibre es para ti si…</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {['Quieres usar la IA pero no sabes por dónde empezar.', 'Sientes que pierdes demasiado tiempo en tareas administrativas.', 'Te preocupa quedarte atrás mientras tus alumnos ya usan IA.', 'Buscas formación práctica, no teoría ni generalidades.'].map((t) => (
                    <li key={t} style={{ display: 'flex', gap: '0.65rem', fontSize: '0.95rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.85)' }}>
                      <span style={{ color: 'var(--eyebrow-color)', flexShrink: 0 }}>✓</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            {/* Sin sistema */}
            <Reveal delay={0.1}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>❌ No es para ti si…</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {['Buscas una herramienta milagrosa que lo haga todo sola.', 'No estás dispuesto a invertir 2-3 horas semanales.', 'Ya tienes un sistema consolidado de IA en tu práctica docente.', 'Quieres un curso con mucha teoría y poca práctica.'].map((t) => (
                    <li key={t} style={{ display: 'flex', gap: '0.65rem', fontSize: '0.95rem', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
                      <span style={{ flexShrink: 0, opacity: 0.5 }}>✗</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04 · QUÉ INCLUYE — ModulosScrollSpy */}
      <section style={{ background: 'var(--bg-deep)' }}>
        <div style={{ ...wrap, paddingBlock: 'clamp(3rem,8vh,6rem)' }}>
          <SectionEyebrow number="04" text="Qué incluye" />
          <h2 style={{ ...h2s, marginBottom: 'clamp(2.5rem,6vh,4rem)', maxWidth: '28ch' }}>9 módulos + bonus para construir tu sistema.</h2>
        </div>
        <ModulosScrollSpy modulos={MODULOS} />
        {/* BONUS */}
        <div style={{ ...wrap, paddingBottom: 'clamp(3rem,8vh,6rem)' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(94,45,214,0.2) 0%, rgba(214,53,149,0.12) 100%)',
            border: '1px solid rgba(94,45,214,0.4)', borderRadius: 14, padding: '1.75rem 2rem',
            display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>🎁</span>
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--eyebrow-color)', marginBottom: '0.4rem' }}>BONUS</p>
              <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Biblioteca de prompts para docentes</h3>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>+80 prompts listos para usar, organizados por etapa, asignatura y tipo de tarea. Actualizada continuamente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 · CÓMO FUNCIONA */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div style={wrap}>
          <SectionEyebrow number="05" text="Cómo funciona" />
          <h2 style={{ ...h2s, marginBottom: 'clamp(2.5rem,6vh,4rem)', maxWidth: '28ch' }}>Del primer vídeo al sistema completo.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: '1.5rem' }}>
            {TIMELINE.map((t, i) => (
              <Reveal key={t.number} delay={i * 0.1}>
                <div style={{ borderTop: '2px solid var(--eyebrow-color)', paddingTop: '1.25rem' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--eyebrow-color)', marginBottom: '0.65rem' }}>{t.number}</p>
                  <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>{t.title}</h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 · RESULTADOS */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div style={wrap}>
          <SectionEyebrow number="06" text="Resultados" />
          <h2 style={{ ...h2s, marginBottom: 'clamp(2.5rem,6vh,4rem)', maxWidth: '28ch' }}>Números que hablan solos.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: '1.25rem' }}>
            {RESULTADOS.map((r, i) => (
              <Reveal key={r.desc} delay={i * 0.08}>
                <div style={{ background: i === 0 ? 'linear-gradient(135deg, rgba(94,45,214,0.25), rgba(214,53,149,0.15))' : 'var(--bg-card)',
                  border: `1px solid ${i === 0 ? 'rgba(94,45,214,0.5)' : 'var(--border-subtle)'}`,
                  borderRadius: 14, padding: '1.5rem',
                  gridColumn: i === 0 ? 'span 2' : undefined }}>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: i === 0 ? 'clamp(2.5rem,6vw,4rem)' : 'clamp(2rem,5vw,3rem)',
                    fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1, marginBottom: '0.5rem' }}>
                    <AnimatedCounter value={r.value} prefix={r.prefix} suffix={r.suffix} />
                  </p>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07 · VALIDACIÓN — Testimonios */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div style={wrap}>
          <SectionEyebrow number="07" text="Validación" />
          <h2 style={{ ...h2s, marginBottom: 'clamp(2.5rem,6vh,4rem)', maxWidth: '28ch' }}>Lo que dicen los docentes ProfeLibre.</h2>

          {/* Hero testimonial rotatorio */}
          <div key={heroIdx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 16,
            padding: 'clamp(1.75rem,4vw,2.5rem)', marginBottom: '3rem', maxWidth: 700,
            animation: 'hero-in 0.5s cubic-bezier(0.22,1,0.36,1) both' }}>
            <style>{`@keyframes hero-in { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:none } }`}</style>
            <p style={{ fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', lineHeight: 1.65, color: '#fff', fontWeight: 500,
              marginBottom: '1.5rem', fontStyle: 'italic' }}>
              &ldquo;{HERO_TESTIMONIALS[heroIdx].text}&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--brand-gradient)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {HERO_TESTIMONIALS[heroIdx].ini}
              </div>
              <div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{HERO_TESTIMONIALS[heroIdx].name}</p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>{HERO_TESTIMONIALS[heroIdx].role}</p>
              </div>
            </div>
          </div>

          {/* Indicadores */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {HERO_TESTIMONIALS.map((_, i) => (
              <button key={i} type="button" onClick={() => setHeroIdx(i)} aria-label={`Testimonio ${i+1}`}
                style={{ width: i === heroIdx ? 24 : 8, height: 8, borderRadius: 4, border: 'none', cursor: 'pointer',
                  background: i === heroIdx ? 'var(--eyebrow-color)' : 'var(--border-subtle)', transition: 'all 0.3s ease', padding: 0 }} />
            ))}
          </div>
        </div>
      </section>

      {/* 08 · FAQ */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div style={{ ...wrap, maxWidth: 760 }}>
          <SectionEyebrow number="08" text="Preguntas frecuentes" />
          <h2 style={{ ...h2s, marginBottom: 'clamp(2.5rem,6vh,4rem)', maxWidth: '28ch' }}>Todo lo que quieres saber.</h2>
          <Accordion items={FAQS.map((f) => ({ title: f.title, content: f.content }))} />
        </div>
      </section>

      {/* 09 · ÚLTIMA LLAMADA */}
      <section className="section" style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          @keyframes aura-pulse  { 0%,100%{opacity:.28} 50%{opacity:.58} }
          @keyframes btn-breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
          @keyframes ring-ping   { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.7);opacity:0} }
        `}</style>
        {/* Aura */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
          width: '60vw', height: '60vw', maxWidth: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, var(--brand-violet) 0%, var(--brand-magenta) 50%, transparent 70%)',
          filter: 'blur(80px)', animation: 'aura-pulse 4s ease-in-out infinite', pointerEvents: 'none' }} />

        <div style={{ ...wrap, textAlign: 'center', maxWidth: 640, position: 'relative', zIndex: 1 }}>
          <SectionEyebrow number="09" text="Última llamada" />
          <h2 style={{ ...h2s, fontSize: 'clamp(2rem,6vw,3.5rem)', margin: '0.75rem 0 1.25rem' }}>
            El lunes que viene puedes estar usando IA en tu aula.
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.78)', marginBottom: '3rem' }}>
            {isCartOpen ? 'Plazas limitadas. El precio sube cuando se llene.' : 'Apúntate a la lista de espera y sé el primero en saber cuándo abre el carrito.'}
          </p>

          {/* Botón con animaciones */}
          <div style={{ position: 'relative', display: 'inline-flex', justifyContent: 'center' }}>
            {/* Anillos ping */}
            {[0, 0.9].map((delay, i) => (
              <span key={i} aria-hidden="true" style={{ position: 'absolute', inset: -8, borderRadius: 4,
                border: '1px solid rgba(94,45,214,0.5)',
                animation: `ring-ping 2s ${delay}s ease-out infinite` }} />
            ))}
            <div style={{ animation: 'btn-breathe 3.5s ease-in-out infinite' }}>
              <CTAButton href={CTA_HREF} variant="primary">{CTA_LABEL}</CTAButton>
            </div>
          </div>

          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.05em',
            color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
            14 días de garantía · Acceso de por vida · Sin suscripciones
          </p>
        </div>
      </section>
    </>
  );
}
