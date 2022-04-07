import { createReducer } from "@reduxjs/toolkit"
import {heroesFetching,
       heroesFetched,
       heroesFetchingError,
       heroCreated,
       heroDeleted} from '../actions'

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = createReducer(initialState, {
    [heroesFetching]: state => {state.heroesLoadingStatus = 'loading'},
    [heroesFetched]: (state, action) => {
                        state.heroesLoadingStatus = 'idle'
                        state.heroes = action.payload
                },
    [heroesFetchingError]: state => {state.heroesLoadingStatus = 'error'},
    [heroCreated]: (state, action) => {state.heroes.push(action.payload)},
    [heroDeleted]: (state, action) => {state.heroes = state.heroes.filter(item => item.id !== action.payload)}
}, [], state => state)

// const heroes = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, state => {
//             state.heroesLoadingStatus = 'loading'
//         })
//         .addCase(heroesFetched, (state, action) => {
//                 state.heroesLoadingStatus = 'idle'
//                 state.heroes = action.payload
//         })
//         .addCase(heroesFetchingError, state => {
//             state.heroesLoadingStatus = 'error'
//         })
//         .addCase(heroCreated, (state, action) => {
//             state.heroes.push(action.payload)
//         })
//         .addCase(heroDeleted, (state, action) => {
//             state.heroes = state.heroes.filter(item => item.id !== action.payload)
//         })
// })

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 // ЭТО МОЖНО СДЕЛАТЬ И ПО ДРУГОМУ
//                 // Я специально показываю вариант с действиями тут, но более правильный вариант
//                 // будет показан в следующем уроке
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_CREATED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//                 // Фильтруем новые данные по фильтру, который сейчас применяется
//             }
//         case 'HERO_DELETED': 
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload),
//                 // Фильтруем новые данные по фильтру, который сейчас применяется
//             }
//         default: return state
//     }
// }

export default heroes;