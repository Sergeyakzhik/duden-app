import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';

const WordCard = ({ item, ind, wordsData, expandedWords, onWordClick }) => {
    const [cardHeight, setCardHeight] = useState(0);
    const card = useRef(null);

    useEffect(() => {
        setCardHeight(card.current.offsetHeight);
    }, [wordsData]);

    return (
        <Card className="word-card" onClick={() => onWordClick(ind)} style={{ height: expandedWords.includes(ind) ? `${cardHeight + 68}px` : '58px' }}>
            {console.log(cardHeight)}
            <p className="title">{wordsData[ind] && wordsData[ind].title || item}</p>
            <div id={'meaning' + ind} ref={card} className="meanings">
                {wordsData[ind] && wordsData[ind].meanings.map((ind, i) => <p className="meaning" key={i}>{i}</p>)}
            </div>
        </Card>
    );
};

export default WordCard;
