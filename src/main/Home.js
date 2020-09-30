import React from 'react';
import { Container, Form } from 'react-bootstrap';

import Card from './Card';

import './home.scss';

const Home = ({ loading, wordsList, wordsData, expandedWords, onInputChange, onWordClick }) => {
    return (
        <Container className="main-container">
            <div className="words-list">
                {wordsList.map((word, ind) => (
                    <Card key={ind} ind={ind} word={word} data={wordsData[word]} expandedWords={expandedWords} onWordClick={onWordClick} />
                ))}
            </div>
            <div className="input-wrapper">
                <Form.Control onChange={onInputChange} type="text" placeholder="Fügen Sie das Wort ein" />
            </div>
            {loading ? (
                <>
                    <div className="dimmer">
                        
                    </div>
                    <div class="spinner"></div>
                </>
            ) : null}
        </Container>
    );
};

export default Home;
