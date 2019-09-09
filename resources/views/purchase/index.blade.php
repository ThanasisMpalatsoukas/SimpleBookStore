@include ('home.layout.header', ['headerClass' => 'index-header'])
<!-- invisible log-in table -->
@if( !Auth::check() )
    @include ('home.layout.nonAuthorizedUsers')
@else
    
@endif
<script
    src="https://www.paypal.com/sdk/js?client-id={{ env('PAYPAL_CLIENT_ID') }}">
</script>
<div class="breadcrumps">
    <p><a href="../../">home</a> > <a href="../../books/-1">books</a> > purchase</p>
</div>

<main style="margin-top:-20px;background-color:#f9f9f9;">
    <div class="container purchase">
        <h1>Cart</h1>
        <div class="billing-information">
            <table>
                <tr>
                    <th colspan='2'>Billing information</th>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td>{{ Auth::user()->name }}</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>{{ Auth::user()->email }}</td>
                </tr>
                <tr>
                    <td>Phone number:</td>
                    <td>{{ Auth::user()->phone }}</td>
                </tr>
                <tr>
                    <td>City:</td>
                    <td>{{ App\City::find(Auth::user()->city)->name }}</td>
                </tr>
                <tr>
                    <td>region:</td>
                    <td>{{ App\Region::find(Auth::user()->region)->name }}</td>
                </tr>
                <tr>
                    <td>address:</td>
                    <td>{{ Auth::user()->address }}</td>
                </tr>
                <tr>
                    <td>Comments:</td>
                    <td><textarea name="comments" id="comments" style="width:100%;height:100px;"></textarea></td>
                </tr>
            </table>
            <div class="total-payout">
                <p style="text-align: center;">The total cost is : <span id="total-amount-of-money">{{ App\Cart::getTotalPayment( $books , $amount_of_books ) }}</span>$</p><br>
                <div id="paypal-button-container"></div>
            </div>
        </div>
        <div class="item">
        @if(!empty( $books ))
            @foreach( $books as $i => $book )
                <div class="single-book" id="b{{$book['id']}}">
                    <div class="book-cover image" style="background-image:url( {{ asset('storage/'.$book['book_image']) }} );">

                    </div>
                    <table>
                        <tr>
                            <td style="font-size:12px;font-weight:700;padding:10px;">{{$book['title']}}</td>
                        </tr>
                        <tr>
                            <td style="padding-top: 5px;padding-left:10px;">{{ $authors[$i] }}</td>
                        </tr>
                        <tr>
                            <td class="amount-of-books" data-amount="{{$amount_of_books[$i]}}" style="padding-top: 5px;padding-left:10px;" id="times{{$book['id']}}">{{ $amount_of_books[$i] }} X {{ App\Book::getTotalPrice( $book ) }}$</td>
                        </tr>
                    </table>
                    <div class="remove-item image" data-id="{{$book['id']}}" style="background-image:url( {{ asset('storage/exit-icon-black.png') }} );">
    
                    </div>
                </div>
            @endforeach
        @else

        @endif
        </div>
    </div>
</main>
@include ('home.layout.footer')
<script>
    const totalCost = document.getElementById('total-amount-of-money').innerHTML;

    paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: totalCost
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Transaction completed by ' + details.payer.name.given_name);
        // Call your server to save the transaction

        $.ajaxSetup({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        let amount_of_books = [];
        $('.amount-of-books').each(function(obj){
            amount_of_books.push( $(this).data('amount') );
        });

        let comments = $('#comments').val();
        if (comments == '') {
            comments = '-';
        }

        $.ajax({

            type:'GET',
            url:'/paypal-transaction-complete',
            data: { amount_of_books : amount_of_books , 'comments' : comments },
            dataType:'html',

            success: function(respose){
                // response == 0 means the cart number will be lowered
                window.location.replace('/books/-1?purchase=completed');
            }

        });

      });
    }
  }).render('#paypal-button-container');
</script>             