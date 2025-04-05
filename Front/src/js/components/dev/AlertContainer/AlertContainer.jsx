import { useEffect, useState } from 'react';
import { ErrorAlert, SuccessAlert, InfoAlert } from '../Alerts/Alerts';

export default function AlertContainer({ alerts = [], onAlertEnd }) {
    const [localAlerts, setLocalAlerts] = useState([]);

    // Agrega nuevas alertas si no están ya en localAlerts
    useEffect(() => {
        if (alerts.length > 0) {
            const newAlerts = alerts.filter(
                (alert) => !localAlerts.some((localAlert) => localAlert.id === alert.id)
            );

            setLocalAlerts((prev) => [...prev, ...newAlerts]);
        }
    }, [alerts, localAlerts]); // Add localAlerts to the dependency array

    // Elimina cada alerta después de 3.5 segundos
    useEffect(() => {
        if (localAlerts.length === 0) return;

        localAlerts.forEach((alert) => {
            const timer = setTimeout(() => {
                setLocalAlerts((prev) => prev.filter((a) => a.id !== alert.id));
                if (onAlertEnd) {
                    onAlertEnd(alert); // Pass the removed alert to the parent
                }
            }, 3500);

            // Cleanup function to clear the timeout if the component unmounts or the alert is removed early
            return () => clearTimeout(timer);
        });
    }, [localAlerts, onAlertEnd]);

    return (
        <>
            {localAlerts.length > 0 && (
                <div className="w-full max-h-[175px] overflow-y-auto z-50 space-y-2 divide-y divide-transparent mb-4">
                    {localAlerts.map((alert) => (
                        <div key={alert.id}>
                            {alert.type === 'error' && <ErrorAlert msg={alert.text} />}
                            {alert.type === 'success' && <SuccessAlert msg={alert.text} />}
                            {alert.type === 'info' && <InfoAlert msg={alert.text} />}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
