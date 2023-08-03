import useProducts from '../../context/products.context';
import ProductLineItem from '../product-line-item/product-line-item.component';
import ProductLineInput from '../product-line-input/product-line-input.component';
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
    const { products } = useProducts();

    console.log(products);
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
                        return(<p>{product.name}</p>)
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