import {useState} from "react";
import {useQuery} from "react-query";
import Header from "./Header/Header";
//components
import Item from "./item/Item";
import Cart from "./cart/Cart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";

import {Wrapper, StyledButton} from "./App.styles";
import {useHistory} from "react-router-dom";

export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
    return await (await fetch("https://fakestoreapi.com/products")).json();
};

const App = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const {data, isLoading, error} = useQuery("products", getProducts);

    const getTotalItems = (items: CartItemType[]) => {
        return items.reduce((ack: number, item) => {
            return ack + item.amount;
        }, 0);
    };

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems((prev) => {
            const isItemInCart = prev.find((item) => item.id === clickedItem.id);
            if (isItemInCart) {
                return prev.map((item) =>
                    item.id === clickedItem.id
                        ? {...item, amount: item.amount + 1}
                        : item
                );
            }
            return [...prev, {...clickedItem, amount: 1}];
        });
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems((prev) =>
            prev.reduce((ack, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return ack;
                    return [...ack, {...item, amount: item.amount - 1}];
                } else {
                    return [];
                }
            }, [] as CartItemType[])
        );
    };
    const handlePurchase = () => {
        if (cartItems.length === 0) {
            alert('구매할 상품을 먼저 장바구니에 추가해 주세요.');
        } else {
            alert('상품이 구매되었습니다');
            setCartItems([]);
        }
    };

    if (isLoading) return <LinearProgress/>;
    if (error) return <div>에러 발생~!!</div>;
    return (
        <Wrapper>
            <Header />
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                    handlePurchase={handlePurchase}
                ></Cart>
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                    <AddShoppingCartIcon style={{ fontSize: 50}} />
                </Badge>
            </StyledButton>
            <Grid container spacing={3}>
                {data?.map((item) => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );
};

export default App;