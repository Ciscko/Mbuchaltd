<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Slider;

use App\Http\Resources\SliderResource;

use Validator;

use Illuminate\Support\Facades\Storage;


class SliderController extends Controller
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
        if(Slider::all()){
            return new SliderResource(Slider::all());
        }else{
            return response()->json(['errors' => 'Could not get Slider.']);
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
            'title1' =>'string|required|min:5',
            'title2' =>'string|required|min:5',
            'title3' =>'string|required|min:5'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()]);
        }

        for($i = 0; $i<$request->count; $i++){
            $name = $request->file('image'.$i)->getClientOriginalName();
            $paths .=  $request->file('image'.$i)->storeAs('images/slider', $name).'|';
        }
        $request['images'] = $paths;
        if($proj = Slider::create($request->all())){
            return response()->json(['status' => 'Created Successfully.', 'slider' => $proj, 'paths' => $paths], 201);
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
        if($slider = Slider::find($id)){
            return response()->json(['data' => $slider]);
        }else{
            return response()->json(['errors' => 'Could not get the Slider....']);
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
        if($slider = Slider::findorfail($id)){
            $validator =  Validator::make($request->all(), [
                'title' =>'string|required|min:5',
                'description' => 'string|required'
            ]);
            if($validator->fails()){
                return response()->json(['errors' => $validator->errors()]);
            }
            $images = [];
            $images = explode('|', $slider['images']);
            Storage::delete($images);
            $paths = '';
            for($i = 0; $i<$request->count; $i++){
                $name = $request->file('image'.$i)->getClientOriginalName();
                $paths .=  $request->file('image'.$i)->storeAs('images/slider', $name).'|';
            }
            $request['images'] = $paths;
            if($slider->fill($request->all())->save()){
                return response()->json(['status' => 'Updated Successfully.', 'slider' => $slider], 200);
            }else{
                return response()->json(['errors' => 'Errors updating DB.']);
            }
        }else{
            return response()->json(['errors' => 'Could not get Slider.']);
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
        
       if($slider = Slider::find($id)) {
            $images = [];
            $images = explode('|', $slider['images']);
            Storage::delete($images);
            $slider->delete();
            return response()->json(['status' => 'Deleted successfully.']);
       }
       else{
           return response()->json(['errors' => 'Could not delete in DB.']);
       }
    }
}
