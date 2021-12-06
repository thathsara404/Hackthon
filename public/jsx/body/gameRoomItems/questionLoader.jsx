import React from 'react';
import { useSelector } from 'react-redux';

import { getCurrentQuestion } from '../../../js/redux/selector/gameRoomSelector';

const QuestionLoader = () => {

    const currentQuestion = useSelector(state => getCurrentQuestion(state));

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: currentQuestion }}></div>
        </>
    );

};

export default QuestionLoader;
