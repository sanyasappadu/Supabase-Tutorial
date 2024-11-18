import { useState , useEffect} from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const CreateTeam = () => {
  const navigate = useNavigate()
  const [user, setUser ] = useState(null); 
  const [teamName, setTeamName] = useState();
  const [player1, setPlayer1] = useState();

  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ( !setTeamName) {
      setFormError('Please fill in all required fields.')
      return
    }

    const { data, error } = await supabase
      .from('team')
      .insert([{
        team_name: teamName,
        player_1: player1,
      }])

    if (error) {
      console.log(error)
      setFormError('Error creating player profile.')
    }
    if (data) {
      setFormError(null)
      navigate('/')
    }
  }
  useEffect(() => {
    async function getSession() {
      const session = await supabase.auth.session();
      setUser(session?.user);
      if (session?.user) {
        console.log(session?.user.id);
      }
    }
    
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          setUser(session?.user);
          break;
        case "SIGNED_OUT":
          setUser(null);
          break;
        default:
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);
  console.log(user);

  return (
    <div className="page-create">
      {!user? <h1>plz login</h1>
      :
      <form onSubmit={handleSubmit} className="player-form">

      <label htmlFor="teamName">Team Name</label>


      <input 
          id="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
     <label htmlFor="player1">player1</label>


        <input 
            id="player1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            required
          />
      <button>Create Team</button>

      {formError && <p className="error">{formError}</p>}
    </form>
      }

    </div>
  )
}

export default CreateTeam