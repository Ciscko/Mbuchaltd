<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Service;

use App\Http\Resources\ServicesResource;

use Validator;

use Illuminate\Support\Facades\Storage;


class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(){

    }

    public function index()
    {
        if(Service::all()){
            return new ServicesResource(Service::all());
        }else{
            return response()->json(['errors' => 'Could not get Services.']);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $paths = '';
       $validator =  Validator::make($request->all(), [
            'title' =>'string|required|min:5',
            'description' => 'string|required',
            'icon' => 'string|required'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()]);
        }

        for($i = 0; $i<$request->count; $i++){
            $name = $request->file('image'.$i)->getClientOriginalName();
            $paths .=  $request->file('image'.$i)->storeAs('images', $name).'|';
        }
        $request['images'] = $paths;
        if($proj = Service::create($request->all())){
            return response()->json(['status' => 'Created Successfully.', 'service' => $proj, 'paths' => $paths], 201);
        }else{
            return response()->json(['status' => 'Could not add to DB.']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if($Service = Service::find($id)){
            return response()->json(['data' => $Service]);
        }else{
            return response()->json(['errors' => 'Could not get the Service....']);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if($service = Service::findorfail($id)){
            $validator =  Validator::make($request->all(), [
                'title' =>'string|required|min:5',
                'description' => 'string|required',
                'icon' => 'string|required'
            ]);
            if($validator->fails()){
                return response()->json(['errors' => $validator->errors()]);
            }
            $images = [];
            $images = explode('|', $service['images']);
            Storage::delete($images);
            $paths = '';
            for($i = 0; $i<$request->count; $i++){
                $name = $request->file('image'.$i)->getClientOriginalName();
                $paths .=  $request->file('image'.$i)->storeAs('images/services', $name).'|';
            }
            $request['images'] = $paths;
            if($service->fill($request->all())->save()){
                return response()->json(['status' => 'Updated Successfully.', 'service' => $service], 200);
            }else{
                return response()->json(['errors' => 'Errors updating DB.']);
            }
        }else{
            return response()->json(['errors' => 'Could not get Service.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
       if($service = Service::find($id)) {
            $images = [];
            $images = explode('|', $service['images']);
            Storage::delete($images);
            $service->delete();
            return response()->json(['status' => 'Deleted successfully.']);
       }
       else{
           return response()->json(['errors' => 'Could not delete in DB.']);
       }
    }
}
