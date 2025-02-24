import Post from './Post';
import './NewsCarousel.css';

export default function NewsCarousel({ newsItems }) {
    return (
        <div className="carousel-news">
            {newsItems.map((item, index) => (
                <Post key={index} item={item} index={index} totalItems={newsItems.length} />
            ))}
        </div>
    );
}
