
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/escribir.svg";
import './CreatePost.css';

function CreatePost() {
    const navigate = useNavigate();
    return (
        <button className="writeButton" onClick={() => { navigate("/createPost") }}>
            <img src={logo} alt="write" />
        </button>
    );

}
export default CreatePost;