import { useContext } from 'react';
import {ReactComponent as IconDelete} from '../../assets/trash-outline.svg';
import {ReactComponent as IconEdit} from '../../assets/create-outline.svg';
import {ReactComponent as IconTrue} from '../../assets/checkmark-outline.svg';
import {ReactComponent as IconFalse} from '../../assets/close-outline.svg';

import { ProductsContext } from '../../context/products.context';

import { 
    CategoryContainer,
    EnableContainer,
    IconContainer,
    NameContainer,
    PriceContainer,
    ProductLineItemContainer 
} from './product-line-item.styles';

const ProductLineItem = ({product}) => {
    const {dispatch} = useContext(ProductsContext);
    const {category, name,price, enable} = product;

    return(
        <ProductLineItemContainer>
            <CategoryContainer>{category.toUpperCase()}</CategoryContainer>
            <NameContainer>{name.toUpperCase()}</NameContainer>
            <PriceContainer>${price}</PriceContainer>
            <EnableContainer>
                <IconContainer onClick={()=>{
                    console.log('YES! '+ name);
                    dispatch({ type: 'TOGGLE_PRODUCT', payload: product});
                }}>
                    {enable?<IconTrue/>:<IconFalse/>}
                </IconContainer>
            </EnableContainer>
        </ProductLineItemContainer>
    );
};

export default ProductLineItem;