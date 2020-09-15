const puppeteer = require("puppeteer");

class SEO{
    constructor(url){
        this.url = url,
        this.results = {};
    }

    trimUrl(){
        return this.url.replace(/https/g,"")
        .replace(/http/g,"")
        .replace(/www1./g,"")
        .replace(/www./g,"")
        .replace(/:\/\//g,"")
        .split(/[/?#]/g)[0];
    }

    addHttp(){
        return "http://" + this.url.replace(/https/g,"")
        .replace(/http/g,"")
        .replace(/www1./g,"")
        .replace(/www./g,"")
        .replace(/:\/\//g,"")
    }

    async getData(){
        // First laod HTML of a site
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const url  = this.addHttp(this.url); 
        try {
          await page.goto(url)
        } catch (error) {
          await page.close();
          await browser.close();
          return false;
        }

            // Get general data about a site, not for testing
            async function getGeneralData(){
                const results = {};
                // Screenshot
                results.screenshot = await page.screenshot({encoding:"base64"});

                // Url
                results.url = page.url();

                // Reports date and time
                let reportsDate = new Date().toString()
                reportsDate = reportsDate.split(" ");
                reportsDate.splice(5);
                reportsDate.shift();
                reportsDate = reportsDate.join(" ");
                results.reportsDate = reportsDate;

                // Response time
                results.responseTime = await page.evaluate(()=>Math.round((performance.timing.loadEventEnd - performance.timing.navigationStart) / 1000 * 10) / 10)

                return results
            }

            /* START ==> functions returning data for seo rules testing */
            async function getTitle(){
                const value = await page.$eval('title', el => el.innerText)
                return {
                    dataForTest: value.length,
                    title:"Title",
                    information: "Title is important",
                    displayData: true,
                    dataToDisplay: [
                        {
                            name: "Title",
                            values: [value]
                        }
                    ]
                }
            }

            async function getMetaDesc(){
                let value = "";
                if(await page.$('meta[name="description"]') !== null){
                    value = await page.$eval('meta[name="description"]', el => el.content);
                } else if(await page.$('meta[name="twitter:description"]') !== null){
                    value = await page.$eval('meta[name="twitter:description"]', el => el.content);
                } else if(await page.$('meta[property="og:description"]') !== null){
                    value = await page.$eval('meta[property="og:description"]', el => el.content);
                } else {
                    value = false
                }

                return {
                    dataForTest: value.length>0,
                    title:"Meta description",
                    information: "Meta description is important",
                    displayData: value.length>0,
                    dataToDisplay: [
                        {
                            name: "Meta description",
                            values: [value]
                        }
                    ]
                }

            }

            // Helper function for getting headers    
            async function getElement(elem, result){
                for (const item of elem) {
                    const label =  await page.evaluate(el => el.innerText, item);
                    result.push(label)
                }
                return result;
            }

            async function getH1(){
                const h1 =  await page.$$("h1");
                const data = getElement(h1,[]);
                return data.then(d=>{
                    return {
                    dataForTest: d.length>0,
                    title:"H1",
                    information: "H1 is important",
                    displayData: d.length>0,
                    dataToDisplay: [
                        {
                            name: "H1",
                            values: d
                        }
                    ]
                    }
                })
            }

            async function getH2(){
                const h2 =  await page.$$("h2");
                const data = getElement(h2,[]);
                return data.then(d=>{
                    return {
                    dataForTest: d.length>0,
                    title:"H2",
                    information: "H2 is important",
                    displayData: d.length>0,
                    dataToDisplay: [
                        {
                            name: "H2",
                            values: d
                        }
                    ]
                    }
                })
            }

            async function getH3(){
                const h3 =  await page.$$("h3");
                const data = getElement(h3,[])
                return data.then(d=>{
                    return {
                    dataForTest: d.length>0,
                    title:"H3",
                    information: "H3 is important",
                    displayData: d.length>0,
                    dataToDisplay: [
                        {
                            name: "H3",
                            values: d
                        }
                    ]
                    }
                })
            }


            async function gethtmlText(){
                const text = await page.$eval("body", el=>(Math.round((el.innerText.length / 1024) * 100)) / 100)
                const code = await page.$eval("body", el=>(Math.round((el.innerHTML.length / 1024) * 100) / 100))
                const ratio = Math.round((text / (code / 100) * 100)) / 100
                return {
                    dataForTest: ratio,
                    title:"Text/HTML ratio",
                    information: "Text/HTML ratio should be lower than 30%",
                    displayData: true,
                    dataToDisplay: [
                        {
                            name: "Text/HTML ratio",
                            values: [ratio] 
                        },
                        {
                            name: "Text",
                            values: [text] 
                        },
                        {
                            name: "Code",
                            values: [code] 
                        }
                    ]
                }
                
            }

            async function checkNofollow(url){
                const noFollowLinks = [];
                const links = await page.$$("a");
                    for (const item of links) {
                        const link =  await page.evaluate(el => el.href, item);
                        const patt = new RegExp(url);
                        const res = patt.test(link);
                        if(res){
                            // Check if there is some internal link with nofollow rel attribute
                            if(await page.evaluate(el => el.rel, item) === "nofollow"){
                                noFollowLinks.push(link)
                            }
                        } 
                    }
                    return {
                        dataForTest: noFollowLinks.length === 0,
                        title:"NoFollow on internal links",
                        information: "Not having NoFollow is important",
                        displayData: noFollowLinks.length > 0,
                        dataToDisplay: [
                            {
                                name: "Internal links with NoFollow attribute",
                                values: noFollowLinks 
                            }
                        ]
                    }
            }

            async function checkFavicon(){
                let value = true;
                if(await page.$("link[rel='icon']") || await page.$("link[rel='shortcut icon']")){
                    value = true;    
                } else {
                    value = false;
                }

                return {
                    dataForTest: value,
                    title:"Favicon",
                    information: "Favicon is important",
                    displayData: false,
                    dataToDisplay: []
                }
            }

            async function checkMetaViewport(){
                let value = true;
                if(await page.$("meta[name='viewport']")){
                    value = true;    
                } else {
                    value = false;
                }

                return {
                    dataForTest: value,
                    title:"Meta viewport",
                    information: "Meta viewport is important",
                    displayData: false,
                    dataToDisplay: []
                }
            }

            async function checkHttpsConnection(){
                return {
                    dataForTest:  /https/g.test(page.url()),
                    title:"HTTPS",
                    information: "HTTPS connection is important",
                    displayData: false,
                    dataToDisplay: []
                }
            }


            async function checkIds(){
                const idsResult = [];
                const ids =  await page.$$("*[id]");
                for (const item of ids) {
                    const id =  await page.evaluate(el => el.id, item);
                    idsResult.push(id);
                }

                return {
                    dataForTest: idsResult.length === [...new Set(idsResult)].length,
                    title:"Unique IDs",
                    information: "Having unique ids is important",
                    displayData: false,
                    dataToDisplay: []
                }
            }

            async function checkInternalCss(){
                let value = await page.$eval("body", el=>el.innerHTML.match(/style=/g))
                value = !value ? 0 : value.length;
                return {
                    dataForTest: value === 0,
                    title:"Internal Css",
                    information: "Non having internal CSS is important",
                    displayData: false,
                    dataToDisplay: []
                }    
            }

            async function checkImageAlts(){
                let value = 0;
                let result;
                const images = await page.$$("img");
                for (const item of images) {
                    const alt =  await page.evaluate(el => el.alt, item);
                    if(alt === ""){
                        value++;
                    }
                }
                    result = value === 0 ? true : false; 
                    return {
                        dataForTest: result,
                        title:"Image alts",
                        information: "",
                        displayData: !result,
                        dataToDisplay: [
                            {
                                name:"Number of images without alternative text",
                                values: [value]
                            }
                        ]
                    }    
                }

                        
            function urlLength(url){
                const value =  url.length;
                return {
                        dataForTest: value,
                        title:"Url lenght",
                        information: "Url lenght should be short",
                        displayData: true,
                        dataToDisplay: [
                            {
                                name:"Url characters",
                                values: [value]
                            }
                        ]
                    }    
                        
                }

            function urlHasUnderscore(url){
                const value = !/_/g.test(url);
                return {
                    dataForTest: value,
                    displayData: false,
                    title:"Url underscore",
                    information: "Url should not contain underscore",
                    dataToDisplay: []
                }                           
            }

            function urlIsLowercased(url){
                const value =  url === url.toLowerCase();
                return  {
                    dataForTest: value,
                    displayData: false,
                    title:"Url lowercased",
                    information: "Url characters should be lowercase",
                    dataToDisplay: []
                }                       
        }

         /* END ==> functions returning data for seo rules testing*/

        return Promise.all([
             getGeneralData(),
             getTitle(),
             getMetaDesc(),
             getH1(),
             getH2(),
             getH3(),
             gethtmlText(),
             checkNofollow(this.trimUrl()),
             checkFavicon(),
             checkMetaViewport(),
             checkHttpsConnection(),
             checkIds(),
             checkInternalCss(),
             checkImageAlts(),
             urlLength(this.url),
             urlHasUnderscore(this.url),
             urlIsLowercased(this.url)
        ])
        .then(d=>d)
        .catch(error=>false)
     };


    getResults(){
    return this.getData();
    }
}

module.exports = SEO;


