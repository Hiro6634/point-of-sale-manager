import { createContext, useEffect, useReducer } from 'react';

import { 
    getCollectionAndDocuments, 
    removeProduct,
    insertProduct
} from '../utils/firebase/firebase.utils';

import { createAction } from '../utils/reducer/reducer.utils';

export const ProductsContext = createContext({
    products: [],
    hidden: true,
    product: null
});

const PRODUCTS_ACTION_TYPES = {
    SET_PRODUCTS:'SET_PRODUCTS',
    CLEAR_PRODUCT: 'CLEAR_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    ADD_PRODUCT: 'ADD_PRODUCT',
    TOGGLE_EDIT_PRODUCT_HIDDEN: 'TOGGLE_EDIT_PRODUCT_HIDDEN',
};

const INITIAL_STATE = {
    products: [],
    hidden: true,
    product: null
};

const productsReducer = (state,action) => {
    const {type, payload } = action;

    switch(type){
        case PRODUCTS_ACTION_TYPES.SET_PRODUCTS:
            return {
                ...state,
                products: payload
            };
        case PRODUCTS_ACTION_TYPES.CLEAR_PRODUCT:
            return {
                ...state,
                product: null
            };
        case PRODUCTS_ACTION_TYPES.DELETE_PRODUCT:
            return {
                ...state,
                products: deleteProduct(state.products, payload)
            };
        case PRODUCTS_ACTION_TYPES.ADD_PRODUCT:
            return {
                ...state,
                products: addProduct(state.products, payload)
            };
        case PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT:
            return {
                ...state,
                product: payload,
                products: updateProduct(state.products, payload)
            };
        case PRODUCTS_ACTION_TYPES.TOGGLE_EDIT_PRODUCT_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        default:
            throw new Error(`unhandled type of ${type} in productsReducer`);
    }
}

const deleteProduct = (products, productToDelete) => {
    console.log("Remove product:" + productToDelete.name);
    removeProduct(productToDelete);
    return {...products};
}

const addProduct = (products, productToAdd) => {
    console.log("Add product:" + productToAdd.name);
    console.log("Add products:", products);
    // try{
    //     products[productToAdd.id] = productToAdd;
    // } catch(err)
    // {
    //     console.log("Missing Product ID: " + productToAdd.id);
    // }
    insertProduct(productToAdd);
    return {...products};
}

const updateProduct = (products, productToUpdate) => {
    console.log("Update product:" + productToUpdate.name);
    // updateProduct(productToUpdate);
    return {...products};
}

export const ProductsProvider = ({children}) => {
    const [{product, products, hidden}, dispatch] = useReducer(productsReducer, INITIAL_STATE);

    const setProducts = (products) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS, products));
    }
    
    const deleteProduct = (product) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.DELETE_PRODUCT, product));
    }

    const updateProduct = (product) => {
        console.log("PRODUCT TO UPDATE:" + product.name);
        dispatch(createAction(PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT, product));
    }

    const clearProduct = () => {
        console.log("CLEAR PRODUCT");
        dispatch(createAction(PRODUCTS_ACTION_TYPES.CLEAR_PRODUCT, null));
    }
    const addProduct = (product) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.ADD_PRODUCT, product));
    }

    const toggleProductEditHidden = () => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.TOGGLE_EDIT_PRODUCT_HIDDEN));
    }

    useEffect(()=>{
        const getProductMap = async () =>{
            console.log("Firing...");
            const productMap = await getCollectionAndDocuments('products');
            setProducts(productMap);
        }

        getProductMap()
    }, []);
    const value = {
        product,
        products, 
        hidden,
        deleteProduct,
        updateProduct,
        clearProduct,
        addProduct,
        toggleProductEditHidden
    };

    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}