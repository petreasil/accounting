import React from "react";

const Bills = React.lazy(() => import("./pages/bills/Bills"));

export const routes = [{ path: "bills", name: "Bills", element: Bills }];
