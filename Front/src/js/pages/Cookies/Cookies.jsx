import React from 'react';
import './Cookies.css'; 
import { useTranslation } from 'react-i18next';


const Cookies = () => {
    const { t } = useTranslation();
    return (
        <div className="cookiesContainer">
            <h1>{t("cookies.title")}</h1>
            <p>{t("cookies.firstText")}</p>
            <div>
                <h2>{t("cookies.pointOne")}</h2>
                <p>{t("cookies.textOne")}</p>
            </div>

            <div>
                <h2>{t("cookies.pointTwo")}</h2>
                <ul>
                    <li><strong>{t("cookies.pointTwoA")}</strong>{t("cookies.textTwoA")}</li>
                    <li><strong>{t("cookies.pointTwoB")}</strong>{t("cookies.textTwoB")}</li>
                    <li><strong>{t("cookies.pointTwoC")}</strong>{t("cookies.textTwoC")}</li>
                    <li><strong>{t("cookies.pointTwoD")}</strong>{t("cookies.textTwoD")}</li>
                </ul>
            </div>

            <div>
                <h2>{t("cookies.pointThree")}</h2>
                <ul>
                    <li>{t("cookies.textThreeA")}</li>
                    <li>{t("cookies.textThreeB")}</li>
                    <li>{t("cookies.textThreeC")}</li>
                    <li>{t("cookies.textThreeD")}</li>
                </ul>
            </div>

            <div>
                <h2>{t("cookies.pointFour")}</h2>
                <p>{t("cookies.textFourA")}</p>
                <p>{t("cookies.textFourB")}</p>
            </div>

            <div>
                <h2>{t("cookies.pointFive")}</h2>
                <p>{t("cookies.textFive")}</p>
            </div>

            <div>
                <h2>{t("cookies.pointSix")}</h2>
                <p>{t("cookies.textSix")}</p>
            </div>

            <div>
                <h2>{t("cookies.pointSeven")}</h2>
                <p>{t("cookies.textSeven")}</p>
            </div>

            <div>
                <h2>{t("cookies.pointEight")}</h2>
                <p>{t("cookies.textEight")}<a href="mailto:info@cblog.es"> {t("cookies.mail")}</a> </p>          
            </div>
            {}
        </div>
    );
};

export default Cookies;
