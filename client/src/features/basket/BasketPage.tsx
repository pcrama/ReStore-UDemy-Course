import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../../api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Basket } from "../../app/models/basket";

export default function BasketPage() {
    const [loading, setLoading] = useState(true);
    const [basket, setBasket] = useState<Basket>();

    useEffect(()=>{
        agent.Basket.get()
            .then(setBasket)
            .catch(console.log)
            .finally(() => setLoading(false))
    }, []);

    if (loading) {
        return (
            <LoadingComponent message='Loading basket...' />)
    }

    if (basket == null || basket.items == null || basket.items === []) {
        return (<Typography variant="h3">Your basket is empty</Typography>);
    }

    return (
        <Typography variant="h1">Buyer ID={basket.buyerId}</Typography>
    )
}
