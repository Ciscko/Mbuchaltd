<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Gallery;

use App\Http\Resources\ServicesResource;

use Validator;

use Illuminate\Support\Facades\Storage;


class GalleryController extends Controller
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
        if(Gallery::all()){
            return new ServicesResource(Gallery::all());
        }else{
            return response()->json(['errors' => 'Could not get Gallery.']);
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
            'description' => 'string|required'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()]);
        }

        for($i = 0; $i<$request->count; $i++){
            $name = $request->file('image'.$i)->getClientOriginalName();
            $paths .=  $request->file('image'.$i)->storeAs('images/gallery', $name).'|';
        }
        $request['images'] = $paths;
        if($proj = Gallery::create($request->all())){
            return response()->json(['status' => 'Created Successfully.', 'gallery' => $proj, 'paths' => $paths], 201);
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
        if($gallery = Gallery::find($id)){
            return response()->json(['data' => $gallery]);
        }else{
            return response()->json(['errors' => 'Could not get the Gallery....']);
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
        if($gallery = Gallery::findorfail($id)){
            $validator =  Validator::make($request->all(), [
                'title' =>'string|required|min:5',
                'description' => 'string|required'
            ]);
            if($validator->fails()){
                return response()->json(['errors' => $validator->errors()]);
            }
            $images = [];
            $images = explode('|', $gallery['images']);
            Storage::delete($images);
            $paths = '';
            for($i = 0; $i<$request->count; $i++){
                $name = $request->file('image'.$i)->getClientOriginalName();
                $paths .=  $request->file('image'.$i)->storeAs('images/gallery', $name).'|';
            }
            $request['images'] = $paths;
            if($gallery->fill($request->all())->save()){
                return response()->json(['status' => 'Updated Successfully.', 'gallery' => $gallery], 200);
            }else{
                return response()->json(['errors' => 'Errors updating DB.']);
            }
        }else{
            return response()->json(['errors' => 'Could not get Gallery.']);
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
        
       if($gallery = Gallery::find($id)) {
            $images = [];
            $images = explode('|', $gallery['images']);
            Storage::delete($images);
            $gallery->delete();
            return response()->json(['status' => 'Deleted successfully.']);
       }
       else{
           return response()->json(['errors' => 'Could not delete in DB.']);
       }
    }
}
