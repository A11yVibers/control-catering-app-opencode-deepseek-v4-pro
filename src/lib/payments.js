export const PAYMENT_OPTIONS = [
  { value: 'cash', label: 'Pay at pickup — cash' },
  { value: 'card', label: 'Pay at pickup — card' },
  { value: 'transfer', label: 'Bank transfer (details on invoice)' },
]

export function paymentLabel(value) {
  const opt = PAYMENT_OPTIONS.find((o) => o.value === value)
  return opt ? opt.label : value
}
