// Lightweight localStorage helpers. Invoices are kept locally so the business
// owner can review them later (no server is involved).

const INVOICES_KEY = "control-catering-invoices";

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function loadInvoices() {
  return safeParse(localStorage.getItem(INVOICES_KEY), []);
}

export function saveInvoice(invoice) {
  const invoices = loadInvoices();
  invoices.unshift(invoice);
  try {
    localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
  } catch {
    // Storage may be unavailable (private mode / quota). The invoice is still
    // shown on screen; persistence is best-effort.
  }
}

export function loadInvoice(orderId) {
  return loadInvoices().find((invoice) => invoice.orderId === orderId) || null;
}
