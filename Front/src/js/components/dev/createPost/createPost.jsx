
import logo from "../../../../assets/escribir.svg";
import './CreatePost.css';

function CreatePost() {
    return (
        <button className="writeButton" onClick={() => {window.location.href = "/crearBlog"}}>
            <img src= {logo} alt="write" />
        </button>
    );
    
}
export default CreatePost;