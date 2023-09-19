// import React from "react";
// import { useRouter } from "next/router";
// import GroceryListStyles from "./Index.module.css";
// import CartProvider from "../../../../../pages/store/CartProvider";

// function Index(props) {
//   const router = useRouter();

//   function showListDetails() {
//     router.push("/grocerylist/" + props.id);
//   }

//   return (
//     <CartProvider>
//       <div className={GroceryListStyles.listMain}>
//         <label>{props.listName}</label>
//         <p>
//           This is the list of all grocery items for Name of list {""}
//           {props.listName}
//         </p>
//         <div className={GroceryListStyles.buttonDiv} onClick={showListDetails}>
//           <label>Open Grocery List</label>
//         </div>
//       </div>
//     </CartProvider>
//   );
// }

// export default Index;
