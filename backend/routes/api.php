<?php

use App\Http\Controllers\FavoritePlaceController;
use App\Http\Controllers\FavoriteHobbyController;
use App\Http\Controllers\NeuroticismController;
use App\Http\Controllers\StressCauseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::post('update/user', 'updateUser');
    Route::post('delete/user', 'deleteUser');
    Route::get('user', 'getCurrentUser');
});

Route::middleware('auth.user')->group(function () {
    Route::post('neuroticism_record/create',  [NeuroticismController::class, 'createRecord']);
    Route::get('neuroticism_records',  [NeuroticismController::class, 'findAllRecords']);
});

Route::middleware('auth.user')->group(function () {
    Route::post('stress_cause/create',  [StressCauseController::class, 'createStressCause']);
    Route::post('stress_cause/update/{id}',  [StressCauseController::class, 'updateStressCause']);
    Route::post('stress_cause/delete/{id}',  [StressCauseController::class, 'deleteStressCause']);
    Route::post('stress_cause/massDelete',  [StressCauseController::class, 'massDeleteStressCause']);
    Route::get('stress_cause/{id}',  [StressCauseController::class, 'getStressCauseForUser']);
    Route::get('stress_causes',  [StressCauseController::class, 'getAllStressCauseForUser']);
});

Route::middleware('auth.user')->group(function () {
    Route::post('favorite_place/create',  [FavoritePlaceController::class, 'createFavoritePlace']);
    Route::post('favorite_place/update/{id}',  [FavoritePlaceController::class, 'updateFavoritePlace']);
    Route::post('favorite_place/delete/{id}',  [FavoritePlaceController::class, 'deleteFavoritePlace']);
    Route::post('favorite_place/massDelete',  [FavoritePlaceController::class, 'massDeleteFavoritePlace']);
    Route::get('favorite_place/{id}',  [FavoritePlaceController::class, 'getFavoritePlaceForUser']);
    Route::get('favorite_places',  [FavoritePlaceController::class, 'getAllFavoritePlaceForUser']);
});

Route::middleware('auth.user')->group(function () {
    Route::post('favorite_hobby/create',  [FavoriteHobbyController::class, 'createFavoriteHobby']);
    Route::post('favorite_hobby/update/{id}',  [FavoriteHobbyController::class, 'updateFavoriteHobby']);
    Route::post('favorite_hobby/delete/{id}',  [FavoriteHobbyController::class, 'deleteFavoriteHobby']);
    Route::post('favorite_hobby/massDelete',  [FavoriteHobbyController::class, 'massDeleteFavoriteHobby']);
    Route::get('favorite_hobby/{id}',  [FavoriteHobbyController::class, 'getFavoriteHobbyForUser']);
    Route::get('favorite_hobbies',  [FavoriteHobbyController::class, 'getAllFavoriteHobbyForUser']);
});
