import { useMemo, useRef, useState } from 'react';

type Bucket = 'inbox' | 'core' | 'later';

type Task = {
  id: string;
  text: string;
  done: boolean;
  bucket: Bucket;
};

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

/** Cute tamagotchi-style Axolotl companion (sparkles, wagging tail, sleepy zzz) */
function AxolotlPet({
  happiness,
  pulse,
  sparkle,
}: {
  happiness: number; // 0–100
  pulse: boolean;
  sparkle: boolean;
}) {
  const mood = happiness >= 70 ? 'happy' : happiness >= 40 ? 'okay' : 'sad';

  const caption =
    mood === 'happy'
      ? "You're smashing it."
      : mood === 'okay'
      ? "We've got this."
      : 'A bit overwhelmed… one tiny task.';

  const bodyGradient =
    mood === 'happy'
      ? 'linear-gradient(135deg, rgba(56,189,248,0.55), rgba(45,212,191,0.45))'
      : mood === 'okay'
      ? 'linear-gradient(135deg, rgba(251,191,36,0.40), rgba(56,189,248,0.30))'
      : 'linear-gradient(135deg, rgba(248,113,113,0.40), rgba(148,163,184,0.25))';

  const gillColour =
    mood === 'happy'
      ? 'rgba(236,72,153,0.55)'
      : mood === 'okay'
      ? 'rgba(244,63,94,0.45)'
      : 'rgba(239,68,68,0.40)';

  const mouth =
    mood === 'happy' ? 'smile' : mood === 'okay' ? 'neutral' : 'sad';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        borderRadius: 22,
        padding: 16,
        background: 'rgba(255,255,255,0.85)',
        border: '1px solid rgba(15,23,42,0.08)',
        boxShadow: '0 14px 40px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: 14,
            letterSpacing: 0.2,
            color: '#0f172a',
          }}
        >
          Your axolotl
        </div>

        <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>
          {caption}
        </div>

        <div style={{ marginTop: 12 }}>
          <div
            style={{
              fontSize: 12,
              color: '#0f172a',
              opacity: 0.85,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 6,
            }}
          >
            <span>Happiness</span>
            <span style={{ fontWeight: 700 }}>{Math.round(happiness)}%</span>
          </div>

          <div
            style={{
              height: 10,
              borderRadius: 999,
              background: 'rgba(15,23,42,0.08)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${clamp(happiness)}%`,
                height: '100%',
                borderRadius: 999,
                background:
                  happiness >= 70
                    ? 'linear-gradient(90deg, rgba(45,212,191,1), rgba(56,189,248,1))'
                    : happiness >= 40
                    ? 'linear-gradient(90deg, rgba(56,189,248,1), rgba(251,191,36,1))'
                    : 'linear-gradient(90deg, rgba(248,113,113,1), rgba(148,163,184,1))',
                transition: 'width 300ms ease',
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          width: 120,
          height: 104,
          borderRadius: 28,
          border: '1px solid rgba(15,23,42,0.08)',
          background: 'rgba(255,255,255,0.60)',
          display: 'grid',
          placeItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
        title="Your axolotl gets happier as you complete tasks"
      >
        {sparkle && (
          <>
            <div
              style={{ position: 'absolute', left: 18, top: 20 }}
              className="sparkle s1"
            />
            <div
              style={{ position: 'absolute', left: 40, top: 10 }}
              className="sparkle s2"
            />
            <div
              style={{ position: 'absolute', right: 22, top: 18 }}
              className="sparkle s3"
            />
            <div
              style={{ position: 'absolute', right: 34, top: 34 }}
              className="sparkle s4"
            />
            <div
              style={{ position: 'absolute', left: 26, bottom: 18 }}
              className="sparkle s5"
            />
          </>
        )}

        {mood === 'sad' && (
          <div
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              fontWeight: 900,
              fontSize: 14,
              color: 'rgba(15,23,42,0.35)',
              transform: 'rotate(10deg)',
              userSelect: 'none',
              pointerEvents: 'none',
              animation: 'zzz 1.8s ease-in-out infinite',
            }}
          >
            zzz
          </div>
        )}

        <div
          style={{
            width: 90,
            height: 74,
            position: 'relative',
            transform: pulse ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 180ms ease',
            animation:
              mood === 'sad'
                ? 'bobSlow 3.2s ease-in-out infinite'
                : 'bob 2.4s ease-in-out infinite',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: -12,
              top: 26,
              width: 30,
              height: 24,
              borderRadius: '18px',
              background: 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(15,23,42,0.06)',
              transformOrigin: 'left center',
              animation:
                mood === 'happy'
                  ? 'wag 0.9s ease-in-out infinite'
                  : mood === 'okay'
                  ? 'wag 1.2s ease-in-out infinite'
                  : 'wag 1.6s ease-in-out infinite',
            }}
          />

          <div style={{ position: 'absolute', left: -10, top: 20 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 6,
                  borderRadius: 999,
                  background: gillColour,
                  marginBottom: 6,
                  transform: `rotate(${-18 + i * 12}deg)`,
                  transformOrigin: 'right center',
                  boxShadow: '0 6px 14px rgba(0,0,0,0.06)',
                }}
              />
            ))}
          </div>

          <div style={{ position: 'absolute', right: -10, top: 20 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 6,
                  borderRadius: 999,
                  background: gillColour,
                  marginBottom: 6,
                  transform: `rotate(${18 - i * 12}deg)`,
                  transformOrigin: 'left center',
                  boxShadow: '0 6px 14px rgba(0,0,0,0.06)',
                }}
              />
            ))}
          </div>

          <div
            style={{
              position: 'absolute',
              left: 6,
              right: 6,
              top: 16,
              bottom: 6,
              borderRadius: 26,
              background: bodyGradient,
              border: '1px solid rgba(15,23,42,0.08)',
              boxShadow: '0 12px 26px rgba(0,0,0,0.10)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 10,
                right: 10,
                bottom: 10,
                height: 18,
                borderRadius: 18,
                background: 'rgba(255,255,255,0.18)',
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 18,
                display: 'flex',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: 'rgba(15,23,42,0.75)',
                  animation:
                    mood === 'sad'
                      ? 'blinkSad 6s infinite'
                      : 'blink 4.8s infinite',
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: 'rgba(15,23,42,0.75)',
                  animation:
                    mood === 'sad'
                      ? 'blinkSad 6.3s infinite'
                      : 'blink 5.1s infinite',
                }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 32,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {mouth === 'smile' && (
                <div
                  style={{
                    width: 16,
                    height: 10,
                    borderBottom: '3px solid rgba(15,23,42,0.65)',
                    borderRadius: '0 0 20px 20px',
                    transform: 'translateY(-2px)',
                  }}
                />
              )}

              {mouth === 'neutral' && (
                <div
                  style={{
                    width: 16,
                    height: 3,
                    background: 'rgba(15,23,42,0.55)',
                    borderRadius: 999,
                  }}
                />
              )}

              {mouth === 'sad' && (
                <div
                  style={{
                    width: 16,
                    height: 10,
                    borderTop: '3px solid rgba(15,23,42,0.55)',
                    borderRadius: '20px 20px 0 0',
                    transform: 'translateY(2px)',
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <style>{`
          .sparkle{
            width: 10px; height: 10px;
            background: radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0) 70%);
            border-radius: 999px;
            filter: drop-shadow(0 6px 10px rgba(0,0,0,0.10));
            animation: sparkle 750ms ease-out forwards;
          }
          .s1{ animation-delay: 0ms; }
          .s2{ animation-delay: 60ms; }
          .s3{ animation-delay: 120ms; }
          .s4{ animation-delay: 180ms; }
          .s5{ animation-delay: 240ms; }

          @keyframes sparkle{
            0%{ transform: translateY(8px) scale(0.6); opacity: 0; }
            20%{ opacity: 1; }
            100%{ transform: translateY(-14px) scale(1.15); opacity: 0; }
          }
          @keyframes bob {
            0%, 100% { transform: translateY(0) scale(${pulse ? 1.08 : 1}); }
            50% { transform: translateY(-5px) scale(${pulse ? 1.08 : 1}); }
          }
          @keyframes bobSlow {
            0%, 100% { transform: translateY(1px) scale(${pulse ? 1.08 : 1}); }
            50% { transform: translateY(-2px) scale(${pulse ? 1.08 : 1}); }
          }
          @keyframes wag {
            0%, 100% { transform: rotate(6deg); }
            50% { transform: rotate(-12deg); }
          }
          @keyframes blink {
            0%, 96%, 100% { transform: scaleY(1); }
            97% { transform: scaleY(0.1); }
            98% { transform: scaleY(1); }
          }
          @keyframes blinkSad {
            0%, 92%, 100% { transform: scaleY(1); }
            93% { transform: scaleY(0.15); }
            94% { transform: scaleY(1); }
          }
          @keyframes zzz {
            0%, 100% { transform: translateY(0) rotate(10deg); opacity: 0.35; }
            50% { transform: translateY(-4px) rotate(10deg); opacity: 0.55; }
          }
        `}</style>
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        background: 'rgba(255,255,255,0.85)',
        border: '1px solid rgba(15,23,42,0.08)',
        padding: 12,
        boxShadow: '0 10px 22px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 10,
          alignItems: 'baseline',
        }}
      >
        <div>
          <div style={{ fontWeight: 900, color: '#0f172a' }}>{title}</div>
          {subtitle && (
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
              {subtitle}
            </div>
          )}
        </div>
        {right}
      </div>
      <div style={{ marginTop: 10 }}>{children}</div>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  tone = 'neutral',
}: {
  label: string;
  onClick: () => void;
  tone?: 'neutral' | 'good' | 'warn';
}) {
  const styles =
    tone === 'good'
      ? {
          border: '1px solid rgba(16,185,129,0.35)',
          background: 'rgba(16,185,129,0.12)',
          color: '#065f46',
        }
      : tone === 'warn'
      ? {
          border: '1px solid rgba(245,158,11,0.35)',
          background: 'rgba(245,158,11,0.12)',
          color: '#7c2d12',
        }
      : {
          border: '1px solid rgba(15,23,42,0.12)',
          background: 'rgba(255,255,255,0.9)',
          color: '#334155',
        };

  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 10px',
        borderRadius: 14,
        cursor: 'pointer',
        fontWeight: 800,
        fontSize: 12,
        ...styles,
      }}
    >
      {label}
    </button>
  );
}

export default function App() {
  const [quickText, setQuickText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pulse, setPulse] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  const [fogOpen, setFogOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');

  const pulseTimer = useRef<number | null>(null);
  const sparkleTimer = useRef<number | null>(null);

  const inbox = useMemo(
    () => tasks.filter((t) => !t.done && t.bucket === 'inbox'),
    [tasks]
  );
  const core = useMemo(
    () => tasks.filter((t) => !t.done && t.bucket === 'core'),
    [tasks]
  );
  const later = useMemo(
    () => tasks.filter((t) => !t.done && t.bucket === 'later'),
    [tasks]
  );
  const done = useMemo(() => tasks.filter((t) => t.done), [tasks]);

  const remaining = inbox.length + core.length + later.length;
  const completed = done.length;

  const happiness = useMemo(() => {
    // Core undone affects more; completing gives a boost
    const base = 55;
    const boost = completed * 8;
    const drag = inbox.length * 6 + later.length * 4 + core.length * 12;
    return clamp(base + boost - drag, 0, 100);
  }, [completed, inbox.length, later.length, core.length]);

  function triggerPulse() {
    setPulse(true);
    if (pulseTimer.current) window.clearTimeout(pulseTimer.current);
    pulseTimer.current = window.setTimeout(() => setPulse(false), 220);
  }

  function triggerSparkle() {
    setSparkle(true);
    if (sparkleTimer.current) window.clearTimeout(sparkleTimer.current);
    sparkleTimer.current = window.setTimeout(() => setSparkle(false), 900);
  }

  function addSingleToInbox(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      {
        id: String(Date.now()) + Math.random(),
        text: trimmed,
        done: false,
        bucket: 'inbox',
      },
      ...prev,
    ]);
  }

  function addQuick() {
    addSingleToInbox(quickText);
    setQuickText('');
  }

  function addBulkLines() {
    const lines = bulkText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) return;

    setTasks((prev) => {
      const newTasks: Task[] = lines.map((text) => ({
        id: String(Date.now()) + Math.random() + text,
        text,
        done: false,
        bucket: 'inbox',
      }));
      return [...newTasks.reverse(), ...prev]; // keep paste order roughly
    });

    setBulkText('');
    setFogOpen(false);
  }

  function moveTask(id: string, bucket: Bucket) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, bucket } : t)));
  }

  function toggleDone(id: string) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next = { ...t, done: !t.done };
        if (!t.done && next.done) {
          triggerPulse();
          triggerSparkle();
        }
        return next;
      })
    );
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function setAsCore(id: string) {
    if (core.length >= 5) {
      alert('Core is full (max 5). Move one out first.');
      return;
    }
    moveTask(id, 'core');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: 24,
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial',
        background:
          'linear-gradient(180deg, rgba(224,242,254,1) 0%, rgba(236,253,245,1) 100%)',
      }}
    >
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            alignItems: 'flex-end',
          }}
        >
          <div>
            <div style={{ fontSize: 44, fontWeight: 900, color: '#0f172a' }}>
              Sorted
            </div>
            <div style={{ marginTop: 6, color: '#334155' }}>
              Inbox <b>{inbox.length}</b> · Core <b>{core.length}</b>/5 · Later{' '}
              <b>{later.length}</b> · Done <b>{done.length}</b>
            </div>
          </div>

          <button
            onClick={() => setFogOpen(true)}
            style={{
              height: 44,
              padding: '0 14px',
              borderRadius: 14,
              border: '1px solid rgba(15,23,42,0.10)',
              background: 'rgba(255,255,255,0.85)',
              cursor: 'pointer',
              fontWeight: 800,
            }}
          >
            Clear the Fog
          </button>
        </div>

        <div style={{ marginTop: 18 }}>
          <AxolotlPet happiness={happiness} pulse={pulse} sparkle={sparkle} />
        </div>

        {/* Quick capture */}
        <div
          style={{
            marginTop: 18,
            borderRadius: 18,
            padding: 12,
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(15,23,42,0.08)',
            display: 'flex',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <input
            value={quickText}
            onChange={(e) => setQuickText(e.target.value)}
            placeholder="Quick capture… (email, corridor convo, idea)"
            onKeyDown={(e) => {
              if (e.key === 'Enter') addQuick();
            }}
            style={{
              flex: 1,
              height: 44,
              borderRadius: 14,
              border: '1px solid rgba(15,23,42,0.10)',
              padding: '0 14px',
              outline: 'none',
              background: 'white',
            }}
          />
          <button
            onClick={addQuick}
            style={{
              width: 52,
              height: 44,
              borderRadius: 14,
              border: 'none',
              background: '#10b981',
              color: 'white',
              fontSize: 22,
              fontWeight: 900,
              cursor: 'pointer',
            }}
            aria-label="Add"
            title="Add"
          >
            +
          </button>
        </div>

        {/* Triage boards */}
        <div
          style={{
            marginTop: 18,
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr',
            gap: 14,
          }}
        >
          <Panel
            title="Inbox"
            subtitle="Dump everything here first, then triage."
            right={
              <ActionButton
                label="Paste many"
                onClick={() => setFogOpen(true)}
                tone="neutral"
              />
            }
          >
            {inbox.length === 0 ? (
              <div style={{ fontSize: 13, color: '#64748b' }}>
                Inbox is clear. Nice.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {inbox.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      padding: 12,
                      borderRadius: 16,
                      background: 'rgba(255,255,255,0.9)',
                      border: '1px solid rgba(15,23,42,0.08)',
                      display: 'grid',
                      gap: 10,
                    }}
                  >
                    <div style={{ color: '#0f172a', fontWeight: 700 }}>
                      {t.text}
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <ActionButton
                        label="✅ Done"
                        onClick={() => toggleDone(t.id)}
                        tone="good"
                      />
                      <ActionButton
                        label="⭐ Core"
                        onClick={() => setAsCore(t.id)}
                        tone="good"
                      />
                      <ActionButton
                        label="🕓 Later"
                        onClick={() => moveTask(t.id, 'later')}
                        tone="warn"
                      />
                      <ActionButton
                        label="🗑 Remove"
                        onClick={() => removeTask(t.id)}
                        tone="neutral"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          <Panel title="Core (max 5)" subtitle="Today’s non-negotiables.">
            {core.length === 0 ? (
              <div style={{ fontSize: 13, color: '#64748b' }}>
                Choose up to 5 tasks that matter most.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {core.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      padding: 12,
                      borderRadius: 16,
                      background: 'rgba(255,255,255,0.9)',
                      border: '1px solid rgba(15,23,42,0.08)',
                      display: 'grid',
                      gap: 10,
                    }}
                  >
                    <div style={{ color: '#0f172a', fontWeight: 900 }}>
                      {t.text}
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <ActionButton
                        label="✅ Done"
                        onClick={() => toggleDone(t.id)}
                        tone="good"
                      />
                      <ActionButton
                        label="↩ Inbox"
                        onClick={() => moveTask(t.id, 'inbox')}
                        tone="neutral"
                      />
                      <ActionButton
                        label="🕓 Later"
                        onClick={() => moveTask(t.id, 'later')}
                        tone="warn"
                      />
                      <ActionButton
                        label="🗑 Remove"
                        onClick={() => removeTask(t.id)}
                        tone="neutral"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          <Panel title="Later" subtitle="Park it safely so it stops buzzing.">
            {later.length === 0 ? (
              <div style={{ fontSize: 13, color: '#64748b' }}>
                Nothing parked. Good focus.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {later.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      padding: 12,
                      borderRadius: 16,
                      background: 'rgba(255,255,255,0.9)',
                      border: '1px solid rgba(15,23,42,0.08)',
                      display: 'grid',
                      gap: 10,
                    }}
                  >
                    <div style={{ color: '#0f172a', fontWeight: 700 }}>
                      {t.text}
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <ActionButton
                        label="✅ Done"
                        onClick={() => toggleDone(t.id)}
                        tone="good"
                      />
                      <ActionButton
                        label="↩ Inbox"
                        onClick={() => moveTask(t.id, 'inbox')}
                        tone="neutral"
                      />
                      <ActionButton
                        label="⭐ Core"
                        onClick={() => setAsCore(t.id)}
                        tone="good"
                      />
                      <ActionButton
                        label="🗑 Remove"
                        onClick={() => removeTask(t.id)}
                        tone="neutral"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>

        {/* Done list (simple) */}
        <div style={{ marginTop: 14 }}>
          <Panel title="Done" subtitle="Good for morale.">
            {done.length === 0 ? (
              <div style={{ fontSize: 13, color: '#64748b' }}>
                Nothing completed yet — start tiny.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 8 }}>
                {done.slice(0, 12).map((t) => (
                  <div
                    key={t.id}
                    style={{
                      padding: 10,
                      borderRadius: 14,
                      background: 'rgba(255,255,255,0.85)',
                      border: '1px dashed rgba(15,23,42,0.14)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        color: '#334155',
                        textDecoration: 'line-through',
                      }}
                    >
                      {t.text}
                    </div>
                    <ActionButton
                      label="↩ Undo"
                      onClick={() => toggleDone(t.id)}
                      tone="neutral"
                    />
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>

        {/* Fog modal */}
        {fogOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15,23,42,0.35)',
              display: 'grid',
              placeItems: 'center',
              padding: 18,
              zIndex: 50,
            }}
            onClick={() => setFogOpen(false)}
          >
            <div
              style={{
                width: 'min(760px, 100%)',
                borderRadius: 22,
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid rgba(15,23,42,0.10)',
                boxShadow: '0 24px 70px rgba(0,0,0,0.20)',
                padding: 16,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{ fontWeight: 950, fontSize: 16, color: '#0f172a' }}
                  >
                    Clear the Fog
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                    Paste multiple tasks (one per line). They’ll go into{' '}
                    <b>Inbox</b>.
                  </div>
                </div>
                <button
                  onClick={() => setFogOpen(false)}
                  style={{
                    borderRadius: 14,
                    border: '1px solid rgba(15,23,42,0.12)',
                    background: 'rgba(255,255,255,0.9)',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontWeight: 800,
                  }}
                >
                  Close
                </button>
              </div>

              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder={`e.g.\nEmail parent about attendance\nReply to Trust query\nBook hall for SIAMS visit\nOrder stationery`}
                style={{
                  marginTop: 12,
                  width: '100%',
                  height: 180,
                  borderRadius: 18,
                  border: '1px solid rgba(15,23,42,0.12)',
                  padding: 12,
                  fontFamily: 'inherit',
                  fontSize: 14,
                  outline: 'none',
                  resize: 'vertical',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 10,
                  marginTop: 12,
                  alignItems: 'center',
                }}
              >
                <div style={{ fontSize: 12, color: '#64748b' }}>
                  Tip: you can paste from emails, notes, Teams chats—anything.
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => setBulkText('')}
                    style={{
                      borderRadius: 14,
                      border: '1px solid rgba(15,23,42,0.12)',
                      background: 'rgba(255,255,255,0.9)',
                      padding: '10px 12px',
                      cursor: 'pointer',
                      fontWeight: 800,
                    }}
                  >
                    Clear
                  </button>
                  <button
                    onClick={addBulkLines}
                    style={{
                      borderRadius: 14,
                      border: 'none',
                      background: '#10b981',
                      color: 'white',
                      padding: '10px 14px',
                      cursor: 'pointer',
                      fontWeight: 950,
                    }}
                  >
                    Add to Inbox
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 12, fontSize: 12, color: '#64748b' }}>
          Next upgrade: drag-and-drop triage + saving across devices. (We’ll do
          it in tiny safe steps.)
        </div>
      </div>
    </div>
  );
}
