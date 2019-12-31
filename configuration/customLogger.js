/* globals __resourceQuery */
if (module.hot) {
  const hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
  const log = require('webpack/hot/log'); // eslint-disable-line global-require

  const checkForUpdate = function checkForUpdate() {
    if (module.hot.status() === 'idle') {
      module.hot
        .check(true)
        .then(updatedModules => {
          if (!updatedModules) {
            return;
          }
          checkForUpdate();
        })
        .catch(err => {
          const status = module.hot.status();
          if (['abort', 'fail'].indexOf(status) >= 0) {
            log('warning', 'Cannot apply update.');
            log('warning', log.formatError(err));
            log('warning', 'You need to restart the application!');
          } else {
            log('warning', `Update failed: ${log.formatError(err)}`);
          }
        });
    }
  };
  setInterval(checkForUpdate, hotPollInterval);
} else {
  throw new Error('Hot Module Replacement is disabled.');
}
