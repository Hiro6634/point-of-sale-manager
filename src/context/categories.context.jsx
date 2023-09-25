import { createContext, useContext, useEffect, useReducer } from 'react';

import {
    onCollectionChangedListener
} from '../utils/firebase/firebase.utils';

import { createAction } from '../utils/reducer/reducer.utils';

export const CategoriesContext = createContext({
    categories: []
});

const CATEGORIES_ACTION_TYPES = {
    SET_CATEGORIES: 'SET_CATEGORIES'
};

const INITIAL_STATE = {
    categories: []
};

const categoriesReducer = (state, action) => {
    const { type, payload} = action;

    switch( type){
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            return {
                ...state,
                categories: payload
            };
        default:
            throw new Error(`unhandled type of ${type} in categoriesReducer`);
    }
}

export const CategoriesProvider = ({children}) =>{
    const [{categories}, dispatch] = useReducer(categoriesReducer, INITIAL_STATE);
    
    const setCategories = (categories) => {
        dispatch(createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories));
    }
    
    useEffect(()=>{
        onCollectionChangedListener('categories', (categoriesMap)=>{
            setCategories(categoriesMap);
        });
    },[]);

    const value = {
        categories
    };

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}

const useCategories = () => {
    const context = useContext(CategoriesContext);
    if( context === undefined){
        throw new Error("useCategories must be used within CategoriesContext");
    }
    return context;
}

export default useCategories;