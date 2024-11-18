import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Update = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [name, setName] = useState('')
  const [battingStyle, setBattingStyle] = useState('')
  const [bowlingStyle, setBowlingStyle] = useState('')
  const [jerseyNo, setJerseyNo] = useState('')
  const [runs, setRuns] = useState('')
  const [wickets, setWickets] = useState('')
  const [isInTeam, setIsInTeam] = useState(false)
  const [primaryRole, setPrimaryRole] = useState('')
  const [secondaryRole, setSecondaryRole] = useState('')
  const [formError, setFormError] = useState(null)

  // Fetch existing player data
  useEffect(() => {
    const fetchPlayer = async () => {
      const { data, error } = await supabase
        .from('players')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setName(data.name)
        setBattingStyle(data.batting_style)
        setBowlingStyle(data.bowling_style)
        setJerseyNo(data.jersey_no)
        setRuns(data.runs)
        setWickets(data.wickets)
        setIsInTeam(data.is_in_team)
        setPrimaryRole(data.primary_role)
        setSecondaryRole(data.secondary_role)
      }
    }

    fetchPlayer()
  }, [id, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !battingStyle || !jerseyNo || !primaryRole) {
      setFormError('Please fill in all required fields.')
      return
    }

    const { data, error } = await supabase
      .from('players')
      .update({ 
        name, 
        batting_style: battingStyle,
        bowling_style: bowlingStyle,
        jersey_no: parseInt(jerseyNo),
        runs: parseInt(runs) || 0,
        wickets: parseInt(wickets) || 0,
        is_in_team: isInTeam,
        primary_role: primaryRole,
        secondary_role: secondaryRole
      })
      .eq('id', id)
      .select()

    if (error) {
      console.log(error)
      setFormError('Error updating player profile.')
    }
    if (data) {
      setFormError(null)
      navigate('/')
    }
  }

  return (
    <div className="page-create">
      <form onSubmit={handleSubmit} className="player-form">
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="battingStyle">Batting Style:</label>
        <select 
          id="battingStyle"
          value={battingStyle}
          onChange={(e) => setBattingStyle(e.target.value)}
          required
        >
          <option value="">Select Style</option>
          <option value="Right Handed">Right Handed</option>
          <option value="Left Handed">Left Handed</option>
        </select>

        <label htmlFor="bowlingStyle">Bowling Style:</label>
        <select 
          id="bowlingStyle"
          value={bowlingStyle}
          onChange={(e) => setBowlingStyle(e.target.value)}
        >
          <option value="">Select Style</option>
          <option value="Right-handed">Right-handed</option>
          <option value="Left-handed">Left-handed</option>
        </select>

        <label htmlFor="jerseyNo">Jersey Number:</label>
        <input 
          type="number" 
          id="jerseyNo"
          value={jerseyNo}
          onChange={(e) => setJerseyNo(e.target.value)}
          required
        />

        <label htmlFor="runs">Runs:</label>
        <input 
          type="number" 
          id="runs"
          value={runs}
          onChange={(e) => setRuns(e.target.value)}
        />

        <label htmlFor="wickets">Wickets:</label>
        <input 
          type="number" 
          id="wickets"
          value={wickets}
          onChange={(e) => setWickets(e.target.value)}
        />

        <label htmlFor="isInTeam" className="checkbox-label">
          <input 
            type="checkbox" 
            id="isInTeam"
            checked={isInTeam}
            onChange={(e) => setIsInTeam(e.target.checked)}
          />
          Currently in Team
        </label>

        <label htmlFor="primaryRole">Primary Role:</label>
        <select 
          id="primaryRole"
          value={primaryRole}
          onChange={(e) => setPrimaryRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="All Rounder">All Rounder</option>
          <option value="Wicket Keeper">Wicket Keeper</option>
        </select>

        <label htmlFor="secondaryRole">Secondary Role:</label>
        <select 
          id="secondaryRole"
          value={secondaryRole}
          onChange={(e) => setSecondaryRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="null">Null</option>
          <option value="captain">captain</option>
          <option value="vice captain">vice captain</option>
        </select>

        <button>Update Player Profile</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update
