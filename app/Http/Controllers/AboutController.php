<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\About;

use Validator;

use App\Http\Resources\About as AboutResource;
class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
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
        $validator = Validator::make($request->all(), [
            'content' => 'required|string'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()], 401);
        }
        $about = About::create($validator->validated());
        
        return response()->json(['status' => 'Created Successfully.'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(!$about = About::find($id)){
            return response()->json(['errors' => 'Could not get item.']);
        }else{
            return new AboutResource($about);
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
        $validator = Validator::make($request->all(), [
            'content' => 'required'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()]);
        }
        $about = About::findorfail($id);
        if($about->fill($request->all())->save()){
            return response()->json(['status' => 'Updated Successfully.']);
        }
        else{
            return response()->json(['errors' => 'Could not update DB.']);
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
        if($about = About::find($id)){
            $about->delete();

            return response()->json(['status' => 'Deleted successfully.']);
        }
    }
}
