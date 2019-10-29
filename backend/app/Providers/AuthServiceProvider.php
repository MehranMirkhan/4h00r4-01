<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider {
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot() {
        $this->registerPolicies();
        Passport::tokensCan([
            'admin' => 'can do anything',
            'user'  => 'can do some things',
        ]);
        Passport::routes(function ($router) {
            //            $router->forAuthorization();
            $router->forAccessTokens();
            //            $router->forTransientTokens();
            //            $router->forClients();
            //            $router->forPersonalAccessTokens();
        });
    }
}
