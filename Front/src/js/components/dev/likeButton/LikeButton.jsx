
import logo from "../../../../assets/favorito.svg";
import './LikeButton.css';

function LikeButton() {
    return (
        <button className="likeButton">
            <img src= {logo} alt="LikeButton" />
        </button>
    );
}
export default LikeButton;