<?php

use App\Http\Controllers\FavoritePlaceController;
use App\Http\Controllers\FavoriteHobbyController;
use App\Http\Controllers\NeuroticismController;
use App\Http\Controllers\StressCauseController;
use App\Http\Controllers\PatientCommentController;
use App\Http\Controllers\DoctorNoteController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\VolunteerController;
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

Route::middleware(['auth.user', 'patient.check'])->group(function () {
    Route::post('patient_comment/create',  [PatientCommentController::class, 'createPatientComment']);
    Route::post('patient_comment/update/{id}',  [PatientCommentController::class, 'updatePatientComment']);
    Route::post('patient_comment/delete/{id}',  [PatientCommentController::class, 'deletePatientComment']);
    Route::get('patient_comment/{id}',  [PatientCommentController::class, 'getPatientComment']);
});

Route::middleware(['auth.user', 'doctor.check'])->group(function () {
    Route::post('doctor_note/create',  [DoctorNoteController::class, 'createDoctorNote']);
    Route::post('doctor_note/update/{id}',  [DoctorNoteController::class, 'updateDoctorNote']);
    Route::post('doctor_note/delete/{id}',  [DoctorNoteController::class, 'deleteDoctorNote']);
    Route::get('doctor_note/{id}',  [DoctorNoteController::class, 'getDoctorNote']);
});

Route::middleware(['auth.user', 'doctor.check'])->group(function () {
    Route::post('doctor/create',  [DoctorController::class, 'createDoctor']);
    Route::post('doctor/update',  [DoctorController::class, 'updateDoctor']);
    Route::get('doctor',  [DoctorController::class, 'getDoctor']);
});

Route::middleware(['auth.user', 'volunteer.check'])->group(function () {
    Route::post('volunteer/create',  [VolunteerController::class, 'createVolunteer']);
    Route::post('volunteer/update',  [VolunteerController::class, 'updateVolunteer']);
    Route::get('volunteer',  [VolunteerController::class, 'getVolunteer']);
});


