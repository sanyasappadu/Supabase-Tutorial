

import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'

// components
import PlayerCard from '../components/PlayerCard'
import { useContext } from "react";
import { UserContext } from '../UserContext';
const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [players, setPlayers] = useState(null)
  // const user = useContext(UserContext);
  const { user, setUser , teamCount} = useContext(UserContext);
  // const {teamCount , setTeamCount } = useState(0);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from('players')
        .select()
      
      if (error) {
        setFetchError('Could not fetch the smoothies')
        setPlayers(null)
      }
      if (data) {
        setPlayers(data)
        setFetchError(null)
      }
    }

    fetchPlayers()

  }, [])

  return (
    <div className="page home">
            <h2>{`Hello ${user} ${teamCount}again!`}</h2>
           
      {fetchError && (<p>{fetchError}</p>)}
      {players && (
        <div className="smoothies">
          {/* order-by buttons */}
          <div className="smoothie-grid">
            {players.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home



// import supabase from '../config/supabaseClient'
// import { useEffect, useState } from 'react'
// // components
// import SmoothieCard from '../components/SmoothieCard'

// const Home = () => {
//   const [fetchError, setFetchError] = useState(null)
//   const [smoothies, setSmoothies] = useState(null)
//   useEffect(() => {
//     const fetchSmoothies = async () => {
//       const { data, error } = await supabase
//         .from('recipes')
//         .select()
      
//       if (error) {
//         setFetchError('Could not fetch the smoothies')
//         setSmoothies(null)
//       }
//       if (data) {
//         setSmoothies(data)
//         setFetchError(null)
//       }
//     }
//     fetchSmoothies()
//   }, [])

//   return (
//     <div className="page home">
//       {fetchError && (<p>{fetchError}</p>)}
//       {smoothies && (
//         <div className="smoothies">
//           {/* order-by buttons */}
//           <div className="smoothie-grid">
//             {smoothies.map(smoothie => (
//               <SmoothieCard key={smoothie.id} smoothie={smoothie} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Home

