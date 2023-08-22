import { useState } from 'react';
import useProducts from '../../context/products.context';
import './product-item.styles.scss';

import {ReactComponent as IconDelete} from '../../assets/trash-outline.svg';
import {ReactComponent as IconEdit} from '../../assets/create-outline.svg';
import {ReactComponent as IconTrue} from '../../assets/checkmark-outline.svg';
import {ReactComponent as IconFalse} from '../../assets/close-outline.svg';
import {ReactComponent as IconSubmit} from '../../assets/checkmark-outline.svg';
import {ReactComponent as IconCancel} from '../../assets/close-outline.svg';

import { 
    ProductItemContainer,
    ProductItemViewContainer,
    ProductItemInputContainer,
    CategoryContainer,
    NameContainer,
    PriceContainer,
    StockContainer,
    EnableContainer,
    ControlsContainer,
    IconContainer,
    CategoryInputContainer,
    NameInputContainer,
    PriceInputContainer,
    StockInputContainer,
    IconSubmitContainer
} from './product-item.styles';

const ProductItem = ({product}) => {
    const {isEditable} = product;
    const {toggleProduct} = useProducts();
    const [rowFields, setRowFields] = useState({
        ...product
    });
    console.log("isEditable:" +  (isEditable?"TRUE":"FALSE"));
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setRowFields({...rowFields, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('SUBMIT');
    }

    return(
        <ProductItemContainer>
        {
            isEditable ? (
                <ProductItemInputContainer onSubmit={handleSubmit}>
                    <CategoryInputContainer onChange={handleChange}>{rowFields.category}</CategoryInputContainer>
                    <NameInputContainer onChange={handleChange}>{rowFields.name}</NameInputContainer>
                    <PriceInputContainer onChange={handleChange}>{rowFields.price}</PriceInputContainer>
                    <StockInputContainer onChange={handleChange}>{rowFields.stock}</StockInputContainer>
                    <EnableContainer color={rowFields.enable?'green':'red'}>
                    <IconContainer  onClick={()=>{toggleProduct(product)}}>
                        {rowFields.enable?<IconTrue/>:<IconFalse/>}
                        </IconContainer>
                    </EnableContainer>
                    <ControlsContainer>
                        <button><IconSubmitContainer  src={IconSubmit} alt='submit' type='submit'/></button>
                        <IconContainer  onClick={()=>{console.log(`Cancel ${rowFields.name}`)}}><IconCancel/></IconContainer>
                    </ControlsContainer>
                </ProductItemInputContainer>
            ):(
                <ProductItemViewContainer>
                    <CategoryContainer>{rowFields.category}</CategoryContainer>
                    <NameContainer>{rowFields.name}</NameContainer>
                    <PriceContainer>${rowFields.price}</PriceContainer>
                    <StockContainer>{rowFields.stock}</StockContainer>
                    <EnableContainer color={rowFields.enable?'green':'red'}>
                        <IconContainer  onClick={()=>{toggleProduct(product)}}>
                        {rowFields.enable?<IconTrue/>:<IconFalse/>}
                        </IconContainer>
                    </EnableContainer>
                    <ControlsContainer>
                        <IconContainer  onClick={()=>{console.log(`Edit ${rowFields.name}`)}}><IconEdit/></IconContainer>
                        <IconContainer  onClick={()=>{console.log(`Delete ${rowFields.name}`)}}><IconDelete/></IconContainer>
                    </ControlsContainer>
                </ProductItemViewContainer>
            )       
        }
        </ProductItemContainer>
    );
}

export default ProductItem;