/* eslint-disable no-console */
const FTP = require('ftp-deploy');

const FTPConnection = new FTP();

const configuration = {
  user: process.env.FTPUSERNAME,
  password: process.env.FTPPASS,
  host: process.env.FTPHOST,
  port: 21,
  localRoot: `${__dirname}/../`,
  remoteRoot: '/home/f3desk/apps_nodejs/f3desk',
  include: ['*'],
};

FTPConnection.deploy(configuration, err => {
  if (err) console.error(err);
  else console.log('worked');
});
