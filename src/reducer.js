export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

export const getTotalItems = (basket) =>
  basket?.reduce((total, item) => item.quantity + total, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_TO_BASKET":
      //Logic for adding to basket
      const itemIndex = state.basket.findIndex(
        (basketItem) => basketItem.id === action.item.id
      );
      if (itemIndex >= 0) {
        var basket = [...state.basket];
        for (var i = 0; i < basket.length; i++) {
          if (basket[i].id === action.item.id) {
            basket[i].quantity += 1;
          }
        }

        return {
          ...state,
          basket: basket,
        };
      } else {
        var item = action.item;
        item.quantity = 1;
        return {
          ...state,
          basket: [...state.basket, item],
        };
      }

    case "REDUCE_FROM_BASKET":
      //Logic for reducing the quantity from basket
      let reducedBasket = [...state.basket];
      const indexItem = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (indexItem >= 0) {
        for (var i = 0; i < reducedBasket.length; i++) {
          if (reducedBasket[i].id === action.id) {
            if (reducedBasket[i].quantity === 1) {
              reducedBasket.splice(indexItem, 1);
            } else {
              reducedBasket[i].quantity -= 1;
            }
          }
        }
      } else {
        console.warn(
          `Can't remove the product (id: ${action.id}) as it is not in basket`
        );
      }
      return { ...state, basket: reducedBasket };

    case "REMOVE_FROM_BASKET":
      console.log("remove from basket");
      //Logic for removing item from basket
      let newBasket = [...state.basket];
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      console.log(index);
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove the product (id: ${action.id}) as it is not in basket`
        );
      }
      return { ...state, basket: newBasket };
    default:
      return state;
  }
};

export default reducer;
