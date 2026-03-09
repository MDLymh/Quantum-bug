<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
// ¡Eliminamos el 'use Throwable;' de aquí!

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        
        $exceptions->respond(function (Response $response, \Throwable $exception, Request $request) {
            
            if (in_array($response->getStatusCode(), [403, 404])) {
                
                $message = $response->getStatusCode() === 404 
                    ? 'The requested sector does not exist or has been deleted.' 
                    : 'Access Denied. You do not have clearance for this sector.';

                return Inertia::render('Errors/Restricted', [
                    'status' => $response->getStatusCode(),
                    'message' => $message
                ])->toResponse($request)->setStatusCode($response->getStatusCode());
            }

            return $response;
        });
        
    })->create();