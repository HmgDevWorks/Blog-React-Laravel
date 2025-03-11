import Post from './Post';
import './NewsCarousel.css';
import Loader from '../Loader/Loader';

export default function NewsCarousel({ newsItems }) {
    console.log(newsItems)
    return (
        <div className="carousel-news">
            {newsItems && newsItems.length > 0 ? (
                newsItems.map((item, index) => (
                    <Post
                        key={index}
                        item={item}
                        totalItems={newsItems.length}
                    />
                ))
            ) : (
                <Loader />
            )}
        </div>
    );
}
