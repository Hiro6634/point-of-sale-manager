import ProductsTable from '../../components/products-table/products-table.component';
import Button from '../../components/button/button.component';
import useProducts from '../../context/products.context';
//import AddOrUpdateProduct from '../../components/add-or-update-product/add-or-update-product.component';
import { 
    ButtonContainer, 
    ProductsContainer,
    ProductsTitleContainer
} from './products.styles';

const Products = () => {
     const { newProduct, edit } = useProducts();
     console.log("Edit:" + edit);
    return( 
        <ProductsContainer>
            <ProductsTitleContainer>PRODUCTOS</ProductsTitleContainer>
            <ProductsTable/>
            <ButtonContainer>
                {edit?(
                    <Button onClick={()=>{newProduct()}}>Guardar</Button>
                ):(
                    <Button onClick={()=>{newProduct()}}>Agregar</Button>
                )}
            </ButtonContainer>
        </ProductsContainer>
    )
};

export default Products;