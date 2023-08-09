import useProducts from '../../context/products.context';
import ProductItem from '../product-item/product-item.component';
import { getProdutcsOrderedByCategory } from '../../utils/firebase/firebase.utils';
// import ProductLineItem from '../product-line-item/product-line-item.component';
// import ProductLineInput from '../product-line-input/product-line-input.component';
import { 
    ProductTableContainer,
    ProductTableHeaderContainer,
    CategoryContainer,
    NameContainer,
    StockContainer,
    EnableContainer,
    ControlsContainer,
    ProductTableBodyContainer,
    PriceContainer
} from './products-table.styles'; 

const ProductsTable = () => {
    const { products } = useProducts();

    return(
        <ProductTableContainer>
            <ProductTableHeaderContainer>
                <CategoryContainer>Categoria</CategoryContainer>    
                <NameContainer>Producto</NameContainer>
                <PriceContainer>Precio</PriceContainer>
                <StockContainer>Stock</StockContainer>
                <EnableContainer>Habilitado</EnableContainer>
                <ControlsContainer>Editar/Borrar</ControlsContainer>
            </ProductTableHeaderContainer>
            <ProductTableBodyContainer>
                {
                    products.length !== 0?(
                    products.map((product)=>(<ProductItem key={product.id} product={product}/>))
                    ):null
                }
            </ProductTableBodyContainer>
        </ProductTableContainer>
    );
};

export default ProductsTable;