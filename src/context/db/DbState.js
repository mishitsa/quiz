import React, { useReducer } from 'react'
import { DbContext } from './DbContext'
import { DbReducer } from './DbReducer'
import axios from 'axios'
import { FETCH_AUTH, FETCH_QUESTIONS, FETCH_TESTS, SHOW_LOADER } from '../types'


const url = "https://localhost:44324/api"

export const DbState = ({ children }) => {
    const initialState = {
        loading: false,
        tests: [],
        auth: [],
        questions: [],
    }

    const [state, dispatch] = useReducer(DbReducer, initialState)

    const showLoader = () => dispatch({ type: SHOW_LOADER })

    //запрос Тестов
    const fetchTests = async () => {
        showLoader()
        const res = await axios.get(`${url}/tests`) 
        let payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        }) 
        dispatch({type: FETCH_TESTS, payload})
    }
    //запрос Вопросов
    const fetchQuestions = async (title) => {
        showLoader()
        const name = title.match.params.name;
        const res = await axios.get(`${url}/questions/${name}`) 
        const payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        })
        dispatch({type: FETCH_QUESTIONS, payload})
    }
    //аутентификация
    const fetchAuth = async (formData) => {
        // отправляет запрос и получаем ответ
        const response = await fetch(`https://localhost:44324/token`, {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: formData
        });
        // получаем данные
        const data = await response.json();

        const payload = data

        dispatch({type: FETCH_AUTH, payload})
    }

    return (
        <DbContext.Provider value={{
            showLoader, fetchTests, fetchAuth, fetchQuestions,
            loading: state.loading,
            tests: state.tests,
            auth: state.auth,
            questions: state.questions
        }}>
            {children}
        </DbContext.Provider>
    )
}