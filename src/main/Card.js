import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';

const WordCard = ({ word, ind, data, expandedWords, onWordClick }) => {
    const [cardHeight, setCardHeight] = useState(0);
    const card = useRef(null);

    useEffect(() => {
        setCardHeight(card.current.offsetHeight);
    }, [data]);

    return (
        <Card className="word-card" onClick={() => onWordClick(ind)} style={{ height: expandedWords.includes(ind) ? `${cardHeight + 68}px` : '58px' }}>
            <p className="title">{data?.title || word}</p>
            <div id={'meaning' + ind} ref={card} className="meanings">
                {data?.meanings?.map((ind, i) => <p className="meaning" key={i}>{i}</p>)}
            </div>
        </Card>
    );
};

export default WordCard;
