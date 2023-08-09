import { createContext, useContext, useEffect, useReducer } from 'react';
import useCategories from './categories.context';

import { 
    removeProduct,
    insertProduct,
    updateProduct,
    onProductsChangedListener,
    getProdutcsOrderedByCategory
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
    TOGGLE_PRODUCT: 'TOGGLE_PRODUCT',
    EDIT_PRODUCT: 'EDIT_PRODUCT',
};

const INITIAL_STATE = {
    products: [],
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
        case PRODUCTS_ACTION_TYPES.TOGGLE_PRODUCT:
            return{
                ...state,
                products: toggleProduct(state.products, payload)
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

const toggleProduct = (products, product) => {
    const theProduct = products.filter(p=>p.id.toLowerCase() === product.id.toLowerCase());

    updateProduct(theProduct[0].id, {enable: !theProduct[0].enable});

    return products;
}


export const ProductsProvider = ({children}) => {
    const [{products}, dispatch] = useReducer(productsReducer, INITIAL_STATE);
    const {categories} = useCategories();

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
    const toggleProduct = (product) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.TOGGLE_PRODUCT, product));
    }

    useEffect(()=>{
        onProductsChangedListener((productsMap)=>{
           setProducts(productsMap);
        });
    }, []);

    useEffect(()=>{
        async function loadProducts(){
            try{
                const products = await getProdutcsOrderedByCategory();

                setProducts(products);

            }catch(error){
                console.error(error);
            }
        } 

        loadProducts();
    },[categories]);
    
    const value = {
        products, 
        setProducts,
        deleteProduct,
        updateProduct,
        clearProduct,
        addProduct,
        toggleProduct,
    };

    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}

const useProducts = () => {
    const context = useContext(ProductsContext);
    if( context === undefined ){
        throw new Error("useProducts must be used within ProductsContext");
    }
    return context;
}

export default useProducts;
