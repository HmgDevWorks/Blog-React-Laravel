import React from 'react';
import './Privacy.css'; 
import { useTranslation } from 'react-i18next';

const Privacy = () => {
    const { t } = useTranslation();
    
    return (
        <div className="privacyContainer">
            <h1>{t("policy.title")}</h1>
            <p>{t("policy.firstText")}</p>
            <div>
                <h2>{t("policy.pointOne")}</h2>
                <p>{t("policy.textOne")}</p>
                <ul>
                    <li>{t("policy.textOneA")}</li>
                    <li>{t("policy.textOneB")}</li>
                    <li>{t("policy.textOneC")}</li>
                </ul>
            </div>

            <div>
                <h2>{t("policy.pointTwo")}</h2>
                <p>{t("policy.textTwo")}</p>
                <ul>
                    <li>{t("policy.textTwoA")}</li>
                    <li>{t("policy.textTwoB")}</li>
                    <li>{t("policy.textTwoC")}</li>
                    <li>{t("policy.textTwoD")}</li>
                </ul>
            </div>

            <div>
                <h2>{t("policy.pointThree")}</h2>
                <p>{t("policy.textTwoA")}</p>
                <p>{t("policy.textTwoB")}</p>
            </div>

            <div>
                <h2>{t("policy.pointFour")}</h2>
                <p>{t("policy.textFour")}</p>
                <ul>
                    <li>{t("policy.textFourA")}</li>
                    <li>{t("policy.textFourB")}</li>
                </ul>
            </div>

            <div>
                <h2>{t("policy.pointFive")}</h2>
                <p>{t("policy.textFive")}<a href="mailto:info@cblog.com"></a>{t("policy.mail")}</p>
            </div>

            <div>
                <h2>{t("policy.pointSix")}</h2>
                <p>{t("policy.textSix")}</p>
            </div>

            <div>
                <h2>{t("policy.pointSeven")}</h2>
                <p>{t("policy.textSeven")}</p>
            </div>

            <div>
                <h2>{t("policy.pointEight")}</h2>
                <p>{t("policy.textEight")}</p>
            </div>

            <div>
                <h2>{t("policy.pointNine")}</h2>
                <p>{t("policy.textNine")}<a href="mailto:info@cblog.com">{t("policy.mail")}</a></p>
            </div>
        {}
        </div>
    );
};

export default Privacy;
