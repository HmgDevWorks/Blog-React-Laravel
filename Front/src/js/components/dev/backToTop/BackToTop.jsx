
import logo from "../../../../assets/flecha_scroll.svg";
import './BackToTop.css';

function BackToTop() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <button className="backtoTopButton" onClick={scrollToTop}>
            <img src= {logo} alt="backToTop" />
        </button>
    );
}
export default BackToTop;