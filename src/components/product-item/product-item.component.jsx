import { useEffect, useState } from 'react';
import useProducts from '../../context/products.context';
import './product-item.styles.scss';

import {ReactComponent as IconDelete} from '../../assets/trash-outline.svg';
import {ReactComponent as IconEdit} from '../../assets/create-outline.svg';
import {ReactComponent as IconTrue} from '../../assets/checkmark-outline.svg';
import {ReactComponent as IconFalse} from '../../assets/close-outline.svg';
import {ReactComponent as IconSubmit} from '../../assets/save-outline.svg';
import {ReactComponent as IconCancel} from '../../assets/close-circle-outline.svg';

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

const ProductItem = (props) => {
    const {product, isEditable} = props;
    const {
        toggleProduct, 
        addProduct, 
        deleteProduct,
        cancelNewProduct
    } = useProducts();
    const [rowFields, setRowFields] = useState({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        enable: product.enable,
    });
    const [edit, setEdit] = useState({
        edit: false
    });

    // console.log("isEditable:" + isEditable);
    // console.log("_PRODUCT_", product)
    const handleChange = (event) => {
        const {name, value} = event.target;
        setRowFields({...rowFields, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setEdit(false);
        setRowFields({...rowFields, isEditable: false});
        addProduct(rowFields);
    }
    const handleProductDelete = (product)=>{
        console.log("DELETE", product);
        window.confirm("QUIERE ELIMINAR EL PRODUCTO " + product.name + "?" ) ?
            deleteProduct(product)
        :
            console.log("CANCEL")
    }
    // const handleCancelAddProduct = (product) => {
                
    // }
    useEffect(()=>{
        setEdit(isEditable);
    },[isEditable]);
    return(
        <ProductItemContainer>
        {
            edit ? (
                <ProductItemInputContainer onSubmit={handleSubmit}>
                    <CategoryInputContainer name="category" onChange={handleChange} value={rowFields.category}/>
                    <NameInputContainer name="name" onChange={handleChange} value={rowFields.name}/>
                    <PriceInputContainer name="price" onChange={handleChange} value={rowFields.price}/>
                    <StockInputContainer name="stock" onChange={handleChange} value={rowFields.stock}/>
                    <EnableContainer color={rowFields.enable?'green':'red'}>
                    <IconContainer  onClick={()=>{toggleProduct(product)}}>
                        {rowFields.enable?<IconTrue/>:<IconFalse/>}
                        </IconContainer>
                    </EnableContainer>
                    <ControlsContainer>
                        <IconSubmitContainer type='submit'><IconSubmit/></IconSubmitContainer>
                        <IconContainer  onClick={()=>{cancelNewProduct()}}><IconCancel/></IconContainer>
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
                        <IconContainer  onClick={()=>{handleProductDelete(product)}}><IconDelete/></IconContainer>
                    </ControlsContainer>
                </ProductItemViewContainer>
            )       
        }
        </ProductItemContainer>
    );
}

export default ProductItem;