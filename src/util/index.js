export function textCapitalized(text) {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  } else return "";
}

export function isInvoledAtCart(cartList, id) {
  if (cartList.length) {
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === id) return true;
    }
    return false;
  }
  return false;
}

export function getLocalGroceryList() {
  return JSON.parse(localStorage.getItem("grocery-list") || "[]");
}

export function getOneGroceryList(id) {
  const groceryList = getLocalGroceryList();
  const grocery = groceryList.find((grocery) => grocery?._id === id) || {};
  return grocery;
}

export function addItemToLocalGroceryList(
  id,
  item,
  quantity = null,
  measurement = null
) {
  let items = getLocalGroceryList();
  let message = "item added successfully";
  items = items.map((element) => {
    if (element?._id === id) {
      const alreadyAdded = element?.groceryItems?.some(
        (ele) => ele?.item?._id === item?._id
      );
      if (alreadyAdded) {
        alert("Item has already been added");
        message = "Item has already been added";
        return element;
      } else {
        return {
          ...element,
          groceryItems: [
            ...element.groceryItems,
            {
              item: item,
              quantity,
              measurement,
            },
          ],
        };
      }
    } else {
      return element;
    }
  });
  localStorage.setItem("grocery-list", JSON.stringify(items));
  return message;
}

export function removeItemFromLocalGroceryList(listId, id) {
  let items = getLocalGroceryList();
  console.log(items, listId, id)
  items = items.map((element) => {
    if (element?._id === listId) {
      element?.groceryItems?.splice(
        element?.groceryItems?.findIndex((ele) => ele?.item?._id === id),
        1
      );
      return element;
    } else {
      return element;
    }
  });
  localStorage.setItem("grocery-list", JSON.stringify(items));
}
