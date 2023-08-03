import useProducts from '../../context/products.context';
import useCategories from '../../context/categories.context';
import { useEffect } from 'react';
// import ProductLineItem from '../product-line-item/product-line-item.component';
// import ProductLineInput from '../product-line-input/product-line-input.component';
import { 
    ProductTableContainer,
    ProductTableHeaderContainer,
    CategorySpan,
    NameSpan,
    StockSpan,
    EnableSpan,
    ControlsSpan,
    ProductTableBodyContainer
} from './products-table.styles'; 

const ProductsTable = () => {
    const { products, sortProductsByCategories } = useProducts();
    const { categories } = useCategories();

    useEffect(()=>{
        sortProductsByCategories(categories);
    },[categories])

    console.log(products);
    console.log(categories);
    return(
        <ProductTableContainer>
            <ProductTableHeaderContainer>
                <CategorySpan>Categoria</CategorySpan>    
                <NameSpan>Producto</NameSpan>
                <StockSpan>Stock</StockSpan>
                <EnableSpan>Habilitado</EnableSpan>
                <ControlsSpan>Editar/Borrar</ControlsSpan>
            </ProductTableHeaderContainer>
            <ProductTableBodyContainer>
                {
                    products.map((product) => {
                        return(<p key={product.id}>{product.name}</p>)
                    })
                }
            {/* {
                Object.keys(products).map((key)=>{
                    const { id } = products[key];
                    if( editProductId === id){
                        console.log("EDIT " + products[key].id);
                    }
                    return(
                        (id===editProductId)?(
                            <ProductLineInput key={id} product={products[key]}/>
                        ):(
                            <ProductLineItem key={id} product={products[key]}/>
                        )
                    )
                }            
            )} */}
            </ProductTableBodyContainer>
        </ProductTableContainer>
    );
};

export default ProductsTable;