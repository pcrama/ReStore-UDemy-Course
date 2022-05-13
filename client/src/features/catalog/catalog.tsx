import { useEffect, useState } from "react";
import agent from "../../api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

const NOT_STARTED = 0;
const LOADING = 1;
const LOADED = 2;

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(NOT_STARTED);

    useEffect(() => {
        console.log(`Effect 1: ${loading}, products: ${products.length}`)
        if (loading !== NOT_STARTED) {
            return;
        }

        setLoading(LOADING);
        console.log(`Effect 2: ${loading}, products: ${products.length}`)
        agent.Catalog.list()
            .then(setProducts)
            .catch(console.log)
            .finally(() => setLoading(LOADED));
    }, [loading]);

    console.log(`Catalog: ${loading}, products: ${products.length}`)

    if (loading !== LOADED) {
        return <LoadingComponent />;
    }

    return (
        <ProductList products={products} />
    );
}
