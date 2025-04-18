import { useEffect, useState } from 'react';
import './ArticleFinder.css';
import { useTranslation } from 'react-i18next';
import postService from '../../../services/postService';
import { useNavigate } from 'react-router-dom';
import useResize from '../../../bootstrap/hooks/useResize';
import FinderControls from '../FinderControls/FinderControls.jsx';
import ResultItem from '../ResultItem/ResultItem.jsx';

const ArticleFinder = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isMobile = useResize();

    const [selectedButton, setselectedButton] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = () => {
            if (inputValue.length === 0 || !selectedButton) {
                setResults([]);
                setError(null);
                return;
            }

            const service =
                selectedButton === 'Autor'
                    ? postService.getAuthorPost(inputValue)
                    : postService.getPostByTitle(inputValue);

            service
                .then((response) => {
                    const data = selectedButton === 'Autor' ? response.data : response.data.posts || [];
                    setResults(data);
                    setError(null);
                })
                .catch((err) => {
                    console.error(err);
                    setResults([]);
                    setError(t('errorMsg.errorSearchCharacters'));
                });
        };

        const debounce = setTimeout(fetchResults, 200);
        return () => clearTimeout(debounce);
    }, [inputValue, selectedButton, t]);

    return (
        <div className="finder-wrapper">
            <h2 className="titleArticleFinder">{t('postFinder.title')}</h2>

            <FinderControls
                selectedButton={selectedButton}
                setselectedButton={setselectedButton}
                inputValue={inputValue}
                setInputValue={setInputValue}
                t={t}
                results={results}
            />

            {error && <p className="finder-error">{error}</p>}

            <div className="finder-results max-h-[20rem] overflow-y-auto scrollbar-thin scrollbar-thumb-[color:var(--saturadoClaro)] scrollbar-track-transparent">
                {results.length > 0 ? (
                    results.map((result, idx) => (
                        <ResultItem
                            key={idx}
                            result={result}
                            idx={idx}
                            selectedButton={selectedButton}
                            navigate={navigate}
                            isMobile={isMobile}
                            t={t}
                        />
                    ))
                ) : (
                    inputValue.length >= 2 && (
                        <p className="finder-empty">
                            {selectedButton === 'Autor'
                                ? t('errorMsg.errorFindSearchAuthors')
                                : t('errorMsg.errorFindSearchPosts')}
                        </p>
                    )
                )}
            </div>
        </div>
    );
};

export default ArticleFinder;
