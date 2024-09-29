import { useContext, useState } from "react";
import {
    HiOutlineBan,
    HiOutlineCheck,
    HiOutlineCheckCircle,
    HiOutlinePencil,
    HiOutlineTrash
} from "react-icons/hi";

import { ProductsContext } from "../context/products.context";
const ProductsTableLine = ({ product }) => {
    const { toggleProduct } = useContext(ProductsContext);
    const productDefaultState = {
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        enable: product.enable
    }
    const [productState, setProductState] = useState(productDefaultState);

    const [enableEdit, setEnableEdit] = useState(false);

    const handleToggle = (product) => {
        toggleProduct(product.id);
    }
    const handleEdit = (product) => {
        setEnableEdit(true);
        console.log("Edit:", product.name);
    }
    const handleDelete = (product) => {
        console.log("Delete:", product.name);
    }
    const handelChange = (event) => {
        const { name, value } = event.target;
        setProductState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    return (
        <tr className="p-2 columns-1">
            <td className="p-2 text-sm font-semibold tracking-wide text-left border border-gray-400 uppercase">{product.category}</td>
            <td className="p-2 text-sm font-semibold tracking-wide text-left border border-gray-400 uppercase">
                {enableEdit ?
                    <input className="p-2 text-sm font-semibold tracking-wide text-left border border-gray-400 uppercase" type="text" name="name" value={productState.name} onChange={handelChange} />
                    :
                    <label>{productState.name}</label>}
            </td>
            <td className="p-2 text-sm font-semibold tracking-wide text-right border border-gray-400 uppercase">${product.price}</td>
            <td className="p-2 text-sm font-semibold tracking-wide text-right border border-gray-400 uppercase">{product.stock}    </td>
            <td className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-400 uppercase w-1/12">
                <div className="flex space-x-2 justify-center" onClick={() => handleToggle(product)}>
                    {product.enable ? <HiOutlineCheck className="text-green-500" /> : <HiOutlineBan className="text-red-500" />}
                </div>
            </td>
            <td className="p-2 text-sm font-mono tracking-wide text-left border border-gray-400 w-1/12">
                <div className="flex space-x-2 justify-center">
                    {enableEdit ? <HiOutlineCheckCircle onClick={() => setEnableEdit(false)} /> : <HiOutlinePencil onClick={() => setEnableEdit(true)} />}
                    <HiOutlineTrash onClick={() => handleDelete(product)} />
                </div>
            </td>
        </tr>
    );
}
export default ProductsTableLine;