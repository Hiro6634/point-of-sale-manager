import { useContext, useState } from "react";
import {
    HiOutlineBan,
    HiOutlineCheck,
    HiOutlineCheckCircle,
    HiOutlinePencil,
    HiOutlineTrash
} from "react-icons/hi";

import { useEffect } from "react";
import { ProductsContext } from "../context/products.context";
const ProductsTableLine = ({ product }) => {

    const {
        toggleProduct,
        updateProduct
    } = useContext(ProductsContext);

    const [productState, setProductState] = useState({});
    const [enableEdit, setEnableEdit] = useState(false);
    useEffect(() => {
        if (product === null) {
            setProductState({
                category: "",
                name: "",
                price: 0,
                stock: 0,
                enable: false,
                id: "NEW"
            });
        }
        else {
            setProductState(product);
        }
    }, [product]);

    const handleToggle = (product) => {
        console.log("Toggle:", product.name);
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
    const handleUpdate = () => {
        console.log("Update:", productState);
        if (productState.id === "NEW") {
            productState.id = productState.name.toLowerCase();
        }
        updateProduct(productState);
        setEnableEdit(false);
    }
    return (
        <tr className="p-2 columns-1">
            <td className="p-2 text-sm font-semibold tracking-wide text-left border border-gray-400 uppercase">
                {enableEdit ?
                    <input className="p-2 text-sm font-semibold tracking-wide text-left border border-gray-400 uppercase" type="text" name="category" value={productState.category} onChange={handelChange} />
                    :
                    <label>{productState.category}</label>
                }
            </td>
            <td className="p-2 text-sm font-semibold tracking-wide text-left border border-gray-400 uppercase">
                {enableEdit ?
                    <input className="p-2 text-sm font-semibold tracking-wide text-left border border-gray-400 uppercase" type="text" name="name" value={productState.name} onChange={handelChange} />
                    :
                    <label>{productState.name}</label>
                }
            </td>
            <td className="p-2 text-sm font-semibold tracking-wide text-right border border-gray-400 uppercase">$
                {enableEdit ?
                    <input className="p-2 text-sm font-semibold tracking-wide text-right border border-gray-400 uppercase" type="number" name="price" value={productState.price} onChange={handelChange} />
                    :
                    <label>{productState.price}</label>
                }
            </td>
            <td className="p-2 text-sm font-semibold tracking-wide text-right border border-gray-400 uppercase">
                {enableEdit ?
                    <input className="p-2 text-sm font-semibold tracking-wide text-right border border-gray-400 uppercase" type="number" name="stock" value={productState.stock} onChange={handelChange} />
                    :
                    <label>{productState.stock}</label>
                }
            </td>
            <td className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-400 uppercase w-1/12">
                <div className="flex space-x-2 justify-center" onClick={() => handleToggle(productState)}>
                    {productState.enable ?
                        <HiOutlineCheck style={{ fontSize: "24px" }} className="text-green-500" />
                        :
                        <HiOutlineBan style={{ fontSize: "24px" }} className="text-red-500" />
                    }
                </div>
            </td>
            <td className="p-2 text-sm font-mono tracking-wide text-left border border-gray-400 w-1/12">
                <div className="flex space-x-2 justify-center">
                    {enableEdit ?
                        <HiOutlineCheckCircle style={{ fontSize: "24px" }} className="text-green-500" onClick={() => handleUpdate()} />
                        :
                        <HiOutlinePencil style={{ fontSize: "24px" }} className="text-blue-500" onClick={() => setEnableEdit(true)} />
                    }
                    <HiOutlineTrash style={{ fontSize: "24px" }} className="text-red-500" onClick={() => handleDelete(product)} />
                </div>
            </td>
        </tr>
    );
}
export default ProductsTableLine;