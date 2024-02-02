import CartItem from "../cartItem/CartItem";

import { Wrapper } from "./Cart.style";
import { CartItemType } from "../App";
import Button from "@material-ui/core/Button";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
    handlePurchase: () => void;
};


const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, handlePurchase }) => {
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
    return (
        <Wrapper>
            <h2>장바구니</h2>
            {cartItems.length === 0 ? <p>현재 등록된 상품이 없습니다.</p> : null}
            {cartItems.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>총 가격 : ${calculateTotal(cartItems).toFixed(2)}</h2>
            <Button
                style={{ fontSize: 30}}
                disableElevation
                variant="contained"
                onClick={handlePurchase}
            >
                구매
            </Button>
        </Wrapper>
    );
};

export default Cart;