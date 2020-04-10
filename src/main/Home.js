import React from 'react';
import { Container, Form } from 'react-bootstrap';

import Card from './Card';

import './home.scss';

const Home = ({ wordsList, wordsData, expandedWords, onInputChange, onWordClick }) => {
    return (
        <Container className="main-container">
            <div className="words-list">
                {wordsList.map((item, ind) => (
                    <Card key={ind} ind={ind} item={item} wordsData={wordsData} expandedWords={expandedWords} onWordClick={onWordClick} />
                ))}
            </div>
            <div className="input-wrapper">
                <Form.Control onChange={onInputChange} type="text" placeholder="Fügen Sie das Wort ein" />
            </div>
        </Container>
    );
};

export default Home;
