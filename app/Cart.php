<?php
/**
 * This file is responsible for the books
 * 
 * @package App
 * 
 * @author Thanasis mpalatsoukas <Thanasismpalatsoukas@gmail.com>
 */
namespace App;
use Illuminate\Database\Eloquent\Model;

/**
 * This file is responsible for the books
 * 
 * Cart
 * 
 * @package App
 * 
 * @author Thanasis mpalatsoukas <Thanasismpalatsoukas@gmail.com>
 */
class Cart extends Model
{
    public $numberOfItems = 0;
    public static $items = [];

    /**
     * Get the total payment of the cart
     * 
     * @param Array<float> $items to be added to the $items
     * 
     * @return void
     */
    public function __construct( $items )
    {
        $this->items = $items;
        $this->numberOfItems++;
    }

    /**
     * Add another item to the cart
     * 
     * @param Array<float> $item has the items in them
     * 
     * @return void
     */
    public function addItem( $item )
    {
        $this->items[] = $item;
    }

    /**
     * Get the total payment of the cart
     * 
     * @param Array<float> $items has the cost of each item
     * @param Int          $times indicates how many times each book has been 
     *                            purchased
     * 
     * @return Float
     */
    public static function getTotalPayment( $items , $times )
    {
        
        $total = 0;

        foreach ( $items as $index => $item ) {
            $total += Book::getTotalPrice($item) * $times[$index];
        }
        return $total;

    }
}

