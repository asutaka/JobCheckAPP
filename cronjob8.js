const cron = require("cron");
const axios = require("axios");
const DOMAIN = "https://asutakayahoo-subcribe8.onrender.com/";

var arr = [
    'trbusdt',
    'troyusdt',
    'truusdt',
    'trxusdt',
    'tusdt',
    'tvkusdt',
    'twtusdt',
    'umausdt',
    'unfiusdt',
    'uniusdt',
    'utkusdt',
    'vetusdt',
    'vgxusdt',
    'vidtusdt',
    'viteusdt',
    'voxelusdt',
    'vthousdt',
    'wanusdt',
    'wavesusdt',
    'waxpusdt',
    'wingusdt',
    'winusdt',
    'wnxmusdt',
    'woousdt',
    'wrxusdt',
    'wtcusdt',
    'xecusdt',
    'xemusdt',
    'xlmusdt',
    'xmrusdt',
    'xnousdt',
    'xrpusdt',
    'xtzusdt',
    'xvgusdt',
    'xvsusdt',
    'yfiiusdt',
    'yfiusdt',
    'yggusdt',
    'zecusdt',
    'zenusdt',
];
module.exports = {
    CheckDomain8: async () => {
        new cron.CronJob('49 0/7 * * * *', async () => {
            try{
                var dtCheck = (new Date()).getMinutes();
                if(dtCheck > 52 || dtCheck < 5)
                    return;

                const sleep = ms =>
                new Promise(res => {
                    setTimeout(res, ms)
                })

                const myPromise = num =>
                sleep(10000).then(async () => {
                    try{
                        var updateTime = (new Date()).getTime();
                        var result = await axios.get(DOMAIN + "count/1")
                        .catch(function (errorGet) {
                            console.log("[EXCEPTION] when call: " + DOMAIN + "count/1");
                        });
                        console.log("num", num, "count", result.data.count);
                        if(result != null && result.data.count <= 100)
                        {
                            var index = arr.findIndex(x => x == num);
                            let arrInsert = [];
                            var symbol = num.toUpperCase();
                            axios.get("https://api3.binance.com/api/v3/klines?symbol=" + symbol + "&interval=1h&limit=500").then(async (response) => {
                                response.data.forEach((item) => {
                                    arrInsert.push({name: symbol, e: item[0], c: item[4], o: item[1], h: item[2], l: item[3], v: item[5], q: item[7], ut: updateTime, state: true});
                                }); 
                                if(arrInsert.length > 0)
                                {
                                    var model = { num: index + 1, data:  arrInsert}
                                    var resInsert = await axios.post(DOMAIN + "syncDataClientVal", model)
                                    .catch(function (errorInsert) {
                                        console.log("Exception when call: " + DOMAIN + "syncDataClientVal");
                                    });
                                    if(resInsert != null)
                                    {
                                        console.log("resInsert:", num, resInsert.data, arrInsert.length);
                                    }
                                }
                            })
                            .catch(function (error) {
                                console.log("Exception when call: " + "https://api3.binance.com/api/v3/klines?symbol=" + symbol + "&interval=1h&limit=500");
                            });
                        }
                    }
                    catch(e)
                    {
                        console.log("[EXCEPTION] Unknown Error| " + e);
                    }
                })

                const forEachSeries = async (iterable, action) => {
                    for (const x of iterable) {
                        await action(x)
                    }
                }

                forEachSeries(arr, myPromise)
                .then(() => {
                    console.log('all done!')
                })
            }
            catch(error)
            {
                console.error("[EXCEPTION] CheckDomain8", error.response.data);
            }
        }).start();
    }
}


