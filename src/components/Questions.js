
import React, { useState } from 'react'
import {  NavLink } from 'react-router-dom';
import Modal from './Modal';

export const Questions = ({ questions, title }) => {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [btn, setBtn] = useState(false);
    const [finishBtn, setFinishBtn] = useState('hidden');


    let btns = document.getElementsByClassName("button");

    
    //найти Правильный ответ
    function findCorrect(index) {
        let value = (Number(index) === questions[current].answer) ? 1 : 0;
        
        setScore(score + value)

        return questions[current].answer 
    }

    //Переход к следующему вопросу
    function Next() {
        if (current < questions.length - 1)
            setCurrent(current + 1)
        else {
            setBtn(true)
            for (let i = 0; i < btns.length; i++) {
                btns[i].className = "button btn-secondary";
            }
            setFinishBtn('visible')
        }
    }

    //Обновление 
    function Update() {
        //Проверяем, есть ли ещё вопросы
        if (current < questions.length) {
            for (let i = 0; i < btns.length; i++) {
                btns[i].className = "button btn-primary";
                //есть ли вопросы
                Next();
            }
        }
        else {
            setBtn(true)
        }
    }

   //Обработчик клика
    function Click(index) {
        let correct = findCorrect(index);

        //Делаем кнопки цветастыми
        for (let i = 0; i < btns.length; i++) {
            btns[i].className = "button btn-secondary";
        }

        if (correct >= 0) {
            btns[correct-1].className = "button btn-success";
        }

        if (index-1 !== correct-1) {
            btns[index-1].className = "button btn-danger";
        }

        //обновляем
        setTimeout(Update, 1000);
    }


    
    if (questions[current] !== undefined) {
        return (
            <div className="wrapper">
                {console.log(title)}
                <Modal />
                <h1 className="text-primary display-2">{title.match.params.name}</h1>
                <div className="head" key={questions[current].id}>
                    <div id="head">{questions[current].name}</div>
                </div>
                <div >
                    <div >
                        <div id="buttons">
                            <button className="button btn-primary" index="1" disabled={btn} 
                            onClick={(e) => Click(e.target.getAttribute("index"))}>{questions[current].option1}</button>

                            <button className="button btn-primary" index="2" disabled={btn} 
                            onClick={(e) => Click(e.target.getAttribute("index"))}>{questions[current].option2}</button>

                        </div>
                    </div>
                </div>
                <div className="result">
                    <h3 className="text-warning">Ваш счет:</h3>
                    <h2 className="text-info">{`${score}`}</h2>
                </div>


                <div className="footer" >
                    <NavLink
                        className="nav-link"
                        to="/testing" >
                        <button type="button" className="btn btn-primary" 
                        style={{ visibility: finishBtn }} id='finish'
                        >finish</button>
                    </NavLink>
                    <div className="footer-content"  id="pages">{`${current + 1} / ${questions.length}`}</div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>

            </div>
        )
    }
}
