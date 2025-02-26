import { useState } from "react";
import logo1 from "../../../../assets/favorito.svg";
import logo2 from "../../../../assets/favoritoMarcado.svg";
import "./LikeButton.css";

function LikeButton() {
    const [isLiked, setIsLiked] = useState(false);

    const Like = () => {
        setIsLiked(!isLiked);
        console.log(isLiked ? "Dislike" : "Like");
    };

    return (
        <button className="likeButton" onClick={Like}>
            <img src={isLiked ? logo1 : logo2} alt="LikeButton" />
        </button>
    );
}

export default LikeButton;
