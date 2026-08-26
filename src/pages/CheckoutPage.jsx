import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { useCart } from "../context/CartContext.jsx";
import { CATEGORIES } from "../data/menu.js";
import {
  toISODate,
  fromISODate,
  minOrderDate,
  maxOrderDate,
  isOrderableDate,
  formatLongDate,
} from "../utils/dates.js";
import { formatPrice } from "../utils/format.js";
import { saveInvoice } from "../utils/storage.js";

const TIME_SLOTS = [
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
];

const PAYMENT_METHODS = [
  { value: "cash", label: "Cash on pickup" },
  { value: "card", label: "Credit or debit card (paid at pickup)" },
  { value: "transfer", label: "Bank transfer" },
];

const PAYMENT_DETAIL_LABEL = {
  card: "Name on card",
  transfer: "Account name or reference",
};

function generateOrderId() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  return `HK-${stamp}`;
}

export default function CheckoutPage() {
  useDocumentTitle("Checkout");
  const navigate = useNavigate();
  const { detailed, subtotal, totalItems, clearCart, isEmpty } = useCart();

  const today = useMemo(() => new Date(), []);
  const minIso = toISODate(minOrderDate(today));
  const maxIso = toISODate(maxOrderDate(today));

  const [form, setForm] = useState({
    pickupDate: minIso,
    pickupTime: "",
    name: "",
    phone: "",
    email: "",
    payment: "",
    paymentDetail: "",
    specialInstructions: "",
  });
  const [errors, setErrors] = useState({});

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const next = {};
    if (!form.pickupDate) {
      next.pickupDate = "Choose a pickup date.";
    } else if (!isOrderableDate(fromISODate(form.pickupDate), today)) {
      next.pickupDate = "Pickup must be between 2 and 14 days from now.";
    }
    if (!form.pickupTime) next.pickupTime = "Choose a pickup time slot.";
    if (!form.name.trim()) next.name = "Enter your full name.";
    if (!form.phone.trim()) next.phone = "Enter your phone number.";
    else if (!/^[+()\-.\s\d]{7,}$/.test(form.phone.trim()))
      next.phone = "Enter a valid phone number.";
    if (!form.email.trim()) next.email = "Enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (!form.payment) next.payment = "Select a payment method.";
    if (
      (form.payment === "card" || form.payment === "transfer") &&
      !form.paymentDetail.trim()
    ) {
      next.paymentDetail = `Enter ${PAYMENT_DETAIL_LABEL[form.payment].toLowerCase()}.`;
    }
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0];
      const el = document.getElementById(firstKey);
      if (el) el.focus();
      return;
    }

    const methodLabel =
      PAYMENT_METHODS.find((m) => m.value === form.payment)?.label || form.payment;

    const order = {
      orderId: generateOrderId(),
      placedAt: new Date().toISOString(),
      pickupDate: form.pickupDate,
      pickupTime: form.pickupTime,
      contact: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
      },
      payment: {
        method: form.payment,
        methodLabel,
        detail: form.paymentDetail.trim(),
      },
      specialInstructions: form.specialInstructions.trim(),
      items: detailed.map((entry) => ({
        itemId: entry.itemId,
        name: entry.item.name,
        category: entry.item.category,
        quantity: entry.quantity,
        unitPrice: entry.item.price,
        lineTotal: entry.lineTotal,
      })),
    };

    saveInvoice(order);
    clearCart();
    navigate(`/order/${order.orderId}`);
  };

  const errorSummary = Object.values(errors);

  if (isEmpty) {
    return (
      <div className="page">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Checkout" },
          ]}
        />
        <h1>Checkout</h1>
        <div className="empty-state">
          <p>Your cart is empty, so there is nothing to check out.</p>
          <p>
            <Link to="/menu" className="btn btn-primary">
              Browse the menu
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const paymentNeedsDetail =
    form.payment === "card" || form.payment === "transfer";

  return (
    <div className="page">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Cart", to: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <h1>Checkout</h1>

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        {errorSummary.length > 0 && (
          <div className="error-summary" role="alert" tabIndex="-1">
            <h2 className="error-summary-title">
              Please fix the following issues:
            </h2>
            <ul>
              {errorSummary.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="checkout-grid">
          <div className="checkout-fields">
            <section className="form-section" aria-labelledby="pickup-heading">
              <h2 id="pickup-heading" className="form-section-title">
                Pickup details
              </h2>

              <div className="field">
                <label htmlFor="pickupDate">
                  Pickup date <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  id="pickupDate"
                  type="date"
                  value={form.pickupDate}
                  min={minIso}
                  max={maxIso}
                  onChange={(e) => setField("pickupDate", e.target.value)}
                  aria-invalid={errors.pickupDate ? "true" : undefined}
                  aria-describedby={
                    errors.pickupDate ? "pickupDate-error" : "pickupDate-hint"
                  }
                />
                <p className="field-hint" id="pickupDate-hint">
                  {isOrderableDate(fromISODate(form.pickupDate), today)
                    ? `Pickup on ${formatLongDate(fromISODate(form.pickupDate))}.`
                    : "Pickup must be between 2 and 14 days from now."}
                </p>
                {errors.pickupDate && (
                  <p className="field-error" id="pickupDate-error">
                    {errors.pickupDate}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="pickupTime">
                  Pickup time slot <span className="required" aria-hidden="true">*</span>
                </label>
                <select
                  id="pickupTime"
                  value={form.pickupTime}
                  onChange={(e) => setField("pickupTime", e.target.value)}
                  aria-invalid={errors.pickupTime ? "true" : undefined}
                  aria-describedby={errors.pickupTime ? "pickupTime-error" : undefined}
                >
                  <option value="">Select a time slot…</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.pickupTime && (
                  <p className="field-error" id="pickupTime-error">
                    {errors.pickupTime}
                  </p>
                )}
              </div>
            </section>

            <section className="form-section" aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="form-section-title">
                Contact information
              </h2>

              <div className="field">
                <label htmlFor="name">
                  Full name <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p className="field-error" id="name-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="phone">
                  Phone number <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  aria-invalid={errors.phone ? "true" : undefined}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p className="field-error" id="phone-error">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="email">
                  Email address <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  aria-invalid={errors.email ? "true" : undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p className="field-error" id="email-error">
                    {errors.email}
                  </p>
                )}
              </div>
            </section>

            <section className="form-section" aria-labelledby="payment-heading">
              <h2 id="payment-heading" className="form-section-title">
                Payment method
              </h2>

              <fieldset className="field-group">
                <legend>
                  Payment method <span className="required" aria-hidden="true">*</span>
                </legend>
                {PAYMENT_METHODS.map((method) => (
                  <div className="radio-option" key={method.value}>
                    <input
                      id={`pay-${method.value}`}
                      type="radio"
                      name="payment-method"
                      value={method.value}
                      checked={form.payment === method.value}
                      onChange={(e) => setField("payment", e.target.value)}
                    />
                    <label htmlFor={`pay-${method.value}`}>{method.label}</label>
                  </div>
                ))}
                {errors.payment && (
                  <p className="field-error" id="payment-error">
                    {errors.payment}
                  </p>
                )}
              </fieldset>

              {paymentNeedsDetail && (
                <div className="field">
                  <label htmlFor="paymentDetail">
                    {PAYMENT_DETAIL_LABEL[form.payment]}{" "}
                    <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="paymentDetail"
                    type="text"
                    autoComplete={form.payment === "card" ? "cc-name" : "off"}
                    value={form.paymentDetail}
                    onChange={(e) => setField("paymentDetail", e.target.value)}
                    aria-invalid={errors.paymentDetail ? "true" : undefined}
                    aria-describedby={
                      errors.paymentDetail ? "paymentDetail-error" : undefined
                    }
                  />
                  {errors.paymentDetail && (
                    <p className="field-error" id="paymentDetail-error">
                      {errors.paymentDetail}
                    </p>
                  )}
                </div>
              )}
              <p className="field-hint">
                No payment is taken online — you will settle up at pickup.
              </p>
            </section>

            <section className="form-section" aria-labelledby="instructions-heading">
              <h2 id="instructions-heading" className="form-section-title">
                Special instructions
              </h2>
              <div className="field">
                <label htmlFor="specialInstructions">
                  Special instructions (optional)
                </label>
                <textarea
                  id="specialInstructions"
                  rows="4"
                  value={form.specialInstructions}
                  onChange={(e) => setField("specialInstructions", e.target.value)}
                  placeholder="Allergies, dietary notes, packaging requests…"
                />
              </div>
            </section>
          </div>

          <aside className="checkout-summary" aria-labelledby="order-summary-heading">
            <h2 id="order-summary-heading">Your order</h2>
            <ul className="checkout-items">
              {detailed.map((entry) => (
                <li key={entry.itemId}>
                  <span className="checkout-item-name">
                    {entry.item.name}{" "}
                    <span className="checkout-item-meta">
                      ({CATEGORIES[entry.item.category].label})
                    </span>
                  </span>
                  <span className="checkout-item-qty">× {entry.quantity}</span>
                  <span className="checkout-item-total">
                    {formatPrice(entry.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="summary-list">
              <div>
                <dt>Total portions</dt>
                <dd>{totalItems}</dd>
              </div>
              <div>
                <dt>Total</dt>
                <dd>
                  <strong>{formatPrice(subtotal)}</strong>
                </dd>
              </div>
            </dl>
            <button type="submit" className="btn btn-primary btn-block btn-large">
              Place order
            </button>
            <p className="summary-note">
              <span className="required" aria-hidden="true">*</span> Required fields.
            </p>
          </aside>
        </div>
      </form>
    </div>
  );
}
