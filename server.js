const { CheckDomain1 } = require('./cronjob1.js');
const { CheckDomain2 } = require('./cronjob2.js');
const { CheckDomain3 } = require('./cronjob3.js');
const { CheckDomain4 } = require('./cronjob4.js');
const { CheckDomain5 } = require('./cronjob5.js');
const { CheckDomain6 } = require('./cronjob6.js');
const { CheckDomain7 } = require('./cronjob7.js');
const { CheckDomain8 } = require('./cronjob8.js');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8999;
app.get('/', async (req, res)  => {
    res.status(200).json({msg: "hello world", responseCode: 1 });
})
app.listen(PORT, () => console.log('server running!'));

CheckDomain1();
CheckDomain2();
CheckDomain3();
CheckDomain4();
CheckDomain5();
CheckDomain6();
CheckDomain7();
CheckDomain8();