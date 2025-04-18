import AuthorResult from '../AuthorResult/AuthorResult.jsx';
import PostResult from '../PostResult/PostResult.jsx';
import "./ResultItem.css";

const ResultItem = ({ result, idx, selectedButton, navigate, isMobile, t }) => {
    const handleClick = () => {
        const path = selectedButton === 'Autor' ? `/author/${result.id}` : `/postDetails/${result.id}`;
        navigate(path);
    };

    return (
        <div
            className={`${idx % 2 === 0 ? 'finder-result-item' : 'finder-result-item2'
                } ${idx >= 1 ? 'borderArticle' : ''}`}
            onClick={handleClick}
        >
            {selectedButton === 'Autor' ? (
                <AuthorResult result={result} t={t} />
            ) : (
                <PostResult result={result} isMobile={isMobile} t={t} />
            )}
        </div>
    );
};

export default ResultItem;
