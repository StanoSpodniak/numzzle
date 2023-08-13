import {useState, useEffect, useRef} from "react";
import Problem from "./Problem";
import "./game.css";

const Game = ({ isNewGame, isGiveUp }) => {
    const [firstProblem, setFirstProblem] = useState([]);
    const [secondProblem, setSecondProblem] = useState([]);
    const [thirdProblem, setThirdProblem] = useState([]);

    const [solution, setSolution] = useState([]);
    const [playNumbers, setPlayNumbers] = useState([]);
    const [clickedNumbers, setClickedNumbers] = useState([""]);
    const tileRefs = useRef([]);

    useEffect(() => {
        setFirstProblem(Problem());
        setSecondProblem(Problem());
        setThirdProblem(Problem());
    },[]);
    
    useEffect(() => {
        //console.log(firstProblem);
        //console.log(secondProblem);
        //console.log(thirdProblem);

        if (firstProblem && secondProblem && thirdProblem) {
            let numbers = [firstProblem.firstRndNmb];
            numbers = [...numbers, firstProblem.secondRndNmb];
            numbers = [...numbers, firstProblem.thirdRndNmb];
            numbers = [...numbers, secondProblem.firstRndNmb];
            numbers = [...numbers, secondProblem.secondRndNmb];
            numbers = [...numbers, secondProblem.thirdRndNmb];
            numbers = [...numbers, thirdProblem.firstRndNmb];
            numbers = [...numbers, thirdProblem.secondRndNmb];
            numbers = [...numbers, thirdProblem.thirdRndNmb];

            setSolution(numbers);
        } else {
            console.log("no data");
        }
    },[firstProblem, secondProblem, thirdProblem]);

    useEffect(() => {
        let numbers = [...solution];

        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        setPlayNumbers(numbers);
    },[solution]);

    useEffect(() => {
        if(isNewGame) {
            handleNewGame();
        }
    },[isNewGame]);

    useEffect(() => {
        if(isGiveUp) {
            handleGiveUp();
        }
    },[isGiveUp]);

    const handleNewGame = () => {
        for(let i = 0; i < 9; i++) {
            setClickedNumbers("");
        }

        setFirstProblem(Problem());
        setSecondProblem(Problem());
        setThirdProblem(Problem());
    }

    const handleGiveUp = () => {
        for(let i = 0; i < 9; i++) {
            setClickedNumbers(solution);
        }
    }

    return (
        <div id="game">
            <div className="playfield">
                <button 
                    className="tile"
                    ref={ref => (tileRefs.current[0] = ref)}>
                    {clickedNumbers[0]}
                </button>
                <p className="item">{firstProblem.mathSign}</p>
                <button 
                    className="tile"
                    ref={ref => (tileRefs.current[1] = ref)}>
                    {clickedNumbers[1]}
                </button>
                <p className="item">{firstProblem.secondMathSign}</p>
                <button 
                    className="tile"
                    ref={ref => (tileRefs.current[2] = ref)}>
                    {clickedNumbers[2]}
                </button>
                <p className="item">=</p>
                <p className="item result">{firstProblem.result}</p>
            </div>
            <div className="playfield">
                <button 
                    className="tile"
                    ref={ref => (tileRefs.current[3] = ref)}>
                    {clickedNumbers[3]}
                </button>
                <p className="item">{secondProblem.mathSign}</p>
                <button 
                    className="tile"
                    ref={ref => (tileRefs.current[4] = ref)}>
                    {clickedNumbers[4]}
                </button>
                <p className="item">{secondProblem.secondMathSign}</p>
                <button 
                    className="tile"
                    ref={ref => (tileRefs.current[5] = ref)}>
                    {clickedNumbers[5]}
                </button>
                <p className="item">=</p>
                <p className="item result">{secondProblem.result}</p>
            </div>
            <div className="playfield">
                <button 
                    className="tile"
                    ref={ref => (tileRefs.current[6] = ref)}>
                    {clickedNumbers[6]}
                </button>
                <p className="item">{thirdProblem.mathSign}</p>
                <button 
                    className="tile"
                    ref={ref => (tileRefs.current[7] = ref)}>
                    {clickedNumbers[7]}
                </button>
                <p className="item">{thirdProblem.secondMathSign}</p>
                <button 
                    className="tile"
                    ref={ref => (tileRefs.current[8] = ref)}>
                    {clickedNumbers[8]}
                </button>
                <p className="item">=</p>
                <p className="item result">{thirdProblem.result}</p>
            </div>
            <div id="inventory">
                {playNumbers.map((number, i) => (
                    <button
                        key={i}
                        className="tile"
                        >{number}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Game;