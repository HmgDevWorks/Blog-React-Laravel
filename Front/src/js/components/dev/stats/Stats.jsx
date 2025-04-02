import Stat from './Stat';
import './Stats.css';

export default function Stats({ stats }) {
    const statsArray = Object.entries(stats);

    return (
        <div className="stats">
            {statsArray.map(([name, value], index) => (
                <Stat key={index} name={name} value={value} />
            ))}
        </div>
    );
}