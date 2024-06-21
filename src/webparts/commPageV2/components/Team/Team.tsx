import * as React from 'react';
import styles from './Team.module.scss'; // Ensure this file is named correctly

const Team: React.FC = () => {
    return (
        <div className={styles.Team}>
            <div className={styles.Team_container}>
               <div className={styles.Team_title}>
                    <p>
                        Notre équipe <br /><span style={{fontSize:'24px', fontWeight:'700', color:'#044124'}}>équipe Communication</span>
                    </p>
               </div>
               <div className={styles.members}>
                    <div className={styles.member_card}>
                        <div className={styles.img_holder}>
                            <img src="" alt="" />
                        </div>
                        <div className={styles.name_function}>
                            <p>
                            Yousra Tounsi <br /><span style={{fontSize:'14px', fontWeight:'400', color:'#8FCFA7'}}>Communications Manager</span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.member_card}>
                        <div className={styles.img_holder}>
                            <img src="/sites/CnexiaForEveryone/Assets/Safae_Assa.jpg" alt="" />
                        </div>
                        <div className={styles.name_function}>
                            <p>
                                Safae Assa <br /><span style={{fontSize:'14px', fontWeight:'400', color:'#8FCFA7'}}>Chargée de communication</span>
                            </p>
                        </div>
                    </div>

                    <div className={styles.member_card}>
                        <div className={styles.img_holder}>
                            <img src="/sites/CnexiaForEveryone/Assets/Soufyane_Chdid.jpg" alt="" />
                        </div>
                        <div className={styles.name_function}>
                            <p>
                            Soufyane Chdid <br /><span style={{fontSize:'14px', fontWeight:'400', color:'#8FCFA7'}}>Graphic Designer</span>
                            </p>
                        </div>
                    </div>

                    <div className={styles.member_card}>
                        <div className={styles.img_holder}>
                            <img src="/sites/CnexiaForEveryone/Assets/Jalal.png" alt="" />
                        </div>
                        <div className={styles.name_function}>
                            <p>
                            Jalal Benaych<br /><span style={{fontSize:'14px', fontWeight:'400', color:'#8FCFA7'}}>Graphic Designer</span>
                            </p>
                        </div>
                    </div>

                    <div className={styles.member_card}>
                        <div className={styles.img_holder}>
                            <img src="" alt="" />
                        </div>
                        <div className={styles.name_function}>
                            <p>
                            Zineb Echihib<br /><span style={{fontSize:'14px', fontWeight:'400', color:'#8FCFA7'}}>Stagiaire chargée de communication</span>
                            </p>
                        </div>
                    </div>


               </div>
            </div>
        </div>
    );
};

export default Team;
