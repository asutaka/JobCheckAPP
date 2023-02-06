const { CheckDomainMain, CheckDomain1, CheckDomain2, CheckDomain3, CheckDomain4 } = require('./cronjob.js');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8999;
app.get('/', async (req, res)  => {
    res.status(200).json({msg: "hello world", responseCode: 1 });
})
app.listen(PORT, () => console.log('server running!'));

CheckDomainMain();
CheckDomain1();
CheckDomain2();
CheckDomain3();
CheckDomain4();
