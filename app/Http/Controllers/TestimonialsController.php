<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Client;

use App\Http\Resources\ClientResource;

use Validator;

use Illuminate\Support\Facades\Storage;


class TestimonialsController extends Controller
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
        if(Client::all()){
            return new ClientResource(Client::all());
        }else{
            return response()->json(['errors' => 'Could not get Client.']);
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
            'title' =>'string|required|min:5',
            'message' =>'string|required|min:5'
        ]);
        $request['time'] = date("Y-m-d H:i:s");
        $request['status'] = 'Unapproved';
        if($client = Client::create($request->all())){
            return response()->json(['status' => 'Created Successfully.', 'client' => $client], 201);
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
        if($client = Client::find($id)){
            return response()->json(['data' => $client]);
        }else{
            return response()->json(['errors' => 'Could not get the Client....']);
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
        if($client = Client::findorfail($id)){
            $validator =  Validator::make($request->all(), [
                'name' =>'string|required|min:5',
                'title' =>'string|required|min:5',
                'status' =>'string|required',
                'message' =>'string|required|min:5'
            ]);
            if($validator->fails()){
                return response()->json(['errors' => $validator->errors()]);
            }
            //$request['time'] = date("Y-m-d H:i:s");
            if($client->fill($request->all())->save()){
                return response()->json(['status' => 'Updated Successfully.', 'client' => $client], 200);
            }else{
                return response()->json(['errors' => 'Errors updating DB.']);
            }
        }else{
            return response()->json(['errors' => 'Could not get Client.']);
        }
    }

    public function toggle(Request $request, $id)
    {
        if($client = Client::findorfail($id)){
           $status = $client['status'] === 'Unapproved' ? 'Approved' : 'Unapproved';
            $request['status'] = $status;
            if($client->fill($request->all())->save()){
                return response()->json(['status' => 'Updated Successfully.', 'client' => $client], 200);
            }else{
                return response()->json(['errors' => 'Errors updating DB.']);
            }
        }else{
            return response()->json(['errors' => 'Could not get Client.']);
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
        
       if($client = Client::find($id)) {
            $client->delete();
            return response()->json(['status' => 'Deleted successfully.']);
       }
       else{
           return response()->json(['errors' => 'Could not delete in DB.']);
       }
    }
}
