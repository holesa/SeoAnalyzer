const SEO           = require("./seo"),
      Rules         = require("./rules");

class Manager{
    constructor(req){
        this.results = {};
        this.req = req,
        this.url = req.query.url;
    }

        getResults(){
            const seo = new SEO(this.url);
            const rules = new Rules();
            const result = seo.getResults().then(data=>{
                if(!data){
                    return false
                } else {
            return {
                rules : [
                    [data[1], rules.evalTitle(data[1].dataForTest)],
                    [data[2], rules.evalMetaDesc(data[2].dataForTest)],
                    [data[3], rules.evalH1(data[3].dataForTest)],
                    [data[4], rules.evalH2(data[4].dataForTest)],
                    [data[5], rules.evalH3(data[5].dataForTest)],
                    [data[6], rules.evalhtmlTextRatio(data[6].dataForTest)],
                    [data[7], rules.evalNofollow(data[7].dataForTest)],
                    [data[8], rules.evalFavicone(data[8].dataForTest)],
                    [data[9], rules.evalMetaViewport(data[9].dataForTest)],
                    [data[10], rules.evalHTTPS(data[10].dataForTest)],
                    [data[11], rules.evalIds(data[11].dataForTest)],
                    [data[12], rules.evalInternalCss(data[12].dataForTest)],
                    [data[13], rules.evalImageAlts(data[13].dataForTest)],
                    [data[14], rules.evalUrlsLength(data[14].dataForTest)],
                    [data[15], rules.evalUnderscore(data[15].dataForTest)],
                    [data[16], rules.evalLowercase(data[16].dataForTest)],
                ],
                general : [
                            data[0], 
                            {
                                total:Math.round(rules.totalScore / (rules.numberOfRules / 100 )),
                                summary: rules.summary
                            }
                        ]
                    }
                }
            })
            return result;
        }
 }

module.exports = Manager;