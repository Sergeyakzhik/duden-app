import fetch from 'cross-fetch';

export default {
    getAutocompleteList: value => {
        const URL = 'https://cors-anywhere.herokuapp.com/https://www.duden.de/search_api_autocomplete/dictionary_search?filter=search_api_fulltext&q=';
        
        return fetch(URL + value);
    },

    getWordPage: word => {
        const URL = 'https://cors-anywhere.herokuapp.com/https://www.duden.de/rechtschreibung/';
        const result = word.replace('ö', 'oe').replace('ä', 'ae').replace('ü', 'ue').replace('ß', 'sz');
        
        return fetch(URL + result);
    }
};