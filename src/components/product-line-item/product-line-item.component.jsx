import { useContext } from 'react';
import {ReactComponent as IconDelete} from '../../assets/trash-outline.svg';
import {ReactComponent as IconEdit} from '../../assets/create-outline.svg';
import {ReactComponent as IconTrue} from '../../assets/checkmark-outline.svg';
import {ReactComponent as IconFalse} from '../../assets/close-outline.svg';

import { ProductContext } from '../../context/product.context';
import { ProductsContext } from '../../context/products.context'; 
import { 
    CategoryContainer,
    EnableContainer,
    IconContainer,
    NameContainer,
    PriceContainer,
    ProductLineItemContainer ,
    ControlsContainer
} from './product-line-item.styles';

const ProductLineItem = ({product}) => {
    const {
        toggleProduct, 
    } = useContext(ProductContext);
    const {
        deleteProduct,
        updateProduct,
        toggleProductEditHidden
    } = useContext(ProductsContext);

    const {category, name,price, enable} = product;

    return(
        <ProductLineItemContainer>
            <CategoryContainer
                disable={!enable}>
                {category.toUpperCase()}
            </CategoryContainer>
            <NameContainer
                disable={!enable}>
                {name.toUpperCase()}
            </NameContainer>
            <PriceContainer
                disable={!enable}>
                ${price}
            </PriceContainer>
            <EnableContainer>
                <IconContainer onClick={()=>{
                    toggleProduct(product);
                }}>
                    {enable?<IconTrue/>:<IconFalse/>}
                </IconContainer>
            </EnableContainer>
            <ControlsContainer>
                <IconContainer isCleckeable>
                    <IconEdit onClick={()=>{
                        updateProduct(product);
                        toggleProductEditHidden();
                    }}/>
                </IconContainer>
                <IconContainer isCleckeable>
                    <IconDelete onClick={()=>{
                        console.log("DELETE! product:"+name)
                        window.confirm("QUIERE ELIMINAR EL PRODUCTO: " + name + "?") ?
                            deleteProduct(product)
                        :
                            console.log("CANCEL");
                    }}/>
                </IconContainer>
            </ControlsContainer>
        </ProductLineItemContainer>
    );
};

export default ProductLineItem; 