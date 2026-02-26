<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stevebauman\Location\Facades\Location;
use Symfony\Component\HttpFoundation\Response;

class LangMiddlelware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        
        $locale = $request->header('Accept-Language', config('app.locale'));
        if (!in_array($locale,config('app.supported_locales'))) {
            
            $location = Location::get($request->ip());
            $location = Location::get("201.134.78.41");
            $locale =config('app.locale');
        }
        if ($location && $location->countryCode == "MX") {
            $locale = 'es';
        }else{
        }
        app()->setLocale($locale);
        Inertia::share('second_surname_required',$location?->countryCode == "MX");
        return $next($request);
    }
}
