import { FETCH_AUTH, FETCH_QUESTIONS, FETCH_TESTS, SHOW_LOADER } from "../types"


const handlers = {
    [SHOW_LOADER]: (state) => ({...state, loading: true}),
    [FETCH_TESTS]: (state, {payload}) => ({...state, tests: payload, loading: false}),
    [FETCH_QUESTIONS]: (state, {payload}) => ({...state, questions: payload, loading: false}),
    [FETCH_AUTH]: (state, {payload}) => ({...state, auth: payload, loading: false}),

    DEFAULT: state => state
}

export const DbReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT    
    return handle(state, action)
}