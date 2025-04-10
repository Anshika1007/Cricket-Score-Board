
import React, { useState, useEffect  } from "react";

const rcbPlayers = [
  "Faf du Plessis", "Virat Kohli", "Glenn Maxwell", "Dinesh Karthik", "Cameron Green",
  "Rajat Patidar", "Mohammed Siraj", "Reece Topley", "Karn Sharma", "Will Jacks", "Lockie Ferguson"
];

const miPlayers = [
  "Rohit Sharma", "Ishan Kishan", "Suryakumar Yadav", "Hardik Pandya", "Tilak Varma",
  "Tim David", "Jasprit Bumrah", "Piyush Chawla", "Gerald Coetzee", "Shreyas Gopal", "Akash Madhwal"
];

const CricketScoreApp = () => {
  const [teamScore, setTeamScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);
  const [extras, setExtras] = useState(0);

  const [currentBatsmen, setCurrentBatsmen] = useState([
    { name: rcbPlayers[0], runs: 0, balls: 0 },
    { name: rcbPlayers[1], runs: 0, balls: 0 }
  ]);
  const [onStrike, setOnStrike] = useState(0);
  const [currentBowler, setCurrentBowler] = useState(miPlayers[6]);

  
  const [showBatsmanModal, setShowBatsmanModal] = useState(false);
  const [showBowlerModal, setShowBowlerModal] = useState(false);
  const [nextBatsman, setNextBatsman] = useState("");
  const [nextBowler, setNextBowler] = useState("");
  const [fallenBatsmen, setFallenBatsmen] = useState([]);
  


  const handleRun = (runs) => {
    if (overs === 20) return;

    setTeamScore(teamScore + runs);

    const newBatsmen = [...currentBatsmen];
    newBatsmen[onStrike].runs += runs;
    newBatsmen[onStrike].balls += 1;
    setCurrentBatsmen(newBatsmen);

    if (runs % 2 !== 0) setOnStrike(onStrike === 0 ? 1 : 0);

    setBalls(balls + 1);
    if (balls + 1 === 6) {
      setBalls(0);
      setOvers(overs + 1);
      setShowBowlerModal(true);
    }
  };

  const handleWideOrNoBall = () => {
    setTeamScore(teamScore + 1);
    setExtras(extras + 1);
  };

  
  const handleOut = () => {
    if (wickets < 10) {
      setWickets(wickets + 1);
      setFallenBatsmen([...fallenBatsmen, currentBatsmen[onStrike].name]);
      setShowBatsmanModal(true);
    }
  };

  
  const handleNextBatsman = (player) => {
    if (player) {
      setCurrentBatsmen([{ ...currentBatsmen[1] }, { name: player, runs: 0, balls: 0 }]);
      setShowBatsmanModal(false);
      setNextBatsman("");  // Reset next batsman selection
    }
  };
  

 
  const handleNextBowler = (player) => {
    if (player) {
      setCurrentBowler(player);
      setShowBowlerModal(false);
      setNextBowler(""); // Reset next bowler selection
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🏏 Cricket Scoreboard</h1>
     
      <div className="flex justify-center items-start gap-8">
        {/* Mumbai Indians Player List */}
        <div className="bg-blue-700 p-4 rounded-lg w-1/4 text-center shadow-lg">
          <h2 className="text-xl font-semibold">Mumbai Indians</h2>
          <ul className="mt-3 space-y-2">
            {miPlayers.map((player) => (
              <li key={player} className={`${player === currentBowler ? "font-bold text-yellow-300" : ""}`}>
                {player} {player === currentBowler ? "⚾ (Bowling)" : ""}
              </li>
            ))}
          </ul>
        </div>

        {/* Scoreboard */}
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-1/3 border-2 border-gray-600">
          <h2 className="text-2xl font-bold mb-3">🏏 RCB Batting</h2>
          <div className="text-xl font-semibold mb-2">
            Score: <span className="text-green-400">{teamScore}</span> / {wickets}
          </div>
          <div className="text-lg mb-2">Overs: {overs}.{balls} / 20</div>
          <div className="text-lg mb-2">Run Rate: {(teamScore / (overs + balls / 6)).toFixed(2)}</div>
          <div className="text-lg mb-2">Extras: <span className="text-yellow-400">{extras}</span></div>

          <h3 className="font-semibold text-lg">Current Batsmen:</h3>
          {currentBatsmen.map((batsman, index) => (
            <div key={batsman.name} className={`text-lg ${onStrike === index ? "text-green-300 font-bold" : ""}`}>
              {index === 0 ? "Batsman 1" : "Batsman 2"}: {batsman.name} - {batsman.runs} ({batsman.balls}) {onStrike === index && "🏏"}
            </div>
          ))}

          <h3 className="font-semibold text-lg mt-3">
  Current Bowler: <span className="text-red-300">{currentBowler} ⚾</span>
</h3>
         
          
          <h3 className="text-red-400 font-bold mt-4">Wickets:</h3>
          <ul>
            {fallenBatsmen.map(player => (
              <li key={player} className="text-red-500">{player} ❌</li>
            ))}
          </ul>
        </div>

        {/* RCB Player List */}
        <div className="bg-red-700 p-4 rounded-lg w-1/4 text-center shadow-lg">
          <h2 className="text-xl font-semibold">Royal Challengers Bangalore</h2>
          <ul className="mt-3 space-y-2">
            {rcbPlayers.map((player) => (
              <li key={player} className={`${currentBatsmen.some(b => b.name === player) ? "font-bold text-green-300" : ""}`}>
                {player} {currentBatsmen.some(b => b.name === player) ? "🏏 (Batting)" : ""}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Score Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {[1, 2, 3, 4, 6].map((run) => (
          <button key={run} onClick={() => handleRun(run)} className="bg-yellow-500 px-4 py-2 rounded shadow-lg text-lg">
            +{run} Runs
          </button>
        ))}
        
        <button onClick={handleWideOrNoBall} className="bg-purple-500 px-4 py-2 rounded shadow-lg text-lg"> No Ball (+1)</button>
        <button onClick={handleWideOrNoBall} className="bg-purple-500 px-4 py-2 rounded shadow-lg text-lg">Wide (+1)</button>
        <button onClick={handleOut} className="bg-red-500 px-4 py-2 rounded shadow-lg text-lg">Out</button>
      </div>

      {/* Next Batsman Modal */}
      {showBatsmanModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-1/3 text-center">
            <h2 className="text-2xl font-bold mb-4">Select Next Batsman</h2>
            <div className="grid grid-cols-2 gap-3">
              {rcbPlayers.map(player => (
                !currentBatsmen.some(b => b.name === player) && (
                  <button
  key={player}
  className="bg-red-600 hover:bg-red-400 px-4 py-2 rounded transition-all"
  onClick={() => handleNextBatsman(player)}
>
  {player}
</button>

                )
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Next Bowler Modal */}
      {showBowlerModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-1/3 text-center">
            <h2 className="text-2xl font-bold mb-4">Select Next Bowler</h2>
            <div className="grid grid-cols-2 gap-3">
              {miPlayers.map(player => (
                player !== currentBowler && (
                  <button
  key={player}
  className="bg-blue-600 hover:bg-blue-400 px-4 py-2 rounded transition-all"
  onClick={() => handleNextBowler(player)}
>
  {player}
</button>

                )
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CricketScoreApp;
