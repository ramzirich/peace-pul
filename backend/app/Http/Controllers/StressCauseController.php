<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use App\Http\Requests\StressCause\CreateStressCauseRequest;
use App\Manager\GenericManager;
use App\Models\Stress_cause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StressCauseController extends Controller
{
    //
    protected $user, $stressCause, $genericManager;

    public function __construct(){
        $this->user = Auth::user();
        $this->stressCause = new Stress_cause();
        $this->genericManager = new GenericManager($this->stressCause);
    }

    public function getStressCauseForUser($id){
        $requestData = $this->genericManager->findById($id);

        if(!$requestData){
            return [];
        }
        if($requestData && $requestData->patient_id != Auth::user()->id){
            return ExceptionMessages::Error("Unauthorized", 401);
        }

        return $requestData;   
    }

    public function getAllStressCauseForUser(Request $request){
        $request['patient_id'] = $this->user->id;
        $model = $this->genericManager->getAll($request);
        if(!$model){
            return [];
        }
        return $model;
    }

    public function createStressCause(Request $request){
        try{
            $validationResponse = CreateStressCauseRequest::createStressCauseValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
        
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }
            
            return $this->genericManager->createWithSpecificUser($request);

        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }
}
