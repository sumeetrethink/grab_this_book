<?php

namespace App\Http\Middleware;

use Closure;

class SuperAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        
        if((session()->has('user') &&  session('user')->role=="Super Admin"))
        {

            return $next($request);
        }
       
        else
        return redirect()->back();
    }
}
