import NavigationMobile from "../NavigationMobile/NavigationMobile";
import NavigationPC from "../NavigationPC/NavigationPC";
import useResize from '../../../bootstrap/hooks/useResize';

const NavigationFinal = () => {
    const isMobile = useResize();
    return (
        <>
            {isMobile ? <NavigationMobile /> : <NavigationPC />}
        </>
    );
}

export default NavigationFinal;