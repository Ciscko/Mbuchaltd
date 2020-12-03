<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;


use App\Models\Company;
use App\Models\About;
use App\Models\Contact;
use App\Models\Client;
use App\Models\ProjectsModel as Project;
use App\Models\Service;
use App\Models\Slider;
use App\Models\Gallery;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public $data = [];
    public function __construct()
    {
        //$this->middleware('auth');
        $this->data['about'] = About::find(1);
        $this->data['testimonials'] = Client::where('status', 'approved')->get();
        $this->data['projects'] = Project::all();
        $this->data['services'] = Service::all();
        $this->data['sliders'] = Slider::all();
        $this->data['gallerys'] = Gallery::all();
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    
    public function index()
    {
        return view('home', $this->data);
    }

    public function gallery()
    {
        return view('gallery', $this->data);
    }

    public function contact(Request $request){
       $validator =  Validator::make($request->all(), [
            'email' => 'required|email|min:5',
            'name' => 'required',
            'message' => 'required',
            'phone' => 'required'
        ]);
        
        if($validator->fails()){
            $this->data['status'] = $validator->errors();
            
            return view('home', $this->data);
        }
        if(Contact::create($request->all())){
            $this->data['status'] = 'Submitted successfully.';
            return redirect()->action(
                [HomeController::class, 'index']
            );
            //return view('home', $this->data);
        }else{
            $this->data['status'] = 'Could not add to DB.';
            
            return view('home', $this->data);
        }
    }
    public function testimony(Request $request){
        $validator =  Validator::make($request->all(), [
             'name' => 'required',
             'title' => 'required',
             'message' => 'required'
         ]);
         $this->data['about'] = About::find(1);
         
         if($validator->fails()){
             $this->data['status'] = $validator->errors();
             return view('home', $this->data);
         }

         if(Client::create(array_merge($request->all(), ['status' => 'Unapproved', 'time' => date("Y-m-d H:i:s")]))){
             $this->data['status'] = 'Submitted successfully.';
             return redirect()->action(
                [HomeController::class, 'index']
            );
             //return view('home', $this->data);
         }else{
             $this->data['status'] = 'Could not add to DB.';
             
             return view('home', $this->data);
         }
     }
}
