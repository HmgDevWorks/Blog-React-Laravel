import "./PostResult.css";

const PostResult = ({ result, isMobile, t }) => (
    <div className="result-content grid grid-cols-12 gap-5">
        <div className="col-span-5 text font-bold tooltip tooltip-bottom" title={result.title} data-tip={result.title}>
            <span
                className={`text ${isMobile ? '' : 'truncate'} overflow-hidden text-ellipsis whitespace-nowrap font-bold block`}
            >
                {result.title}
            </span>
        </div>

        <div className="col-span-3 flex items-center tooltip tooltip-bottom" title={t('postFinder.byAuthor')} data-tip={t('postFinder.byAuthor')}>
            <span className="icon">👤</span>
            <span className="text ml-1 truncate">{result.author_name}</span>
        </div>

        <div className="col-span-2 text flex items-center tooltip tooltip-bottom" title={t('postFinder.category')} data-tip={t('postFinder.category')}>
            <div className="text ml-1">{result?.category_name}</div>
        </div>

        <div className="col-span-2 flex items-center justify-center tooltip tooltip-bottom" title={t('postFinder.views')} data-tip={t('postFinder.views')}>
            <span className="icon">👁️</span>
            <span className="text ml-1">{result.views}</span>
        </div>
    </div>
);

export default PostResult;
