'use client';

const UNIT  = 'JD · ';
const TRACK = UNIT.repeat(6);

export default function MarqueeBackground() {
  return (
    <div className="mq-bg" aria-hidden="true">
      <div className="mq-row">
        <span>{TRACK}</span>
        <span aria-hidden="true">{TRACK}</span>
      </div>
    </div>
  );
}
