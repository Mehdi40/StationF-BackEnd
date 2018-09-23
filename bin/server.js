import chalk from 'chalk';
import app from './app';
const port = process.env.PORT || 3000;

const server = app.listen(port, function() {
  console.log('%s Express server listening on port %d', chalk.green('✓'), port);
});

module.exports = server