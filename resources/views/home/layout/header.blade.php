<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="{{ $headerClass }}-html">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap" rel="stylesheet"> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" href="{{ asset('css/index.css') }}">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel</title>
    </head>
    <body style="background-color:#f9f9f9">
    <header class="{{ $headerClass }}">
        <div class="container">
            <a href="/">
                <div class="logo-icon image" style="background-image:url( {{ asset('storage/LOGO-white.png') }} )">
                </div>
            </a>
            <div id="user-icon" class="user image" style="background-image:url( {{ asset('storage/user.png') }} )">
                @if( Auth::check() )
                <div class="logout-user">
                    <p><a href="/logoutUser">Logout</a></p>
                </div>
                @endif
            </div>
            <a href="/purchase">
                <div class="cart" style="background-image:url( {{ asset('storage/cart.png') }} )">
                    <div id="red-circle" class="red-circle" style="{{ session('items') ? 'display:block' : 'display:none' }}">
                    </div>
                    @if( session('items') )
                    <p id="amount-of-items" style="{{ session('items') ? 'display:block' : 'display:none' }}">{{sizeof(array_unique(session('items')))}}</p>
                    @else
                    <p id="amount-of-items"></p>
                    @endif
                </div>
            </a>
            <p class="phone-info">+ 210 89222812</p>
            <p class="phone-info">Thanasismpalatsoukas@gmail.com</p>
        </div>
    </header>
    