import "./Box.css";

export default function Box({ title, children }) {
    return (
        <div className="rounded-lg shadow-lg p-4 parent-box">
            <h3 className="text-xl font-bold">{title}</h3>
            {children}
        </div>
    )
}