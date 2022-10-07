import { useContext, useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { ProductsContext } from '../../context/products.context';

import { 
    AddProductContainer,
    ButtonContainer
 } from './add-or-update-product.styles';

const AddOrUpdateProduct = ({product}) => {
    const defaultFormFields = {
        id: product?product.id:null,
        category: product?product.category:'',
        name: product?product.name:'',
        price: product?product.price:0,
        enable: product?product.enable:false,
        stock: product?product.stock:0,
        warningLevel: product?product.warningLevel:0,
        stopLevel: product?product.stopLevel:0,
        enableStop: product?product.enableStop:false,
        sales: product?product.sales:0,
    };

    const {
        toggleProductEditHidden,
        addProduct
    } = useContext(ProductsContext);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {
        id,
        category, 
        name,
        price,
        enable,
        stock,
        warningLevel,
        stopLevel,
        enableStop,
        sales
    } = formFields; 

    if(product){
        console.log('must update ', product);
    } else {
        console.log('new product');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        console.log(event);
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return(
        <AddProductContainer>
            <h2>Producto</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Categoria'
                    type='text'
                    required
                    onChange={handleChange}
                    name='category'
                    value={category}              
                />
                <FormInput
                    label='Producto'
                    type='text'
                    required
                    onChange={handleChange}
                    name='name'
                    value={name}              
                />
                <FormInput
                    label='Precio'
                    type='number'
                    required
                    onChange={handleChange}
                    name='price'
                    value={price}              
                />
                <FormInput
                    label='Ventas'
                    type='number'
                    onChange={handleChange}
                    name='sales'
                    value={sales}              
                />
                <FormInput
                    label='Stock'
                    type='number'
                    onChange={handleChange}
                    name='stock'
                    value={stock}              
                />
                <FormInput
                    label='Stock Minimo'
                    type='number'
                    onChange={handleChange}
                    name='warningLevel'
                    value={warningLevel}              
                />
                <FormInput
                    label='Stock Critico'
                    type='number'
                    required
                    onChange={handleChange}
                    name='stopLevel'
                    value={stopLevel}              
                />
                <div>
                    <label>DETENCION AUTOMATICA</label>
                    <input
                        type='checkbox'
                        name='enableStop'
                        defaultChecked={enableStop}
                        onClick={()=>{
                            setFormFields({...formFields, enableStop: !enableStop});
                        }}
                    />
                </div>
                <div>
                    <label>HABILITADO</label>
                    <input
                        type='checkbox'
                        name='enableStop'
                        defaultChecked={enable}
                        onClick={()=>{
                            setFormFields({...formFields, enable: !enable});
                        }}
                    />
                </div>
                <ButtonContainer>
                    <Button 
                        type="button" 
                        onClick={ () => {
                            toggleProductEditHidden();
                        }
                    }>CANCELAR</Button>
                    <Button 
                        type="button" 
                        onClick={()=>{
                            addProduct(null);
                        }
                    }>ACEPTAR</Button>
                </ButtonContainer>
            </form>
        </AddProductContainer>
    );
};

export default AddOrUpdateProduct;