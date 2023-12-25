<?php

namespace App\Manager;
use App\Exceptions\ExceptionMessages;
use App\Interface\IGenericRepository;
use Illuminate\Support\Facades\Auth;

class UserSpecificGenericManager{
    private $obj;
    private $user;

    public function __construct($obj) {
        $this->obj = $obj;
        $this->user = Auth::user();
    }

    public function getAllForCurrentUser($request = null, $perPage = 10, 
                            $page =1, $sortColumns = []){
        try{
            $request['user_id'] = $this->user->id;
            $data = $request? $request->json()->all() : [];
            $query =  $this->obj->where($data);

            if (!empty($sortColumns)) {
                foreach ($sortColumns as $sortColumn) {
                    $columnName = $sortColumn['column'];
                    $sortOrder = $sortColumn['order'];

                    $columns = \Schema::getColumnListing($this->obj->getTable());
                    if (in_array($columnName, $columns)) {
                        $query->orderBy($columnName, $sortOrder);
                    } else {
                        throw new \InvalidArgumentException("Invalid column name: $columnName");
                    }
                }
            }
            $result = $query->paginate($perPage, ['*'], 'page', $page);         
            return $result->items();
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function createWithSpecificUser($request) {
        try{
            $data = $request->json()->all();
            $user = auth()->user();
            $this->obj->fill($data);
            $this->obj->user()->associate($user);
            $this->obj->save();

            return response()->json([
                'status'=> 'success',
                'data'=> $this->obj
            ], 201);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

}