import * as React from 'react';
import styles from './FirstBanner.module.scss';
import { EventsItem, fetchLatestNewsData } from './Fetchdata/FetchData';




interface FirstBannerProps {
    onShowSavoirPlus: () => void;
}



const FirstBanner: React.FC<FirstBannerProps> = ({ onShowSavoirPlus }) => {
    const [events, setEvents] = React.useState<EventsItem[]>([]); // State to hold the fetched events
    const [currentIndex, setCurrentIndex] = React.useState(0); // State to track the current index

    React.useEffect(() => {
        async function fetchEvents() {
            try {
                const data = await fetchLatestNewsData();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }
        fetchEvents();
    }, []);

    const scrollLeft = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : events.length - 1));
    };

    const scrollRight = () => {
        setCurrentIndex((prevIndex) => (prevIndex < events.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <div style={{ display: 'flex', gap: '10px', padding: '0 10px' }}>
            <div style={{ flex: '0 0 60%', marginRight: '10px', width: '1000px ' }}>
                <div className={styles.UpE_left}>
                    <div style={{ marginBottom: '10px' }}></div>
                    <div className={styles.cardContainer} >
                        {events.length > 0 && (
                            <div className={styles.card} >
                                <div className={styles.card}>
                                    <img src={events[currentIndex].ImgUrl} alt={events[currentIndex].Event} style={{ width: '100%' }} />
                                </div>
                                <div className={styles.card_content}>
                                    <div className={styles.EvTitle}>
                                        <p>{events[currentIndex].Event}</p>
                                    </div>
                                    <div className={styles.EvDescription}>
                                        <p>{events[currentIndex].Desciption}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.controll_btns}>
                        <button className={styles.btn_left} onClick={scrollLeft}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.33684 8.00745L7.34001 12.0088M3.33684 8.00745L7.3382 4.00428M3.33684 8.00745L12.6755 8.00534" stroke="#044123" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className={styles.btn_right} onClick={scrollRight}>
                            <p>
                                Défilez
                            </p>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.6749 8.00745L8.67171 12.0088M12.6749 8.00745L8.67352 4.00428M12.6749 8.00745L3.33626 8.00534" stroke="#044123" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>






            <div style={{ flex: '0 0 40%', marginLeft: '10px', backgroundColor: '#fff', }}>
                <div style={{ marginBottom: '10px' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
                    <svg width="190" height="35" viewBox="0 0 212 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22" cy="22" r="22" fill="#00AB7B" />
                        <path d="M53.73 33V14.8H56.33V30.738H66.184V33H53.73ZM77.3575 33V30.088L77.2275 29.542V24.576C77.2275 23.5187 76.9155 22.704 76.2915 22.132C75.6848 21.5427 74.7662 21.248 73.5355 21.248C72.7208 21.248 71.9235 21.3867 71.1435 21.664C70.3635 21.924 69.7048 22.2793 69.1675 22.73L68.1275 20.858C68.8382 20.286 69.6875 19.8527 70.6755 19.558C71.6808 19.246 72.7295 19.09 73.8215 19.09C75.7108 19.09 77.1668 19.5493 78.1895 20.468C79.2122 21.3867 79.7235 22.7907 79.7235 24.68V33H77.3575ZM72.8335 33.156C71.8108 33.156 70.9095 32.9827 70.1295 32.636C69.3668 32.2893 68.7775 31.8127 68.3615 31.206C67.9455 30.582 67.7375 29.88 67.7375 29.1C67.7375 28.3547 67.9108 27.6787 68.2575 27.072C68.6215 26.4653 69.2022 25.98 69.9995 25.616C70.8142 25.252 71.9062 25.07 73.2755 25.07H77.6435V26.864H73.3795C72.1315 26.864 71.2908 27.072 70.8575 27.488C70.4242 27.904 70.2075 28.4067 70.2075 28.996C70.2075 29.672 70.4762 30.218 71.0135 30.634C71.5508 31.0327 72.2962 31.232 73.2495 31.232C74.1855 31.232 75.0002 31.024 75.6935 30.608C76.4042 30.192 76.9155 29.5853 77.2275 28.788L77.7215 30.504C77.3922 31.3187 76.8115 31.9687 75.9795 32.454C75.1475 32.922 74.0988 33.156 72.8335 33.156ZM89.0746 33.156C87.6879 33.156 86.6132 32.7833 85.8506 32.038C85.0879 31.2927 84.7066 30.2267 84.7066 28.84V16.204H87.2026V28.736C87.2026 29.4813 87.3846 30.0533 87.7486 30.452C88.1299 30.8507 88.6672 31.05 89.3606 31.05C90.1406 31.05 90.7906 30.8333 91.3106 30.4L92.0906 32.194C91.7092 32.5233 91.2499 32.766 90.7126 32.922C90.1926 33.078 89.6466 33.156 89.0746 33.156ZM82.3666 21.274V19.22H91.1546V21.274H82.3666ZM100.787 33.156C99.3138 33.156 98.0138 32.8527 96.8872 32.246C95.7778 31.6393 94.9112 30.8073 94.2872 29.75C93.6805 28.6927 93.3772 27.4793 93.3772 26.11C93.3772 24.7407 93.6718 23.5273 94.2612 22.47C94.8678 21.4127 95.6912 20.5893 96.7312 20C97.7885 19.3933 98.9758 19.09 100.293 19.09C101.628 19.09 102.806 19.3847 103.829 19.974C104.852 20.5633 105.649 21.3953 106.221 22.47C106.81 23.5273 107.105 24.7667 107.105 26.188C107.105 26.292 107.096 26.4133 107.079 26.552C107.079 26.6907 107.07 26.8207 107.053 26.942H95.3272V25.148H105.753L104.739 25.772C104.756 24.888 104.574 24.0993 104.193 23.406C103.812 22.7127 103.283 22.1753 102.607 21.794C101.948 21.3953 101.177 21.196 100.293 21.196C99.4265 21.196 98.6552 21.3953 97.9792 21.794C97.3032 22.1753 96.7745 22.7213 96.3932 23.432C96.0118 24.1253 95.8212 24.9227 95.8212 25.824V26.24C95.8212 27.1587 96.0292 27.982 96.4452 28.71C96.8785 29.4207 97.4765 29.9753 98.2392 30.374C99.0018 30.7727 99.8772 30.972 100.865 30.972C101.68 30.972 102.416 30.8333 103.075 30.556C103.751 30.2787 104.34 29.8627 104.843 29.308L106.221 30.92C105.597 31.648 104.817 32.2027 103.881 32.584C102.962 32.9653 101.931 33.156 100.787 33.156ZM114.523 33.156C113.379 33.156 112.287 33 111.247 32.688C110.224 32.376 109.418 31.9947 108.829 31.544L109.869 29.568C110.458 29.9667 111.186 30.3047 112.053 30.582C112.92 30.8593 113.804 30.998 114.705 30.998C115.866 30.998 116.698 30.8333 117.201 30.504C117.721 30.1747 117.981 29.7153 117.981 29.126C117.981 28.6927 117.825 28.3547 117.513 28.112C117.201 27.8693 116.785 27.6873 116.265 27.566C115.762 27.4447 115.199 27.3407 114.575 27.254C113.951 27.15 113.327 27.0287 112.703 26.89C112.079 26.734 111.507 26.526 110.987 26.266C110.467 25.9887 110.051 25.616 109.739 25.148C109.427 24.6627 109.271 24.0213 109.271 23.224C109.271 22.392 109.505 21.664 109.973 21.04C110.441 20.416 111.1 19.9393 111.949 19.61C112.816 19.2633 113.838 19.09 115.017 19.09C115.918 19.09 116.828 19.2027 117.747 19.428C118.683 19.636 119.446 19.9393 120.035 20.338L118.969 22.314C118.345 21.898 117.695 21.612 117.019 21.456C116.343 21.3 115.667 21.222 114.991 21.222C113.899 21.222 113.084 21.404 112.547 21.768C112.01 22.1147 111.741 22.5653 111.741 23.12C111.741 23.588 111.897 23.952 112.209 24.212C112.538 24.4547 112.954 24.6453 113.457 24.784C113.977 24.9227 114.549 25.044 115.173 25.148C115.797 25.2347 116.421 25.356 117.045 25.512C117.669 25.6507 118.232 25.85 118.735 26.11C119.255 26.37 119.671 26.734 119.983 27.202C120.312 27.67 120.477 28.294 120.477 29.074C120.477 29.906 120.234 30.6253 119.749 31.232C119.264 31.8387 118.579 32.3153 117.695 32.662C116.811 32.9913 115.754 33.156 114.523 33.156ZM128.328 33.156C126.942 33.156 125.867 32.7833 125.104 32.038C124.342 31.2927 123.96 30.2267 123.96 28.84V16.204H126.456V28.736C126.456 29.4813 126.638 30.0533 127.002 30.452C127.384 30.8507 127.921 31.05 128.614 31.05C129.394 31.05 130.044 30.8333 130.564 30.4L131.344 32.194C130.963 32.5233 130.504 32.766 129.966 32.922C129.446 33.078 128.9 33.156 128.328 33.156ZM121.62 21.274V19.22H130.408V21.274H121.62ZM141.709 33V14.8H143.841L155.879 29.75H154.761V14.8H157.361V33H155.229L143.191 18.05H144.309V33H141.709ZM168.58 33.156C167.107 33.156 165.807 32.8527 164.68 32.246C163.571 31.6393 162.704 30.8073 162.08 29.75C161.473 28.6927 161.17 27.4793 161.17 26.11C161.17 24.7407 161.465 23.5273 162.054 22.47C162.661 21.4127 163.484 20.5893 164.524 20C165.581 19.3933 166.769 19.09 168.086 19.09C169.421 19.09 170.599 19.3847 171.622 19.974C172.645 20.5633 173.442 21.3953 174.014 22.47C174.603 23.5273 174.898 24.7667 174.898 26.188C174.898 26.292 174.889 26.4133 174.872 26.552C174.872 26.6907 174.863 26.8207 174.846 26.942H163.12V25.148H173.546L172.532 25.772C172.549 24.888 172.367 24.0993 171.986 23.406C171.605 22.7127 171.076 22.1753 170.4 21.794C169.741 21.3953 168.97 21.196 168.086 21.196C167.219 21.196 166.448 21.3953 165.772 21.794C165.096 22.1753 164.567 22.7213 164.186 23.432C163.805 24.1253 163.614 24.9227 163.614 25.824V26.24C163.614 27.1587 163.822 27.982 164.238 28.71C164.671 29.4207 165.269 29.9753 166.032 30.374C166.795 30.7727 167.67 30.972 168.658 30.972C169.473 30.972 170.209 30.8333 170.868 30.556C171.544 30.2787 172.133 29.8627 172.636 29.308L174.014 30.92C173.39 31.648 172.61 32.2027 171.674 32.584C170.755 32.9653 169.724 33.156 168.58 33.156ZM181.022 33L175.9 19.22H178.266L182.816 31.7H181.698L186.43 19.22H188.536L193.164 31.7H192.072L196.726 19.22H198.962L193.814 33H191.422L187.08 21.612H187.808L183.414 33H181.022ZM205.269 33.156C204.125 33.156 203.033 33 201.993 32.688C200.971 32.376 200.165 31.9947 199.575 31.544L200.615 29.568C201.205 29.9667 201.933 30.3047 202.799 30.582C203.666 30.8593 204.55 30.998 205.451 30.998C206.613 30.998 207.445 30.8333 207.947 30.504C208.467 30.1747 208.727 29.7153 208.727 29.126C208.727 28.6927 208.571 28.3547 208.259 28.112C207.947 27.8693 207.531 27.6873 207.011 27.566C206.509 27.4447 205.945 27.3407 205.321 27.254C204.697 27.15 204.073 27.0287 203.449 26.89C202.825 26.734 202.253 26.526 201.733 26.266C201.213 25.9887 200.797 25.616 200.485 25.148C200.173 24.6627 200.017 24.0213 200.017 23.224C200.017 22.392 200.251 21.664 200.719 21.04C201.187 20.416 201.846 19.9393 202.695 19.61C203.562 19.2633 204.585 19.09 205.763 19.09C206.665 19.09 207.575 19.2027 208.493 19.428C209.429 19.636 210.192 19.9393 210.781 20.338L209.715 22.314C209.091 21.898 208.441 21.612 207.765 21.456C207.089 21.3 206.413 21.222 205.737 21.222C204.645 21.222 203.831 21.404 203.293 21.768C202.756 22.1147 202.487 22.5653 202.487 23.12C202.487 23.588 202.643 23.952 202.955 24.212C203.285 24.4547 203.701 24.6453 204.203 24.784C204.723 24.9227 205.295 25.044 205.919 25.148C206.543 25.2347 207.167 25.356 207.791 25.512C208.415 25.6507 208.979 25.85 209.481 26.11C210.001 26.37 210.417 26.734 210.729 27.202C211.059 27.67 211.223 28.294 211.223 29.074C211.223 29.906 210.981 30.6253 210.495 31.232C210.01 31.8387 209.325 32.3153 208.441 32.662C207.557 32.9913 206.5 33.156 205.269 33.156Z" fill="black" />
                        <path d="M12.6668 14.5H10.3335V32C10.3335 33.375 11.3835 34.5 12.6668 34.5H29.0002V32H12.6668V14.5ZM31.3335 9.5H17.3335C16.0502 9.5 15.0002 10.625 15.0002 12V27C15.0002 28.375 16.0502 29.5 17.3335 29.5H31.3335C32.6168 29.5 33.6668 28.375 33.6668 27V12C33.6668 10.625 32.6168 9.5 31.3335 9.5ZM31.3335 27H17.3335V12H31.3335V27ZM19.6668 18.25H29.0002V20.75H19.6668V18.25ZM19.6668 22H24.3335V24.5H19.6668V22ZM19.6668 14.5H29.0002V17H19.6668V14.5Z" fill="white" />
                    </svg>

                </div>
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="card" style={{ width: '400px', minHeight: '80px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', backgroundColor: 'transparent', marginBottom: '10px', transition: 'transform 0.5s', fontFamily: 'Montserrat, sans-serif' }}>
                            <div style={{ fontSize: '16px', color: '#044123', fontFamily: 'Montserrat' }}>Texte de la carte 1 te de la carte  te de la carte </div>
                        </div>

                        <div className="card" style={{ width: '400px', minHeight: '80px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', backgroundColor: 'transparent', marginBottom: '10px', transition: 'transform 0.5s', fontFamily: 'Montserrat, sans-serif' }}>
                            <div style={{ fontSize: '16px', color: '#044123', fontFamily: 'Montserrat' }}>Texte de la carte 2 te de la carte  te de la carte  te de la carte </div>
                        </div>

                        <div className="card" style={{ width: '400px', minHeight: '80px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', backgroundColor: 'transparent', marginBottom: '10px', transition: 'transform 0.5s', fontFamily: 'Montserrat, sans-serif' }}>
                            <div style={{ fontSize: '16px', color: '#044123', fontFamily: 'Montserrat' }}>Texte de la carte 3 te de la carte te de la carte </div>
                        </div>

                        <div className="card" style={{ width: '400px', minHeight: '80px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', backgroundColor: 'transparent', marginBottom: '10px', transition: 'transform 0.5s', fontFamily: 'Montserrat, sans-serif' }}>
                            <div style={{ fontSize: '16px', color: '#044123', fontFamily: 'Montserrat' }}>Texte de la carte 4te de la carte  te de la carte  te de la carte </div>
                        </div>

                        
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FirstBanner;
