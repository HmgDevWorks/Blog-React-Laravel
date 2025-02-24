
import logo from "../../../../assets/favorito.svg";
import './LikeButton.css';

function LikeButton() {
    const like = () => {
        console.log('Like');
    };
    return (
        <button className="likeButton" onClick={like}>
            <img src= {logo} alt="LikeButton" />
        </button>
    );
}
export default LikeButton;
