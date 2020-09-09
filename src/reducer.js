export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_TO_BASKET":
      //Logic for adding to basket
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
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
