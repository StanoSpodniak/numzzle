import {useState, useEffect} from "react";

const Game = ({ isGiveUp }) => {
    const [giveUp, setGiveUp] = useState("play");

    useEffect(() => {
        if(isGiveUp) {
            setGiveUp("You gave up");
        }
    },[isGiveUp]);

    return (
        <div>
            <p>{giveUp}</p>
        </div>
    )
}

export default Game;