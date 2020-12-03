<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Contact;

use App\Http\Resources\ContactResource;

use Validator;

use Illuminate\Support\Facades\Storage;


class ContactController extends Controller
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
        if(Contact::all()){
            return new ContactResource(Contact::all());
        }else{
            return response()->json(['errors' => 'Could not get Contact.']);
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
            'name' =>'string|required|min:5',
            'phone' =>'string|required|min:5',
            'email' =>'string|required|min:5',
            'message' =>'string|required|min:5'
        ]);
      
        if($contact = Contact::create($request->all())){
            return response()->json(['status' => 'Created Successfully.', 'contact' => $contact], 201);
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
        if($contact = Contact::find($id)){
            return response()->json(['data' => $contact]);
        }else{
            return response()->json(['errors' => 'Could not get the Contact....']);
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
        if($contact = Contact::findorfail($id)){
            $validator =  Validator::make($request->all(), [
            'name' =>'string|required|min:5',
            'phone' =>'string|required|min:5',
            'email' =>'string|required|min:5',
            'message' =>'string|required|min:5'
            ]);
            if($validator->fails()){
                return response()->json(['errors' => $validator->errors()]);
            }
           
            if($contact->fill($request->all())->save()){
                return response()->json(['status' => 'Updated Successfully.', 'contact' => $contact], 200);
            }else{
                return response()->json(['errors' => 'Errors updating DB.']);
            }
        }else{
            return response()->json(['errors' => 'Could not get Contact.']);
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
        
       if($contact = Contact::find($id)) {
            $contact->delete();
            return response()->json(['status' => 'Deleted successfully.']);
       }
       else{
           return response()->json(['errors' => 'Could not delete in DB.']);
       }
    }
}
