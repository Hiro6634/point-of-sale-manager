import { createContext, useEffect, useReducer } from 'react';

import { 
    getCollectionAndDocuments, 
    removeProduct,
    insertProduct,
    updateProduct
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
    TOGGLE_PRODUCT_ENABLE: 'TOGGLE_PRODUCT_ENABLE',
    TOGGLE_PRODUCT_ENABLE_STOP: 'TOGGLE_PRODUCT_ENABLE_STOP',
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
                product: payload
            };
        case PRODUCTS_ACTION_TYPES.TOGGLE_EDIT_PRODUCT_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case PRODUCTS_ACTION_TYPES.TOGGLE_PRODUCT_ENABLE:
            return {
                ...state,
                products: toggleProductEnable(state.products, payload)
            }
        case PRODUCTS_ACTION_TYPES.TOGGLE_PRODUCT_ENABLE_STOP:
            return {
                ...state
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
    const product = {
        id: productToAdd.id?productToAdd.id:productToAdd.name.toLowerCase().replaceAll(' ','_'),
        category: productToAdd.category,
        name: productToAdd.name,
        price: parseInt(productToAdd.price),
        stock: parseInt(productToAdd.stock),
        warningLevel: (productToAdd.warningLevel),
        stopLevel: parseInt(productToAdd.stopLevel),
        sales: parseInt(productToAdd.sales),
        enable: productToAdd.enable,
        enableStop: productToAdd.enableStop,
    }
    console.log("__ADD__:", product);
    insertProduct(product);
    return {...products};
}

const toggleProductEnable = (products, product) => {
    product.enable = !product.enable;
    updateProduct(product.id, {enable: product.enable});

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

    const toggleProductEnable = () => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.TOGGLE_PRODUCT_ENABLE));
    }

    const toggleProductEnableStop = () => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.TOGGLE_PRODUCT_ENABLE_STOP));
    }

    useEffect(()=>{
        const getProductMap = async () =>{
            const productMap = await getCollectionAndDocuments('products');
            setProducts(productMap);
            console.log("loadintg...",productMap);
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
        toggleProductEditHidden,
        toggleProductEnable,
        toggleProductEnableStop
    };

    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}