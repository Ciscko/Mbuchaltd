<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ProjectsModel as Project;

use App\Http\Resources\ProjectsResource;

use Validator;

use Illuminate\Support\Facades\Storage;


class ProjectsController extends Controller
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
        if(Project::all()){
            return new ProjectsResource(Project::all());
        }else{
            return response()->json(['errors' => 'Could not get Projects.']);
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
            'span' => 'string|required',
            'location' => 'string|required',
            'status' => 'string|required'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()]);
        }

        for($i = 0; $i<$request->count; $i++){
            $name = $request->file('image'.$i)->getClientOriginalName();
            $paths .=  $request->file('image'.$i)->storeAs('images/projects', $name).'|';
        }
        $request['images'] = $paths;
        if($proj = Project::create($request->all())){
            return response()->json(['status' => 'Created Successfully.', 'proj' => $proj, 'paths' => $paths], 201);
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
        if($project = Project::find($id)){
            return response()->json(['data' => $project]);
        }else{
            return response()->json(['errors' => 'Could not get the project....']);
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
        if($project = Project::findorfail($id)){
            $validator =  Validator::make($request->all(), [
                'title' =>'string|required|min:5',
                'description' => 'string|required',
                'span' => 'string|required',
                'location' => 'string|required',
                'status' => 'string|required'
            ]);
            if($validator->fails()){
                return response()->json(['errors' => $validator->errors()]);
            }
            $images = [];
            $images = explode('|', $project['images']);
            Storage::delete($images);
            $paths = '';
            for($i = 0; $i<$request->count; $i++){
                $name = $request->file('image'.$i)->getClientOriginalName();
                $paths .=  $request->file('image'.$i)->storeAs('images/projects', $name).'|';
            }
            $request['images'] = $paths;
            if($project->fill($request->all())->save()){
                return response()->json(['status' => 'Updated Successfully.', 'proj' => $project], 200);
            }else{
                return response()->json(['errors' => 'Errors updating DB.']);
            }
        }else{
            return response()->json(['errors' => 'Could not get project.']);
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
        
       if($project = Project::find($id)) {
            $images = [];
            $images = explode('|', $project['images']);
            Storage::delete($images);
            $project->delete();
            return response()->json(['status' => 'Deleted successfully.']);
       }
       else{
           return response()->json(['errors' => 'Could not delete in DB.']);
       }
    }
}
