<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TestimonialsController;
use App\Http\Controllers\CompanyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::group(['prefix'=> 'auth'], function(){
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout',[AuthController::class,'logout']);
    Route::get('refresh', [AuthController::class, 'refresh']);
    Route::get('userprofile', [AuthController::class, 'userprofile']);
});
Route::group(['prefix'=> 'about'], function(){
    Route::get('{id}', [AboutController::class, 'show']);
    Route::post('create', [AboutController::class, 'store']);
    Route::post('update/{id}', [AboutController::class, 'update']);
    Route::post('delete/{id}', [AboutController::class, 'destroy']);
});

Route::group(['prefix'=> 'projects'], function(){
    Route::get('', [ProjectsController::class, 'index']);
    Route::get('{id}', [ProjectsController::class, 'show']);
    Route::post('create', [ProjectsController::class, 'store']);
    Route::post('update/{id}', [ProjectsController::class, 'update']);
    Route::post('delete/{id}', [ProjectsController::class, 'destroy']);
});

Route::group(['prefix'=> 'services'], function(){
    Route::get('', [ServicesController::class, 'index']);
    Route::get('{id}', [ServicesController::class, 'show']);
    Route::post('create', [ServicesController::class, 'store']);
    Route::post('update/{id}', [ServicesController::class, 'update']);
    Route::post('delete/{id}', [ServicesController::class, 'destroy']);
});

Route::group(['prefix'=> 'gallery'], function(){
    Route::get('', [GalleryController::class, 'index']);
    Route::get('{id}', [GalleryController::class, 'show']);
    Route::post('create', [GalleryController::class, 'store']);
    Route::post('update/{id}', [GalleryController::class, 'update']);
    Route::post('delete/{id}', [GalleryController::class, 'destroy']);
});

Route::group(['prefix'=> 'slider'], function(){
    Route::get('', [SliderController::class, 'index']);
    Route::get('{id}', [SliderController::class, 'show']);
    Route::post('create', [SliderController::class, 'store']);
    Route::post('update/{id}', [SliderController::class, 'update']);
    Route::post('delete/{id}', [SliderController::class, 'destroy']);
});

Route::group(['prefix'=> 'client'], function(){
    Route::get('', [TestimonialsController::class, 'index']);
    Route::get('{id}', [TestimonialsController::class, 'show']);
    Route::post('toggle/{id}', [TestimonialsController::class, 'toggle']);
    Route::post('create', [TestimonialsController::class, 'store']);
    Route::post('update/{id}', [TestimonialsController::class, 'update']);
    Route::post('delete/{id}', [TestimonialsController::class, 'destroy']);
});

Route::group(['prefix'=> 'company'], function(){
    Route::get('', [CompanyController::class, 'index']);
    Route::get('{id}', [CompanyController::class, 'show']);
    Route::post('create', [CompanyController::class, 'store']);
    Route::post('update/{id}', [CompanyController::class, 'update']);
    Route::post('delete/{id}', [CompanyController::class, 'destroy']);
});

Route::group(['prefix'=> 'contact'], function(){
    Route::get('', [ContactController::class, 'index']);
    Route::post('create', [ContactController::class, 'store']);
    Route::post('delete/{id}', [ContactController::class, 'destroy']);
});

Route::get('fallback', function(){
    return response()->json(['errors' => 'Unauthorized access.', 'status' => 'failed'], 401);
})->name('login');

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */
