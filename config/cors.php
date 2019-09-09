<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS
    |--------------------------------------------------------------------------
    |
    | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
    | to accept any value.
    |
    */
   
    'supportsCredentials' => false,
    'allowedOrigins' => array('*'),
    'allowedOriginsPatterns' => [],
    'allowedHeaders' => array('*'),
    'allowedMethods' => array('*'),
    'exposedHeaders' => [],
    'maxAge' => 200,

];
