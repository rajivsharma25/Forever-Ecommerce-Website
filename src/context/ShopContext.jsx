import { toast } from "react-toastify";
import { products } from "../assets/assets";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();


    const addToCart = async (itemId, size) => {

        if(!size){
            toast.error('Select Product size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        } 
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const size in cartItems[items]){
                try{
                    if(cartItems[items][size] > 0){
                    totalCount += cartItems[items][size];
                    }
                }
                catch(err){
                    console.log(err);
                }
            } 
         }
         return totalCount;
    }

    const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            let itemInfo = products.find((product) => product._id === item);
            for(const size in cartItems[item]){
                try{
                    if(cartItems[item][size] > 0){
                        totalAmount += cartItems[item][size] * itemInfo.price;
                    }
                }
                catch(err){
                    console.log(err);
                }
            } 
        }
        return totalAmount;
    }


    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        cartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate
    };

    return (
        <ShopContext.Provider value={value}>
             {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider; 