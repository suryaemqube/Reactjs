import React, { useState, useEffect } from 'react';
import { randomInt, evaluate } from 'mathjs';


const MathCaptcha = () => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const [userAnswer, setUserAnswer] = useState('');

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const expression = randomInt(1, 10) + ' + ' + randomInt(1, 10);
        const result = evaluate(expression).toString();
        setExpression(expression);
        setResult(result);
        setUserAnswer('');
    };

    const handleChange = (event) => {
        setUserAnswer(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userAnswer === result) {
            console.log('Captcha passed!');
        } else {
            console.log('Captcha failed. Please try again.');
        }
        generateCaptcha();
    };

    return (
        <div className='flex gap-3 pt-'>
            <h6>Captcha</h6>
            <p>{expression} = </p>
            <input className='w-10 h-10' type="text" value={userAnswer} onChange={handleChange} />
        </div>
    );
};

export default MathCaptcha;