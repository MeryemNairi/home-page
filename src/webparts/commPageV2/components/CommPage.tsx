import * as React from 'react';
import styles from './CommPage.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import  { useEffect, useRef } from 'react';


import FirstBanner from './First Banner/FirstBanner';
import LatestNews from './LartestNews/LatestNews';
//import UpEvents from './Upcoming Events/UpEvents';
import Qlinks from './Quick Links/Qlinks';
import Footer from './NewFooter/Footer';
import Navbar from './Header/navbar';
import News from './NewsTicker/News';



const CommPage: React.FC<{ context: WebPartContext }> = ({ context }) => {
    const [showSavoirPlus, setShowSavoirPlus] = React.useState(false);
    const savoirPlusRef = useRef<HTMLDivElement>(null);

    const handleShowSavoirPlus = () => {
        setShowSavoirPlus(prevState => !prevState);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (savoirPlusRef.current && !savoirPlusRef.current.contains(event.target as Node)) {
            setShowSavoirPlus(false);
        }
    };

    useEffect(() => {
        if (showSavoirPlus) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSavoirPlus]);

    return (
        <div className={styles.CommPage}>
            <Navbar />
            <News />
            <FirstBanner onShowSavoirPlus={handleShowSavoirPlus} />
            <div
                ref={savoirPlusRef}
                className={`${styles.savoirPlusContainer} ${showSavoirPlus ? styles.savoirPlusEnterActive : styles.savoirPlusExitActive}`}
            >
            </div>
            <LatestNews context={context} />
            <Qlinks context={context} />
            <Footer />
        </div>
    );
};

export default CommPage;