<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use App\Http\Requests\Rating\RatingRequest;
use App\Manager\UserSpecificGenericManager;
use Illuminate\Support\Facades\Auth;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    //
    protected $user, $rating, $doctor, $userSpecificGenericManager;
    public function __construct(){
        $this->user = Auth::user();
        $this->rating = new Rating();
        $this->userSpecificGenericManager = new UserSpecificGenericManager($this->rating);
        $this->doctor = new User();
    }

    public function CreateUpdateRating(Request $request){
        try{
            $validationResponse  = RatingRequest::createRatingValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
            
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }
            $request['rating']=1;
            // return $this->rating;
            return $this->userSpecificGenericManager->createWithSpecificUser($request);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
        
    }
}
