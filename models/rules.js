class Rules{
    constructor(){
        this.totalScore  = 16;
        this.numberOfRules = 16;
        this.summary = {0:0,1:0,0.5:0}
    }

    /*START General helper methods */

    // General method to validate if some value is true or not
     validateExistence(value){
        if(value === true){
            return 1;
        } else {
            return 0
        }
    }

    // General method to validate if some value is greater or lesser than specific number
     validateSize(value, number){
        if(value < number){
            return 1;
        } else {
            return 0;
        }
    }

    // Calculate negative score 
     calculateNegativeScore(status, level){
        if(status === 0){
            return level * 1;
        } else {
            return 0;
        }
    }

    // Substract negative score from total score and save negative score
    updateTotalScore(negativeScore){
        this.summary[negativeScore]  = this.summary[negativeScore] + 1 || 1;
        this.totalScore = this.totalScore - negativeScore
    }

    /*END General helper methods */

    /*START SEO rules */
    evalTitle(value){
        const result = [
            "PAGE TITLE length is above 65 characters",
            "PAGE TITLE length is below 65 characters"
            
        ]

        const negativeScore = this.calculateNegativeScore(this.validateSize(value, 65), 0.5)
        this.updateTotalScore(negativeScore);

        return {
            description : result[this.validateSize(value, 65)],
            negativeScore : negativeScore
            }
    }

    evalMetaDesc(value){
        const options = [
            "META DESCRIPTION is not defined",
            "META DESCRIPTION is defined"
        ]
        const negativeScore = this.calculateNegativeScore(this.validateExistence(value), 1);
        this.updateTotalScore(negativeScore);


        return {
            description : options[this.validateExistence(value)],
            negativeScore : negativeScore
            }
    }

    evalH1(value){
        const options = [
            "HEADING 1 is not defined",
            "HEADING 1 is defined"
        ]


        const negativeScore = this.calculateNegativeScore(this.validateExistence(value), 1);
        this.updateTotalScore(negativeScore);

        return {
                description : options[this.validateExistence(value)],
                negativeScore : negativeScore
            }
    }

    evalH2(value){
        const options = [
            "HEADING 2 is not defined",
            "HEADING 2 is defined"
        ]


        const negativeScore = this.calculateNegativeScore(this.validateExistence(value), 0.5);
        this.updateTotalScore(negativeScore);

        return {
                description : options[this.validateExistence(value)],
                negativeScore : negativeScore
            }
    }

    evalH3(value){
        const options = [
            "HEADING 3 is not defined",
            "HEADING 3 is defined"
        ]


        const negativeScore = this.calculateNegativeScore(this.validateExistence(value), 0.5);
        this.updateTotalScore(negativeScore);

        return {
                description : options[this.validateExistence(value)],
                negativeScore : negativeScore
            }
    }


    evalhtmlTextRatio(value){
        const options = [
            "TEXT/HTML ratio is lower than 30%",
            "TEXT/HTML ratio is higher than 30%"
        ]

        const negativeScore = this.calculateNegativeScore(this.validateSize(30, value), 0.5);
        this.updateTotalScore(negativeScore);
            
        return {
            description : options[this.validateSize(30, value)],
            negativeScore : negativeScore
            }   
    }

    evalNofollow(value){
        const options = [
            "NOFOLLOW is present on internal links",
            "NOFOLLOW is not present on internal links",
        ]

        const negativeScore = this.calculateNegativeScore(this.validateExistence(value), 0.5);
        this.updateTotalScore(negativeScore);

        return {
            description : options[this.validateExistence(value)],
            negativeScore : negativeScore
            }
    }

    evalFavicone(value){
        const options = [
            "FAVICON not found",
            "FAVICON found"
        ]

        const negativeScore = this.calculateNegativeScore(this.validateExistence(value), 0.5);
        this.updateTotalScore(negativeScore);

        return {
                description : options[this.validateExistence(value)],
                negativeScore : negativeScore
        }
    }

    evalMetaViewport(value){
        const options = [
            "Meta Viewport is not present",
            "Meta Viewport is present"
        ]

        const negativeScore = this.calculateNegativeScore(this.validateExistence(value), 0.5);
        this.updateTotalScore(negativeScore);

        return {
                description : options[this.validateExistence(value)],
                negativeScore : negativeScore
            }
    }

    evalHTTPS(value){
        const options = [
            "This web site doesn't use HTTPS connection",
            "This web site uses HTTPS connection"
        ]

        const negativeScore = this.calculateNegativeScore(this.validateExistence(value), 1);
        this.updateTotalScore(negativeScore);

        return  {
                description : options[this.validateExistence(value)],
                negativeScore : negativeScore
            }
    }        

    evalIds(value){
        const options = [
            "There are duplicated IDs",
            "All IDs are unique"
        ]

        const negativeScore = this.calculateNegativeScore(this.validateExistence(value), 0.5);
        this.updateTotalScore(negativeScore);

        return {
            description : options[this.validateExistence(value)],
            negativeScore : negativeScore
            }
        }

    evalInternalCss(value){
        const options = [
            "Inline CSS is present",
            "Inline CSS is not present"
        ]

        const negativeScore = this.calculateNegativeScore(this.validateExistence(value), 0.5);
        this.updateTotalScore(negativeScore);

        return {
            description : options[this.validateExistence(value)],
            negativeScore : negativeScore
            }
    }

    evalImageAlts(value){
            const options = [
                "Alternative text is not set on all images",
                "Alternative text is set on all images"
            ]
    
            const negativeScore = this.calculateNegativeScore(this.validateExistence(value), 0.5);
            this.updateTotalScore(negativeScore);

            return {
                description : options[this.validateExistence(value)],
                negativeScore : negativeScore
               }
    }

    evalUrlsLength(value){
        const options = [
            "URL has more than 80 characters",
            "URL has less than 80 characters", 
        ]

        const negativeScore = this.calculateNegativeScore(this.validateSize(value, 80), 1);
        this.updateTotalScore(negativeScore);

        return {
                description : options[this.validateSize(value, 80)],
                negativeScore : negativeScore
            }
    }

    evalUnderscore(value){
        const options = [
            "URL has underline character in it's structure",
            "URL has no underline character in it's structure" 
        ]

        const negativeScore = this.calculateNegativeScore(this.validateExistence(value), 1);
        this.updateTotalScore(negativeScore);

        return {
                description : options[this.validateExistence(value)],
                negativeScore : negativeScore
             }
    }

    evalLowercase(value){
        const options = [
            "URL has not all its characters in lowercase",
            "URL has all its characters in lowercase", 
        ]

        const negativeScore = this.calculateNegativeScore(this.validateExistence(value), 1);
        this.updateTotalScore(negativeScore);

        return {
                description : options[this.validateExistence(value)],
                negativeScore : negativeScore
            }
    } 

    /*END SEO rules */

}

module.exports = Rules;