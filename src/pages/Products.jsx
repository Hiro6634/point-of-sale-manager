import React, { useContext } from "react";
import ProductsTable from "../components/ProductsTable";
import { ProductsContext } from "../context/products.context";

const Products = () => {
    const { addBlankProduct } = useContext(ProductsContext);

    const handleAddProduct = () => {
        addBlankProduct();
    }
    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-4">Productos</h1>
            <ProductsTable />
            <div className="w-full flex justify-end p-4">
                <button className="relative bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center" onClick={handleAddProduct}>
                    <span className="absolute bg-white w-3/5 h-3 block"></span>
                    <span className="absolute bg-white h-3/5 w-3 block"></span>
                </button>
            </div>
        </div>);
};

export default Products;