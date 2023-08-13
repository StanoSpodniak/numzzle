import {useState, useEffect} from "react";
import Game from "./Game/Game";
import "./main.css";

const Main = () => {
    const [showRules, setShowRules] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const [newGame, setNewGame] = useState(false);
    const [giveUp, setGiveUp] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.addEventListener('click', handleClickOutsidePanel);
    
        return () => {
          document.removeEventListener('click', handleClickOutsidePanel);
        };
    }, []);

    const handleStyleToggle = () => {
        setDarkMode(darkMode => !darkMode);
    };

    const handleRules = () => {
        if(showSettings) {
            setShowSettings(false);
        }
        setShowRules(showRules => !showRules);
    };

    const handleSettings = () => {
        if(showRules) {
            setShowRules(false);
        }
        setShowSettings(showSettings => !showSettings);
    };

    const handleClose = () => {
        setShowRules(false);
        setShowSettings(false);
    }

    const handleClickOutsidePanel = (event) => {
        const rulesButton = document.getElementById("question-icon");
        const settingsButton = document.getElementById("settings-icon");
        const panel = document.getElementsByClassName("panel");

        if (event.target !== rulesButton) {
            if (event.target !== settingsButton) {
                if (panel[0] && !panel[0].contains(event.target)) {
                    setShowRules(false);
                    setShowSettings(false);
                }
            }
        }
    }

    const handleNewGame = () => {
        setNewGame(true);
        setShowSettings(false);

        setTimeout(() => {
            setNewGame(false);
        }, 1000);
    }

    const handleGiveUp = () => {
        setGiveUp(true);
        setShowSettings(false);

        
        setTimeout(() => {
            setGiveUp(false);
        }, 1000);
    }

    return (
        <div id="main-container" className={darkMode ? "dark" : "default"}>
            <div id="nav" className={darkMode ? "dark-nav" : "default-nav"}>
                <h1 id="title">Numzzle</h1>
                <img id="question-icon" src="icons/question.png" alt="question mark" onClick={handleRules} />
                <img id="settings-icon" src="icons/settings.png" alt="settings" onClick={handleSettings} />
            </div>
            <div id="main-content">
                {showRules && 
                    <div className="panel">
                        <img id="close-icon" src="icons/close.png" alt="close" onClick={handleClose} />
                        <h2>How To Play?</h2>
                        <h3>Solve three mathematical equations.</h3>
                        <div id="rules">
                            <ol>
                                <li><span style={{ fontWeight: "600" }}>Click</span> on the numbers to complete the equation.</li>
                                <li>You can remove a number from the equation by clicking it.</li>
                                <li>Each number can only be used once.</li>
                                <li>After all equations have been completed. Submit your solution. If it is correct, the numbers will turn <span style={{ color: "#189a18" }}>green</span> and you can tackle a new problem. If not the numbers of the incorrect equations will be <span style={{ color: "#e60000" }}>red</span>.</li>
                                <li>There are no set attempts to solve. You can play <span style={{ fontWeight: "600" }}>without limits</span> and solve as many math problems as you want.</li>
                            </ol>
                        </div>
                    </div>
                }
                {showSettings &&
                    <div className="panel">
                        <img id="close-icon" src="icons/close.png" alt="close" onClick={handleClose} />
                        <h2>Options</h2>
                        <button onClick={handleStyleToggle}>Dark Mode</button>
                        <button onClick={handleNewGame}>New Game</button>
                        <button onClick={handleGiveUp}>Show solution</button>
                    </div>
                }
                <Game isNewGame={newGame} isGiveUp={giveUp} />
            </div>
        </div>
    );
}

export default Main;
