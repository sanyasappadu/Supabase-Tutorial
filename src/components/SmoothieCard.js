import { useNavigate } from "react-router-dom";

const SmoothieCard = ({ smoothie }) => {
  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/update/${id}`)
  }
  return (
    <div className="smoothie-card" onClick={() => handleClick(smoothie.id)}>
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
    </div>
  )
}

export default SmoothieCard

