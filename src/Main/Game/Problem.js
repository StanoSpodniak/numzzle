const Problem = () => {
    const math = require('mathjs');

    const getMathSign = (mathSign) => {
        let signs = ['+', '-', '*', '/'];

        if(mathSign) {
            signs = ['+', '-', '*'];
        }

        if(mathSign === "*" || mathSign === "/") {
            signs = ['+', '-'];
        }

        const randomIndex = Math.floor(Math.random() * signs.length);
        return signs[randomIndex];
    }
    const mathSign = getMathSign();
    const secondMathSign = getMathSign(mathSign);

    const getRandomNumber = (mathSign, firstRndNmb, secondMathSign) => {
        let rndNmb = 1;

        if (mathSign === "*" || secondMathSign === "*") {
            rndNmb = Math.ceil(Math.random() * 15); 
        } else if (mathSign === "+" || mathSign === "-") {
            rndNmb = Math.ceil(Math.random() * 15);
        } else {
            if (!firstRndNmb || secondMathSign !== undefined) {
                rndNmb = Math.ceil(Math.random() * 15);
            } else {
                let rnd = Math.floor(Math.random() * firstRndNmb);
                for (let i = 1; i <= rnd; i++) {
                    if (firstRndNmb % i === 0) {
                        rndNmb = i;
                    }
                }
            }
        }
        return rndNmb;
    }
    const firstRndNmb = getRandomNumber(mathSign);
    const secondRndNmb = getRandomNumber(mathSign, firstRndNmb);
    const thirdRndNmb = getRandomNumber(mathSign, firstRndNmb, secondMathSign);

    const getResult = (mathSign, firstRndNmb, secondRndNmb) => {
        return math.evaluate(`${firstRndNmb} ${mathSign} ${secondRndNmb} ${secondMathSign} ${thirdRndNmb}`);
    }
    let result = getResult(mathSign, firstRndNmb, secondRndNmb);

    const Problem = {
        mathSign: mathSign,
        firstRndNmb: firstRndNmb,
        secondRndNmb: secondRndNmb,
        secondMathSign: secondMathSign,
        thirdRndNmb: thirdRndNmb,
        result: result
    }

    return Problem;
}

export default Problem;