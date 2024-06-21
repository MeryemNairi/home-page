import * as React from 'react';
import styles from './LatestNews.module.scss';

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { NewsItem, fetchLatestNewsData } from './Fetchdata/FetchData';
import { EventsItem, fetchLatestNewsData2 } from './Fetchdata2/FetchData2';

import { useEffect, useState } from 'react';
import CommentService from './CommentService/CommentService';



interface ILatestNewsProps {
    context: WebPartContext;

}

const LatestNews: React.FC<ILatestNewsProps> = (props: ILatestNewsProps) => {

    const [newsData, setNewsData] = useState<NewsItem[]>([])
    const [commentVisible, setCommentVisible] = React.useState<boolean[]>([]);
    const [commentText, setCommentText] = React.useState<string>('');



    const [events, setEvents] = React.useState<EventsItem[]>([]); // State to hold the fetched events
    const [currentIndex, setCurrentIndex] = React.useState(0); // State to track the current index

    // Fetch data on component mount
    React.useEffect(() => {
        async function fetchEvents() {
            try {
                const data = await fetchLatestNewsData2();
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
    //-------------------------------> the logic for the comment part <------------------------------




    const handleSubmitComment = async (index: number) => {
        try {
            if (!commentText.trim()) {
                alert('Please enter a comment.');
                return;
            }

            // Create an instance of the CommentService class
            const commentService = new CommentService();
            // Post the comment using the comment service
            await commentService.postComment(commentText);

            // Show system message (you can customize this according to your UI)
            alert('Comment submitted successfully!');

            // Reset the comment part
            const updatedCommentVisible = [...commentVisible];
            updatedCommentVisible[index] = false;
            setCommentVisible(updatedCommentVisible);
            setCommentText('');
        } catch (error) {
            console.error('Error submitting comment:', error);
            // Handle error (you can show an error message to the user)
            alert('Failed to submit comment. Please try again later.');
        }
    };




    //------------------------------->Fetching  Latest News Data <----------------

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchLatestNewsData();
            setNewsData(data);
        };
        fetchData();
    }, []);

    //------------------------------->scrolling behavior<----------------
    const cardsContainerRef = React.useRef<HTMLDivElement>(null);




    return (
        <div style={{ display: 'flex', gap: '10px', padding: '0 10px' , backgroundColor:'#FFFF'}}>
            <div style={{ flex: '0 0 40%', marginRight: '10px',marginBottom: '50px'  }}>
                <div className={styles.UpE_left}>
                    <div className={styles.cardContainer} >
                        {events.length > 0 && (
                            <div className={styles.card1} style={{ width: '100%', maxWidth: '500px', height: '350px'}} >
                                <div className={styles.card1}>
                                    <img src={events[currentIndex].ImgUrl} alt={events[currentIndex].Event} style={{ width: '100%' ,  height: '250px' }} />
                                </div>
                                <div className={styles.card1_content}>
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

                    
                </div>
            </div>
            <div className={styles.LatestNews}>
                <div className={styles.LatestNews_container}>
                    <div className={styles.LN_right}>
                        <div className={styles.LN_title}>
                            <div className={styles.LN_icon}>
                                <svg width="33" height="33" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="22" cy="22" r="22" fill="#00AB7B" />
                                    <g clip-path="url(#clip0_252_3)" filter="url(#filter0_d_252_3)">
                                        <path d="M32.0143 34H11.9857C11.6909 33.8735 11.3667 33.7928 11.1067 33.6152C10.3055 33.0609 10 32.2483 10 31.2985C10 25.5483 10 19.7981 10 14.0479C10 12.6864 10.9433 11.7311 12.3046 11.7231C12.8486 11.7204 13.3899 11.7231 13.9339 11.7231C14.0197 11.7231 14.1054 11.715 14.2072 11.7096C14.2072 11.1553 14.2099 10.6279 14.2072 10.0978C14.2046 9.66731 14.4082 9.35787 14.7834 9.18835C14.9978 9.09148 15.247 9.0296 15.4828 9.02152C16.0724 8.99731 16.6646 9.01076 17.2568 9.01614C18.0045 9.02152 18.4038 9.43321 18.4038 10.1893C18.4038 10.6925 18.4038 11.1957 18.4038 11.7123H25.5989C25.5989 11.1715 25.5989 10.6441 25.5989 10.1167C25.6016 9.47357 25.9875 9.04305 26.6226 9.02422C27.2952 9.00269 27.9678 8.99731 28.6405 9.02422C29.3828 9.05381 29.7928 9.51125 29.7928 10.2458C29.7928 10.4234 29.7928 10.6037 29.7928 10.7813C29.7928 11.088 29.7928 11.3921 29.7928 11.7258C29.916 11.7258 30.0018 11.7258 30.0902 11.7258C30.6503 11.7258 31.2077 11.7204 31.7678 11.7258C33.0246 11.7419 33.9946 12.6998 33.9973 13.951C34.0027 19.7658 34 25.5806 33.9973 31.398C33.9973 31.9362 33.8607 32.4393 33.5766 32.9049C33.2121 33.4995 32.6789 33.8439 32.0143 34.0027V34ZM32.7941 18.6733H11.2059C11.2059 18.7594 11.2059 18.8159 11.2059 18.8751C11.2059 23.0405 11.2059 27.2031 11.2059 31.3684C11.2059 31.4249 11.2059 31.4814 11.2059 31.5379C11.2434 32.3317 11.7204 32.7918 12.5056 32.7918C18.8486 32.7918 25.1916 32.7918 31.5373 32.7918C32.1778 32.7918 32.577 32.4932 32.7325 31.8743C32.778 31.6967 32.7914 31.5056 32.7914 31.32C32.7941 27.187 32.7914 23.0566 32.7914 18.9236C32.7914 18.8429 32.7914 18.7621 32.7914 18.6733H32.7941ZM29.7928 12.9231C29.7928 13.1034 29.7928 13.2541 29.7928 13.4075C29.7928 14.2228 29.2997 14.7206 28.477 14.7287C27.9008 14.734 27.3274 14.7314 26.7512 14.7287C26.0598 14.7233 25.6016 14.2605 25.5962 13.5609C25.5962 13.3537 25.5962 13.1465 25.5962 12.9366H18.3984C18.3984 13.1842 18.4038 13.4156 18.3984 13.6497C18.3796 14.2147 17.9428 14.7018 17.3988 14.7179C16.7182 14.7394 16.0375 14.7421 15.3569 14.7179C14.6789 14.6937 14.2099 14.169 14.2046 13.4882C14.2046 13.3052 14.2046 13.1196 14.2046 12.9258C13.4837 12.9258 12.803 12.9043 12.1251 12.9339C11.5918 12.9554 11.2032 13.4102 11.2032 13.9456C11.2032 15.0435 11.2032 16.1413 11.2032 17.2392C11.2032 17.301 11.2113 17.3629 11.2166 17.4302H32.7727C32.7807 17.3898 32.7914 17.3683 32.7914 17.3441C32.7914 16.1898 32.7995 15.0354 32.7914 13.8811C32.7861 13.3644 32.3412 12.9447 31.8079 12.9231C31.5989 12.9151 31.3872 12.9231 31.1755 12.9231C30.7253 12.9231 30.2724 12.9231 29.7928 12.9231ZM26.7566 10.2324V13.5097H28.5788V10.2297H26.7566V10.2324ZM15.4962 13.5097H17.1791V10.2378H15.4962V13.507V13.5097Z" fill="white" />
                                        <path d="M18.1223 29.9262C18.2349 29.2911 18.3501 28.6346 18.468 27.9807C18.5216 27.6767 18.5725 27.3726 18.6395 27.0713C18.6717 26.9179 18.6288 26.8156 18.5162 26.7107C17.8677 26.0972 17.2299 25.4702 16.5841 24.8567C16.3724 24.6576 16.2492 24.4289 16.3349 24.141C16.4233 23.845 16.6726 23.7508 16.9539 23.7078C17.8436 23.5786 18.7306 23.4387 19.6203 23.3149C19.7704 23.2934 19.8454 23.2261 19.907 23.097C20.301 22.2871 20.7029 21.4798 21.0942 20.6699C21.2228 20.4035 21.3943 20.1963 21.7132 20.2044C22.0187 20.2098 22.1822 20.4089 22.3081 20.6699C22.6994 21.4798 23.1067 22.2844 23.4979 23.0943C23.5649 23.2369 23.6507 23.2934 23.8061 23.3149C24.7038 23.4414 25.5989 23.5786 26.4966 23.7159C26.7619 23.7562 26.9816 23.8638 27.0674 24.1383C27.1558 24.4208 27.0406 24.6442 26.8396 24.8352C26.1965 25.4541 25.5587 26.0784 24.9075 26.6892C24.7708 26.8156 24.7387 26.9313 24.7708 27.1116C24.9343 27.9727 25.0951 28.8364 25.2344 29.7001C25.2639 29.8885 25.2478 30.1172 25.1647 30.2813C25.012 30.5881 24.6636 30.6365 24.2938 30.4455C23.4952 30.0311 22.6994 29.6167 21.9061 29.1916C21.7614 29.1136 21.6516 29.1082 21.5042 29.1862C20.6895 29.6221 19.8722 30.0499 19.0522 30.4724C18.5913 30.7092 18.1036 30.4266 18.1223 29.9208V29.9262ZM19.5426 28.8795C20.1616 28.5458 20.7244 28.2471 21.2844 27.935C21.5631 27.7789 21.8284 27.7735 22.1098 27.9296C22.619 28.2121 23.1335 28.4866 23.648 28.7637C23.7069 28.796 23.7686 28.8176 23.8543 28.8525C23.7632 28.3063 23.7203 27.7843 23.5837 27.2865C23.4122 26.6649 23.5676 26.2237 24.0607 25.8147C24.4466 25.4918 24.7494 25.0693 25.0897 24.6899C25.0817 24.7195 25.0147 24.698 24.945 24.6872C24.3528 24.6038 23.7605 24.515 23.1656 24.4397C22.9164 24.4074 22.7503 24.289 22.6404 24.063C22.3671 23.5006 22.0857 22.9436 21.807 22.3839C21.7775 22.3247 21.74 22.2682 21.6918 22.1848C21.3675 22.836 21.0567 23.4495 20.7538 24.0683C20.6574 24.2675 20.5153 24.3939 20.2983 24.4262C20.0491 24.4639 19.8025 24.4935 19.5533 24.5312C19.1165 24.593 18.6797 24.6576 18.2429 24.7222C18.2322 24.7437 18.2188 24.7653 18.2081 24.7895C18.2724 24.8352 18.3447 24.8756 18.4037 24.9321C18.8271 25.3357 19.2451 25.7447 19.6659 26.1483C19.8722 26.3447 19.9526 26.5735 19.8856 26.8533C19.8615 26.9475 19.8508 27.0443 19.8374 27.1412C19.7436 27.7009 19.6525 28.2606 19.5479 28.8821L19.5426 28.8795Z" fill="white" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_252_3" x="7" y="9" width="32" height="33" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset dx="1" dy="4" />
                                            <feGaussianBlur stdDeviation="2" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_252_3" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_252_3" result="shape" />
                                        </filter>
                                        <clipPath id="clip0_252_3">
                                            <rect width="24" height="25" fill="white" transform="translate(10 9)" />
                                        </clipPath>
                                    </defs>
                                </svg>


                            </div>
                            <div className={styles.LN_text}>
                                <p>Evénements à venir</p>
                            </div>
                        </div>
                        <div className={styles.LN_Cards} ref={cardsContainerRef}>
                            <div className={styles.cards_container2} >

                                {newsData.map((item, index) => (
                                    <div className={styles.card} key={index}>
                                        <div className={styles.C_top}>
                                            <p>news</p>
                                        </div>
                                        <div className={styles.C_content}>
                                            <div className={styles.CC_title}>
                                                <p>
                                                    {item.News}
                                                </p>
                                            </div>
                                            <div className={styles.CC_date}>
                                                <p>
                                                    {item.Date}
                                                </p>
                                            </div>
                                            <div className={styles.CC_Content}>
                                                <p>
                                                    {item.Description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={styles.card_button}>


                                            <a href={item.Link}> <button className={styles.CB_link}>
                                                <div>
                                                    <p>Votre avis compte</p>
                                                </div>
                                                <div>
                                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 3H12V5.5H3V8H9.3" stroke="white" stroke-width="0.2" />
                                                        <path d="M0.504395 13.4582V1.9947C0.504395 1.16654 1.17575 0.495178 2.00392 0.495178H12.5006C13.3287 0.495178 14.0001 1.16654 14.0001 1.9947V9.4923C14.0001 10.3205 13.3287 10.9918 12.5006 10.9918H4.22414C3.76861 10.9918 3.33778 11.1989 3.05321 11.5546L1.30553 13.7392C1.03988 14.0712 0.504395 13.8834 0.504395 13.4582Z" stroke="white" />
                                                    </svg>
                                                </div>

                                            </button></a>



                                        </div>

                                        {commentVisible[index] && (
                                            <div className={styles.CommentPart}>
                                                <textarea value={commentText} id={`subject_${index}`} name={`subject_${index}`} placeholder="Enter your comment..." style={{ height: '100px', fontSize: '11px' }} onChange={(e) => setCommentText(e.target.value)}></textarea>
                                                <button className={styles.CommentPart_btn} onClick={() => handleSubmitComment(index)}>Submit</button>
                                            </div>
                                        )}

                                    </div>
                                ))}





                            </div>

                        </div>
                        <div className={styles.btns_container}>
                            <button className={styles.btn_left} onClick={scrollLeft}>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.707 2.293C6.51947 2.10553 6.26516 2.00021 6 2.00021C5.73484 2.00021 5.48053 2.10553 5.293 2.293L0.793 6.793C0.605529 6.98053 0.500214 7.23484 0.500214 7.5C0.500214 7.76516 0.605529 8.01947 0.793 8.207L5.293 12.707C5.4816 12.8892 5.7342 12.99 5.9964 12.9877C6.2586 12.9854 6.50941 12.8802 6.69482 12.6948C6.88023 12.5094 6.9854 12.2586 6.98767 11.9964C6.98995 11.7342 6.88916 11.4816 6.707 11.293L4 8.5H13.5C13.7652 8.5 14.0196 8.39464 14.2071 8.20711C14.3946 8.01957 14.5 7.76522 14.5 7.5C14.5 7.23478 14.3946 6.98043 14.2071 6.79289C14.0196 6.60536 13.7652 6.5 13.5 6.5H4L6.707 3.707C6.89447 3.51947 6.99979 3.26516 6.99979 3C6.99979 2.73484 6.89447 2.48053 6.707 2.293Z" fill="#58C1A3" />
                                </svg>


                            </button>
                            <button className={styles.btn_right} onClick={scrollRight}>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.293 2.293C8.48053 2.10553 8.73484 2.00021 9 2.00021C9.26516 2.00021 9.51947 2.10553 9.707 2.293L14.207 6.793C14.3945 6.98053 14.4998 7.23484 14.4998 7.5C14.4998 7.76516 14.3945 8.01947 14.207 8.207L9.707 12.707C9.5184 12.8892 9.2658 12.99 9.0036 12.9877C8.7414 12.9854 8.49059 12.8802 8.30518 12.6948C8.11977 12.5094 8.0146 12.2586 8.01233 11.9964C8.01005 11.7342 8.11084 11.4816 8.293 11.293L11 8.5H1.5C1.23478 8.5 0.98043 8.39464 0.792893 8.20711C0.605357 8.01957 0.5 7.76522 0.5 7.5C0.5 7.23478 0.605357 6.98043 0.792893 6.79289C0.98043 6.60536 1.23478 6.5 1.5 6.5H11L8.293 3.707C8.10553 3.51947 8.00021 3.26516 8.00021 3C8.00021 2.73484 8.10553 2.48053 8.293 2.293Z" fill="#58C1A3" />
                                </svg>

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestNews;



