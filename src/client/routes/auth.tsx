import React, { useMemo } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import { nested } from '@/client/utils/nested.routes';

const routeVariants = {
  enter: {
    opacity: 1,
    transition: { duration: 0.25, ease: 'easeInOut', delay: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
  initial: {
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
};

export function AuthRoutes() {
  const routes = useMemo(() => nested([2, 'children']), []);
  const location = useLocation();

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        {routes.map(r => (
          <Route
            path={r.path}
            exact={r.exact}
            strict={r.strict}
            render={() => {
              if (r.component) {
                return (
                  <motion.div variants={routeVariants} exit="exit" animate="enter" initial="initial">
                    <r.component />
                  </motion.div>
                );
              }

              return <Redirect to="/app" />;
            }}
          />
        ))}
      </Switch>
    </AnimatePresence>
  );
}
