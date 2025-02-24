import { useState, useEffect } from 'react';
import NavigationMobile from "../NavigationMobile/NavigationMobile";
import NavigationPC from "../NavigationPC/NavigationPC";

const NavigationFinal = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {isMobile ? <NavigationMobile /> : <NavigationPC />}
        </>
    );
}

export default NavigationFinal;