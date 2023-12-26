<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use App\Http\Requests\PatientComment\PatientCommentRequest;
use App\Manager\UserSpecificGenericManager;
use App\Manager\GenericManager;
use App\Models\Patients_comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PatientCommentController extends Controller
{
    //
    protected $user, $patient_comment, $userSpecificGenericManager ; 

    public function __construct(){
        $this->user = Auth::user();
        $this->patient_comment = new Patients_comment();
        $this->userSpecificGenericManager = new UserSpecificGenericManager($this->patient_comment );
    }

    public function getPatientComment($id){
        return $this->userSpecificGenericManager->findById($id, "patient_id");   
    }

    // public function getAllPatientCommentForDoctor(Request $request){
    //     $perPage = $request->query('perPage', 10);
    //     $page = $request->query('page', 1);
    //     $sortColumns = $request->query('sortColumns', []);
    //     $request->merge(['user_id' => $this->user->id]);

    //     $model = $this->userSpecificGenericManager->getAllForCurrentUser($request, $perPage, $page, $sortColumns);
    //     if(!$model){
    //         return [];
    //     }
    //     return $model;
    // }

    public function createPatientComment(Request $request){
        try{
            $validationResponse = PatientCommentRequest::createPatientCommentValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
        
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }

            $genericManager = new GenericManager(new User);
            $data = $request->json()->all();
            $doctorObj = $genericManager->findById($data['doctor_id']);
            if(!$doctorObj){
                return ExceptionMessages::NotFound("Doctor");
            }
            if($doctorObj->role_id != 2){
                return ExceptionMessages::Error('This user is not a doctor', 400);
            }
            
            return $this->userSpecificGenericManager->createWithSpecificUser($request);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function updatePatientComment($id ,Request $request){
        try{
            $validationResponse = PatientCommentRequest::updatePatientCommentValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
        
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }
            if ($request->has('doctor_id')) {
                $data = $request->except(['doctor_id']);
                $request->replace($data);
            }
            return $this->userSpecificGenericManager->updateForSpecificUser($request, $id, "patient_id");
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function deletePatientComment($id){
        return $this->userSpecificGenericManager->deleteForSpecificUser($id, "patient_id");
    }
}