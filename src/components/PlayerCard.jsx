
import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
const PlayerCard = ({ player }) => {
  const [isInTeam, setIsInTeam] = useState(false)
  const { user, setUser,teamCount, setTeamCount } = useContext(UserContext);

  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/update/${id}`)
  }
  return (
    <div className="smoothie-card">
      <h3>{player.name}</h3>
      <p>{player.batting_style}</p>
      <p>Runs : {player.runs}</p>
      <div onClick={() => handleClick(player.id)}><p>edit</p></div>
      {/* <label htmlFor="isInTeam" className="checkbox-label">
          <input 
            type="checkbox" 
            id="isInTeam"
            checked={isInTeam}
            onChange={(e) => setIsInTeam(e.target.checked)}
          />
          Currently in Team
        </label> */}
        {user &&   <input 
            type="checkbox" 
            id="teamCount"
            value={teamCount}
            onClick={(e) => setTeamCount(teamCount + 1)}
          />}
        
      <div className="rating">{player.jersey_no}</div>
    </div>
  )
}

export default PlayerCard