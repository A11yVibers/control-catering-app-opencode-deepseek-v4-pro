import { useParams, Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Invoice from "../components/Invoice.jsx";
import { loadInvoice } from "../utils/storage.js";

export default function OrderConfirmationPage() {
  useDocumentTitle("Order Confirmed");
  const { orderId } = useParams();
  const order = loadInvoice(orderId);

  return (
    <div className="page">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Checkout", to: "/checkout" },
          { label: "Confirmation" },
        ]}
      />

      {order ? (
        <>
          <div className="confirmation-banner" role="status">
            <h1>Order confirmed</h1>
            <p>
              Thank you, {order.contact.name}! Your order{" "}
              <strong>{order.orderId}</strong> has been received. A copy of your
              invoice is shown below.
            </p>
          </div>

          <Invoice order={order} />

          <div className="confirmation-actions">
            <button type="button" className="btn btn-secondary" onClick={() => window.print()}>
              Print invoice
            </button>
            <Link to="/menu" className="btn btn-primary">
              Back to menu
            </Link>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <h1>Invoice not found</h1>
          <p>We couldn&apos;t find an invoice for order {orderId}.</p>
          <p>
            <Link to="/menu" className="btn btn-primary">
              Browse the menu
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
