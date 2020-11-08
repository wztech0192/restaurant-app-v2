import uid from "uid";

const singleItemCounterHelper = (itemCounter, name, added) => {
    const quantity = (itemCounter[name] || 0) + added;
    itemCounter[name] = quantity > 0 ? quantity : 0;
};
export const itemCounterHelper = (itemCounter, menuEntryName, menuItemName, added) => {
    singleItemCounterHelper(itemCounter, menuEntryName, added);
    singleItemCounterHelper(itemCounter, menuItemName, added);
};

export const addOrderItemHelper = (cart, menuEntryName, menuItem, quantity) => {
    let orderedItem = cart.orderedItems.find(x => x.name === menuItem.name && x.entryName === menuEntryName);
    if (orderedItem) {
        orderedItem.quantity += quantity;
    } else {
        orderedItem = {
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
    }

    cart.total += orderedItem.total * quantity;
};

export const removeOrderItemHelper = (cart, menuEntryName, menuItem, quantity) => {
    //remove target ordered item
    if (menuItem.uid) {
        cart.orderedItems = cart.orderedItems.filter(oi => oi.uid !== menuItem.uid);
        cart.total += menuItem.total * quantity;
    } else {
        //remove from the last
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
    }
};

export const needEditModal = menuItem => menuItem.canAddSides || menuItem.optionGroupNames.length > 0;
