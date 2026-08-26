import { useEffect, useState } from "react";

export default function QuantityStepper({
  id,
  label,
  value,
  min,
  max,
  onChange,
  hint,
  size = "default",
}) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  const commit = (raw) => {
    const n = Number(raw);
    if (raw !== "" && Number.isFinite(n)) {
      onChange(Math.min(max, Math.max(min, Math.round(n))));
    }
  };

  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className={`stepper stepper-${size}`}>
      <label className="stepper-label" htmlFor={id}>
        {label}
      </label>
      <div className="stepper-controls">
        <button
          type="button"
          className="stepper-btn"
          onClick={dec}
          disabled={value <= min}
          aria-label={`Decrease ${label} (−)`}
        >
          <span aria-hidden="true">−</span>
        </button>
        <input
          className="stepper-input"
          id={id}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={draft}
          min={min}
          max={max}
          onChange={(e) => {
            setDraft(e.target.value);
            commit(e.target.value);
          }}
          onBlur={() => setDraft(String(value))}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
        <button
          type="button"
          className="stepper-btn"
          onClick={inc}
          disabled={value >= max}
          aria-label={`Increase ${label} (+)`}
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
      {hint && (
        <p className="stepper-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
    </div>
  );
}
