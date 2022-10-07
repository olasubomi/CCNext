export function textCapitalized(text) {
    if(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    } else return "";
}

export function isInvoledAtCart (cartList, id) {
    if ( cartList.length ) {
        for(let i = 0; i < cartList.length; i++){
            if(cartList[i].id === id) return true;
        }
        return false;
    }
    return false;
}