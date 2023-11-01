import { loadPartialConfig } from "@babel/core";
import { Container } from "@mui/system";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../../routes";

const AppContent = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Suspense fallback={<div>Loading ...</div>}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
        </Routes>
      </Suspense>
    </Container>
  );
};

export default AppContent;
