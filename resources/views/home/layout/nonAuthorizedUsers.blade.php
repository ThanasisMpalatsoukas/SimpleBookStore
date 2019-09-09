<div class="login-black-container" id="login-black-container" style="{{ isset($_GET['warning']) ? 'opacity:1;display:block;height:100vh;width:100vw;display:flex;' : '' }}" >
    <div class="login-card">
        <div class="exit-icon image" id="exit-icon" style="background-image:url( {{ asset('storage/exit-icon-black.png') }} )">

        </div>
        <div class="login">
            <table>
                <form method="POST" action="{{ route('login') }}">
                    @csrf
                    <tr>
                        <th colspan='2'>LOGIN</th>
                    </tr>
                    <tr>
                        <td>EMAIL :</td>
                        <td><input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus></td>
                    </tr>
                    <tr>
                        <td>PASSWORD :</td>
                        <td><input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password"></td>
                    </tr>
                    <tr>
                        <td colspan='2'><button type="submit">{{ __('Login') }}</button></td>
                    </tr>
                </form>
            </table>
        </div>
        <div class="register">
            <form method="POST" action="{{ route('register') }}">
                @csrf
                <table>
                    <tr>
                        <th colspan='2'>REGISTER</th>
                    </tr>
                    <tr>
                        <td>USERNAME</td>
                        <td><input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus></td>
                    </tr>
                    <tr>
                        <td>EMAIL</td>
                        <td><input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email"></td>
                    </tr>
                    <tr>
                        <td>CITY</td>
                        <td>
                            <select name="city" id="city">
                                @foreach( App\City::all()->toArray() as $city )
                                <option value="{{ $city['id'] }}">{{$city['name']}}</option>
                                @endforeach
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>REGION</td>
                        <td>
                            <select name="region" id="region">
                                @foreach( App\Region::all()->toArray() as $region )
                                <option value="{{ $region['id'] }}">{{$region['name']}}</option>
                                @endforeach
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>ADDRESS</td>
                        <td><input id="address" type="text" class="form-control @error('password') is-invalid @enderror" name="address" required autocomplete="new-password"></td>
                    </tr>
                    <tr>
                        <td>PHONE NUMBER</td>
                        <td><input id="phone" type="text" class="form-control @error('password') is-invalid @enderror" name="phone" required autocomplete="new-password"></td>
                    </tr>
                    <tr>
                        <td>PASSWORD</td>
                        <td><input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password"></td>
                    </tr>
                    <tr>
                        <td>CONFIRM PASSWORD</td>
                        <td><input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password"></td>
                    </tr>
                    <tr>
                        <td colspan='2'><button>Submit</button></td>
                    </tr>
                    <tr>
                        <td style="padding-top:30px;font-size: 14px;" colspan='2'>*By registering you confirm that we can use your<br>information on our system to give you the best experience</td>
                    </tr>
                    <input type="hidden" id="number_of_cities" value="{{ App\City::all()->count() }}">
                </table>
            </form>
        </div>
    </div>
</div>