import "./AuthorResult.css";

const AuthorResult = ({ result, t }) => (
    <div className="result-content grid grid-cols-12 gap-1">
        <div className="col-span-4 flex items-center tooltip tooltip-bottom" data-tip={t('postFinder.byAuthor')} title={t('postFinder.byAuthor')}>
            <span className="icon">👤</span>
            <span className="text ml-1 font-bold">{result.name_user}</span>
        </div>
        <div className="col-span-4 text tooltip tooltip-bottom" data-tip={t('postFinder.views')} title={t('postFinder.views')}>
            <span className="icon">👁️</span> {result.total_visits}
        </div>
        <div className="col-span-4 text tooltip tooltip-bottom" data-tip={t('postFinder.category')} title={t('postFinder.category')}>
            {t('postFinder.feature')} <strong>{result.most_used_category}</strong>
        </div>
    </div>
);

export default AuthorResult;
