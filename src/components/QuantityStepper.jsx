export default function QuantityStepper({ value, onChange, min = 1, max = 30 }) {
  const decrement = () => onChange(Math.max(min, value - 1))
  const increment = () => onChange(Math.min(max, value + 1))

  return (
    <div className="stepper">
      <button
        type="button"
        className="stepper-btn"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input
        className="stepper-input"
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10)
          if (Number.isNaN(v)) return
          onChange(Math.max(min, Math.min(max, v)))
        }}
        aria-label="Quantity"
      />
      <button
        type="button"
        className="stepper-btn"
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
