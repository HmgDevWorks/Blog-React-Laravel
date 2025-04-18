import NavigationMobile from "../NavigationMobile/NavigationMobile";
import NavigationPC from "../NavigationPC/NavigationPC";
import useResize from '../../../bootstrap/hooks/useResize';
import { useContext } from "react";
import { AuthContext } from "../../../bootstrap/contexts/AuthContext";

const NavigationFinal = () => {
    const isMobile = useResize();
    const { loggedUser } = useContext(AuthContext)

    return (
        <>
            {isMobile ? <NavigationMobile /> : <NavigationPC />}
        </>
    );
}

export default NavigationFinal;