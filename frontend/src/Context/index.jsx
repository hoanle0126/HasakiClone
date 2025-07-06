import React, { createContext, useContext } from "react";

const StateContext = createContext({
  product: null,
  cart: [],
  setProduct: () => {},
  setCart: () => {},
});

const ThemeContext = ({ children }) => {
  const savedCart = JSON.parse(localStorage.getItem("cart_user_4")) || {
    products: [],
    code: {
      code: "",
      value: 0,
    },
    address: {
      first_name: "",
      last_name: "",
      phone: 0,
      street_address: "",
      city: "",
      state: { tax: 0 },
      zip: "",
      default: true,
    },
    payment: {
      title: "Cash",
      description: "Pay with cash when your order is delivered.",
      icon: "tabler:cash",
    },
  };
  const [cart, setCart] = React.useState(savedCart);
  const [language, setLanguage] = React.useState("en");

  React.useEffect(() => {
    localStorage.setItem("cart_user_4", JSON.stringify(cart));
  }, [cart]);

  return (
    <StateContext.Provider value={{ cart, setCart, language, setLanguage }}>
      {children}
    </StateContext.Provider>
  );
};

export default ThemeContext;

export const useStateContext = () => useContext(StateContext);
