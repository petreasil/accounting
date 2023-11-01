import React from "react";

const Bills = React.lazy(() => import("./pages/bills/Bills"));
const Invoices = React.lazy(() => import("./pages/invoices/Invoices"));
const SingleInvoie = React.lazy(() => import("./pages/invoices/SingleInvoice"));
const SingleBill = React.lazy(() => import("./pages/bills/SingleBill"));

export const routes = [
  { path: "bills", name: "Bills", element: Bills },
  { path: "bills/:id", name: "Single Bill", element: SingleBill },
  { path: "invoices", name: "Invoices", element: Invoices },
  { path: "invoices/:id", name: "Single Invoice", element: SingleInvoie },
];
