import React, { useState, useEffect } from 'react';
import $ from 'jquery';

import Home from './Home';
import Duden from '../api';

const HomeContainer = () => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [requestTimeout, setRequestTimeout] = useState(null);
    const [wordsList, setWordsList] = useState([]);
    const [wordsData, setWordsData] = useState({});
    const [expandedWords, setExpandedWords] = useState([]);

    //TODO: create object to store [title]: of words from autocomplete and don't load their info if there's no need in it

    useEffect(() => {
        if (value.length > 3) {
            clearTimeout(requestTimeout);
            setRequestTimeout(
                setTimeout(async () => {
                    setLoading(true);

                    const response = await Duden.getAutocompleteList(value);
                    const result = await response.json();
    
                    setWordsList(result.slice(0, 5).map(item => item.value.split('/').reverse()[0]));

                    setLoading(false);
                }, 500)
            );
        }
    }, [value]);

    useEffect(() => {
        if (wordsList.length) {
            (async () => {
                const responseArr = await Promise.all(wordsList.filter(item => !wordsData[item]).map(item => Duden.getWordPage(item)));
                const resultArr = await Promise.all(responseArr.map(item => item.text()));
                const documents = resultArr.map(item => $(item));
                const titles = documents.map(item => item.find('.lemma__title').text());
                let meanings = documents.map(item => item.find('#bedeutungen .enumeration__text').length ? item.find('#bedeutungen .enumeration__text') : item.find('#bedeutung p'));

                meanings = meanings.map(item => item.map((i, el) => el.innerText));

                const data = {};

                wordsList.forEach((item, ind) => {
                    if (!wordsData[item]) {
                        data[item] = { title: titles[ind], meanings: meanings[ind] };
                    } else {
                        data[item] = wordsData[item];
                    }
                });

                setWordsData(data);
            })();
        }
    }, [wordsList]);

    const handleInputChange = ({ target: { value } }) => {
        setValue(value);
        setExpandedWords([]);
    };

    const handleWordClick = ind => {
        if (expandedWords.includes(ind)) {
            const arr = [ ...expandedWords ];

            arr.splice(expandedWords.indexOf(ind), 1);

            setExpandedWords(arr);
        } else {
            setExpandedWords([ ...expandedWords, ind ]);
        }
    };

    return (
        <Home
            loading={loading}
            wordsList={wordsList} 
            wordsData={wordsData} 
            expandedWords={expandedWords} 
            onInputChange={handleInputChange} 
            onWordClick={handleWordClick} 
        />
    );
};

export default HomeContainer;
