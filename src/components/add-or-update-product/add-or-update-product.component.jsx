import { useContext, useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { ProductsContext } from '../../context/products.context';

import { 
    AddProductContainer,
    FormContainer,
    ButtonContainer
 } from './add-or-update-product.styles';

const AddOrUpdateProduct = ({productId}) => {
    const {
        product,
        products,
        toggleProductEditHidden,
        addProduct,
    } = useContext(ProductsContext);

    console.log("PRODUCT:", product);
    const defaultFormFields = {
        id: product?product.id:null,
        category: product?product.category:'',
        name: product?product.name:'',
        price: product?parseInt(product.price):0,
        stock: product?parseInt(product.stock):0,
        warningLevel: product?parseInt(product.warningLevel):0,
        stopLevel: product?parseInt(product.stopLevel):0,
        sales: product?parseInt(product.sales):0,
        enable: product?product.enable:false,
        enableStop: product?product.enableStop:false,
    };

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("NAME:" + name);
        if(id !== null){
            console.log("__PRE:",products[id]);
            products[id] = formFields;
            console.log("__POS:",products[id]);
        }
        console.log("formFields", formFields);
        //TODO: Ver si es esto o directamente el objeto de la lista
        await addProduct(formFields);
        toggleProductEditHidden();
    };

    const handleChange = (event) => {
        console.log(event);
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return(
        <AddProductContainer>
            <h2>Producto</h2>
            <FormContainer onSubmit={handleSubmit}>
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
                            console.log("ON CLICK: PRODUCT", product)
                            setFormFields({...formFields, enableStop: !enableStop});
                        }}
                    />
                </div>
                <div>
                    <label>HABILITADO</label>
                    <input
                        type='checkbox'
                        name='enable'
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
                    <Button type='submit'>ACEPTAR</Button>
                </ButtonContainer>
            </FormContainer>
        </AddProductContainer>
    );
};

export default AddOrUpdateProduct;