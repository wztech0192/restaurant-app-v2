import uid from "uid";

export const itemCounterHelper = (itemCounter, name, added) => {
    const quantity = (itemCounter[name] || 0) + added;
    itemCounter[name] = quantity > 0 ? quantity : 0;
};

export const addOrderItemHelper = (cart, menuEntryName, menuItem, quantity) => {
    const orderedItem = {
        uid: uid(),
        entryName: menuEntryName,
        name: menuItem.name,
        total: menuItem.price,
        itemId: menuItem.id,
        quantity,
        sides: [],
        requiredOptions: []
    };
    cart.orderedItems.push(orderedItem);
    cart.total += orderedItem.total * quantity;
};

export const removeOrderItemHelper = (cart, menuEntryName, menuItem, quantity) => {
    //starting from the end, find the last added item based on entry name and item name
    for (let i = cart.orderedItems.length - 1; i >= 0; i--) {
        const item = cart.orderedItems[i];
        if (item.name === menuItem.name && item.entryName === menuEntryName) {
            const newQuantity = item.quantity + quantity; //quantity is a negative number in this case

            if (newQuantity <= 0) {
                //remove item
                cart.total -= item.total * item.quantity;
                cart.orderedItems.splice(i, 1);
            } else {
                //decreate quantity of the item
                cart.total -= item.total * Math.abs(quantity);
                item.quantity = newQuantity;
            }

            if (cart.total < 0) {
                cart.total = 0;
            }

            if (newQuantity < 0) {
                //continue to remove next item if there are any left over unremoved quantity
                quantity = Math.abs(newQuantity);
            } else {
                return;
            }
        }
    }
};
