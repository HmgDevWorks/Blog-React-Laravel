import './FinderControls.css';

const FinderControls = ({ selectedButton, setselectedButton, inputValue, setInputValue, t, results }) => {
    const incomingResutls = results.length > 0;

    return (
        <div className={!incomingResutls ? `finder-box-rounded` : `finder-box`}>
            <select
                className="finder-select"
                onChange={(e) => setselectedButton(e.target.value)}
                value={selectedButton}
            >
                <option value="" disabled>
                    {t('postFinder.selectSearch')}
                </option>
                <option value="Autor">{t('postFinder.byAuthor')}</option>
                <option value="Título">{t('postFinder.byTitle')}</option>
            </select>

            <input
                type="text"
                placeholder={t('postFinder.placeholder')}
                className="finder-input"
                value={inputValue}
                spellCheck={false}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={!selectedButton}
            />
        </div>
    );
}
export default FinderControls;



