import { useTranslation } from "react-i18next";

export default function Stat({ name, value }) {
    const { t } = useTranslation();
    return (
        <div className="stat">
            <div className="stat-value">{value}</div>
            <div className="stat-name">{t("counter." + name)}</div>
        </div>
    );
}