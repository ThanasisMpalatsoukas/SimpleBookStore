import swapMenu from './mainJs/swapMenu';
import controlRegisterAndLoginMenu from './mainJs/controlRegisterAndLoginMenu';
import addSingleBookItem from './mainJs/addSingleBookItem';
import removeItemFromCart from './mainJs/removeItemFromCart';
import getRegions from './mainJs/getRegions'; 
import getAllBooks from './mainJs/getAllBooks';
import slowHover from './mainJs/slowHover';
import sendReview from './mainJs/sendReview';
import loadMoreItemsLoad from './mainJs/loadMoreItemsLoad';

$(document).ready(function(){

    /** 
     * Loads more items when a different category
     * is clicked on the front page 
     */
    loadMoreItemsLoad();

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
     * Gets with an ajax request all items needed to swap 
     * the menu.
     *
     * WARNING: NEEDED ONLY ON ROUTE::('/')
     */
    swapMenu();

    /*
     * Responsible for the functionality and animations
     * of the registering and login menu.
     */
    controlRegisterAndLoginMenu();

    /*
     * Gets all books from the database and is responsible
     * for filtering them while the user searches for them
     * in the search form.
     * 
     * WARNING: NEEDED ONLY ON ROUTE::('/')
     */
    getAllBooks();


    /**
     * Is responsible to send reviews and return
     * the appropriate status response plus
     * Star functionality when reviewing. 
     * 
     * WARNING: NEEDED ONLY ON ROUTE::('/item/{id}')
     */
    sendReview();

    /**
     * Smooth inner link hovering when clicked.
     */
    slowHover();

});
