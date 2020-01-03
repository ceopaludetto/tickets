import { AnimatePresence, motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

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
  const routes = useMemo(() => nested([1, 'children']), []);
  const location = useLocation();

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        {routes.map(r => (
          <Route
            path={r.path}
            exact={r.exact}
            strict={r.strict}
            render={() => (
              <motion.div variants={routeVariants} exit="exit" animate="enter" initial="initial">
                <r.component />
              </motion.div>
            )}
          />
        ))}
      </Switch>
    </AnimatePresence>
  );
}
