@if( isset( $_GET['warning'] ) )
    <div class="warning">
        <input type="hidden" id="warning-exists" value="<?php echo $_GET['warning']; ?>">
        @if( $_GET['warning'] == 1 )
            <p>You need to be logged in to finish this action</p>
        @endif
        @if( $_GET['warning'] == 2 )
            <p>There is nothing in the cart</p>
        @endif
    </div>
@elseif(  isset( $warning ) )
    <div class="warning">
        <input type="hidden" id="warning-exists" value="<?php echo $warning; ?>">
        @if( $warning == 1 )
            <p>You need to be logged in to finish this action</p>
        @endif
        @if( $warning == 2 )
            <p>There is nothing in the cart</p>
        @endif
    </div>
@endif