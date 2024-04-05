import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

function getStar(value, compare){
    if(value >= compare)
        return <FaStar/>
    else if(value >= compare - 0.5)
        return <FaStarHalfAlt/>
    else
        return <FaRegStar/>
}

const Rating = ({ value, text }) => {
  return (
    <div className='rating'>
        <span>
            { getStar(value, 1) }
        </span>
        <span>
            { getStar(value, 2) }
        </span>
        <span>
            { getStar(value, 3) }
        </span>
        <span>
            { getStar(value, 4) }
        </span>
        <span>
            { getStar(value, 5) }
        </span>
        <span className="rating-text">{text}</span>
    </div>
  )
}
export default Rating