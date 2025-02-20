import './Category.css';

export default function Category({ title, imageUrl }) {
    return (
        <div className="relative category-container">
            <a href={`#${title}`}>
                <img
                    src={imageUrl}
                    alt={title}
                    className="grayscale w-full"
                />
            </a>
            <div className="absolute bottom-0 left-0 right-0  bg-black bg-opacity-50 text-custom-color text-center p-2">
                {title}
            </div>
        </div>
    );
}
