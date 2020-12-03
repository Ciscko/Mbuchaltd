<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Company;

use Validator;

use Illuminate\Support\Facades\Storage;


class CompanyController extends Controller
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
        if(Company::all()){
            return response()->json(['bio' => Company::all()], 200);
        }else{
            return response()->json(['errors' => 'Could not get Company Bio.']);
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
       $validator =  Validator::make($request->all(), [
            'email' =>'string|required|min:5',
            'phone' => 'string|required',
            'location' => 'string|required',
            'workingDays' => 'string|required',
            'facebook' => 'string|required',
            'instagram' => 'string|required',
            'linkedin' => 'string|required',
            'twitter' => 'string|required',
            'mission' => 'string|required',
            'vision' => 'string|required',
            'objective' => 'string|required'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()]);
        }
        
        /* $name = $request->file('image')->getClientOriginalName();
        $path =  $request->file('image')->storeAs('images/company', $name);
        $request['image'] = $path; */

        $name = $request->file('image')->getClientOriginalName();
        $path = Storage::putFileAs('images/company', $request->file('image'), $name);
        $req = array_merge($request->all(), ['image' => $path]); 

        if($company = Company::create($req)){
            return response()->json(['status' => 'Created Successfully.', 'bio' => $company], 201);
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
        if($company = Company::find($id)){
            return response()->json(['bio' => $company]);
        }else{
            return response()->json(['errors' => 'Could not get the Company Bio.']);
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
        if($company = Company::findorfail($id)){
            $validator =  Validator::make($request->all(), [
                'email' =>'string|required|min:5',
                'phone' => 'string|required',
                'location' => 'string|required',
                'workingDays' => 'string|required',
                'facebook' => 'string|required',
                'instagram' => 'string|required',
                'linkedin' => 'string|required',
                'twitter' => 'string|required',
                'mission' => 'string|required',
                'vision' => 'string|required',
                'objective' => 'string|required'
            ]);
            if($validator->fails()){
                return response()->json(['errors' => $validator->errors()]);
            }

            $images = [];
            $images = explode('|', $company['image']);
            Storage::delete($images);
            /* $path = '';
            $name = $request->file('image')->getClientOriginalName();
            $path .=  $request->file('image')->storeAs('images/company', $name).'|';
            $request['image'] = $path; */

            $name = $request->file('image')->getClientOriginalName();
            $path = Storage::putFileAs('images/company', $request->file('image'), 'logo.'.$request->file('image')->extension());
            $req = array_merge($request->all(), ['image' => $path]); 

            if($company->fill($req)->save()){
                return response()->json(['status' => 'Updated Successfully.', 'bio' => $company], 200);
            }else{
                return response()->json(['errors' => 'Errors updating DB.']);
            }
        }else{
            return response()->json(['errors' => 'Could not get Company Bio.']);
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
        
       if($company = Company::find($id)) {
            $images = [];
            $images = $company['image'];
            Storage::delete($images);
            $company->delete();
            return response()->json(['status' => 'Deleted successfully.']);
       }
       else{
           return response()->json(['errors' => 'Could not delete in DB.']);
       }
    }
}
