const fs = require('fs');
const path = require('path');
const moment = require('moment');

const logger = (req, res, next) => {
   const logs = `${req.protocol}://${req.get('host')}${
      req.originalUrl
   }: ${moment().format()}`;
   console.log(logs);

   // fs.mkdir(path.join(__dirname, '../logs'), {}, (err) => {
   //    if (err) throw err;
   //    console.log('Folder Created...');
   // });

   // fs.writeFile(path.join(__dirname, '../logs', 'logs.txt'), logs, (err) => {
   //    if (err) throw err;
   //    console.log('Already written to...');
   // });
   next();
};

module.exports = logger;
