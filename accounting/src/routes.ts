import React from "react";

const Bills = React.lazy(() => import("./pages/bills/Bills"));
const Invoices = React.lazy(() => import("./pages/invoices/Invoices"));
const SingleInvoie = React.lazy(() => import("./pages/invoices/SingleInvoice"));

export const routes = [
  { path: "bills", name: "Bills", element: Bills },
  { path: "invoices", name: "Invoices", element: Invoices },
  { path: "invoices/:id", name: "Singe Invoice", element: SingleInvoie },
];
