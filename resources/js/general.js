import controlRegisterAndLoginMenu from './mainJs/controlRegisterAndLoginMenu';
import addSingleBookItem from './mainJs/addSingleBookItem';
import removeItemFromCart from './mainJs/removeItemFromCart';
import getRegions from './mainJs/getRegions'; 
import slowHover from './mainJs/slowHover';

export default function general() {
    /* 
     * Adds a book on the cart , updates the 
     * number displayed on the cart and returns 
     * warning depending on the state of the transaction.
     */
    addSingleBookItem();
    
    /* 
     * Removes the item from the cart and
     * handles the change on the number that 
     * is displayed on the cart.
     */
    removeItemFromCart();

    /* 
     * Generate the cities and regions connected to
     * the cities.update the regions depending on what
     * city has been selected.
     */
    getRegions();


    /*
     * Responsible for the functionality and animations
     * of the registering and login menu.
     */
    controlRegisterAndLoginMenu();


    /**
     * Smooth inner link hovering when clicked.
     */
    slowHover();
}