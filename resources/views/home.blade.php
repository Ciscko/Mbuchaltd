@extends('layouts.app')

@section('content')
    <!-- banner -->
	<div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="3000">
		<!-- Indicators -->
		<ol class="carousel-indicators">
			<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
			<li data-target="#myCarousel" data-slide-to="1" class=""></li>
			<li data-target="#myCarousel" data-slide-to="2" class=""></li>
			<li data-target="#myCarousel" data-slide-to="3" class=""></li>
		</ol>
		<div class="carousel-inner" role="listbox">
		<?php $i=0; ?>
			@foreach($sliders as $slider)
				@if($i===0)
					<div class="item active" style="background: url({{ asset('storage/'.explode('|', $slider->images)[0]) }}) no-repeat center;">
						<div class="container">
							<div class="carousel-caption">
								<h6>{{ $slider->title1 }}</h6>
								<h3>{{explode(" ", $slider->title2)[0]}}
									<span>{{implode(array_slice(explode(" ", $slider->title2), 1))}}
										</span>
								</h3>
								<p>{{$slider->title3}}</p>
							</div>
						</div>
					</div>
				@else
					<div class="{{ 'item '.strval($i+2)}}" style="background: url({{ asset('storage/'.explode('|', $slider->images)[0]) }}) no-repeat center;">
						<div class="container">
							<div class="carousel-caption">
								<h6>{{ $slider->title1 }}</h6>
								<h3>{{explode(" ", $slider->title2)[0]}}
									<span>{{implode(array_slice(explode(" ", $slider->title2), 1))}}
										</span>
								</h3>
								<p>{{$slider->title3}}</p>
							</div>
						</div>
					</div>
				@endif
				<?php $i++; ?>
			@endforeach
			
			
			
		</div>
		<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
			<span class="fa fa-chevron-left" aria-hidden="true"></span>
			<span class="sr-only">Previous</span>
		</a>
		<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
			<span class="fa fa-chevron-right" aria-hidden="true"></span>
			<span class="sr-only">Next</span>
		</a>
		<!-- The Modal -->
	</div>
	<!--//banner -->
    <!-- about -->
	<div class="banner-bottom-w3l" id="about">
		<div class="container">
			<div class="title-div">
				<h3 class="tittle">
					<span>W</span>elcome
				</h3>
				<div class="tittle-style">

				</div>
			</div>
			<div class="welcome-sub-wthree"> 
				<div class="col-md-6 banner_bottom_left">
					<h4>About
						<span>Mbucha Co. Ltd.</span>
					</h4>
					<p>{{$about->content}}</p>
				</div>
				<!-- Stats-->
				<div class="col-md-6 stats-info-agile" style="background: url({{asset('front/images/a1.jpg')}}) no-repeat center;">
					<div class="col-xs-6 stats-grid stat-border">
						<div class='numscroller numscroller-big-bottom' data-slno='1' data-min='0' data-max='10' data-delay='5' data-increment="1">10</div>
						<p>Projects</p>
					</div>
					<div class="col-xs-6 stats-grid">
						<div class='numscroller numscroller-big-bottom' data-slno='1' data-min='0' data-max='30' data-delay='3' data-increment="1">30</div>
						<p>Employees</p>
					</div>
					<div class="clearfix"></div>
					<div class="child-stat">
						<div class="col-xs-6 stats-grid stat-border border-st2">
							<div class='numscroller numscroller-big-bottom' data-slno='1' data-min='0' data-max='50' data-delay='3' data-increment="1">50</div>
							<p>Testimonials</p>
						</div>
						<div class="col-xs-6 stats-grid">
							<div class='numscroller numscroller-big-bottom' data-slno='1' data-min='0' data-max='6' data-delay='5' data-increment="1">6</div>
							<p>Happy Clients</p>
						</div>
						<div class="clearfix"></div>
					</div>
				</div>
				<!-- //Stats -->
				<div class="clearfix"> </div>
			</div>
		</div>
	</div>
    <!-- //about -->
    <!-- services -->
	<div class="services" id="services">
		<div class="container">
			<div class="title-div">
				<h3 class="tittle">
					<span>O</span>ur
					<span>S</span>ervices
				</h3>
				<div class="tittle-style">

				</div>
			</div>
			<div class="services-moksrow">
				@foreach($services as $service)
					<div class="col-xs-4 services-grids-w3l" style="margin-bottom: 4em;">
						<div class="servi-shadow">
							<span class="{{$service->icon}}" aria-hidden="true"></span>
							<h4>{{$service->title}}</h4>
							<p>{{$service->description}}</p>
						</div>
					</div>
				@endforeach
				<div class="clearfix"> </div>
			</div>
			
		</div>
	</div>
	<!-- //services -->
	<!-- news -->
	<div class="news" id="news">
		<div class="container">
			<div class="title-div">
				<h3 class="tittle">
					<span>O</span>ur
					 
					<span>P</span>rojects
				</h3>
				<div class="tittle-style">

				</div>
			</div>
			<div class="yaallahaa-news-grids-agile">
				<div class="yaallahaa-news-grid">
					@foreach($projects as $project)
					
					<div class="col-md-6 yaallahaa-news-left" style="margin-bottom: 2em;">
						<div class="col-xs-6 news-left-img" style="background: url({{asset('storage/'.explode('|',$project->images)[0])}}) no-repeat 0px 0px !important; background-size: cover!important;">
							<div class="news-left-text color-event1">
								<h5>{{$project->status}}</h5>
							</div>
							<br><br>
						</div>
						<div class="col-xs-6 news-grid-info-bottom-w3ls">
							<div class="news-left-top-text text-color1">
								<a href="#" data-toggle="modal" data-target="#myModal">{{$project->title}} </a>
							</div>
							<div class="date-grid">
								<div class="admin">
									<a href="#">
										<span class="fa fa-clock-o" aria-hidden="true"></span> {{$project->span}}</a>
								</div>
								<div class="time">
									<p>
										<span class="fa fa-map-marker" aria-hidden="true"></span> {{$project->location}}</p>
								</div>
								<div class="clearfix"> </div>
							</div>
							<div class="news-grid-info-bottom-w3ls-text">
								<p>{{$project->description}}</p>
							</div>
						</div>
						<div class="clearfix"> </div>
					</div>
					
					@endforeach
					
				</div>
				
			</div>
		</div>
	</div>
	<!-- news -->
	<!-- modal -->
	<div class="modal about-modal fade" id="myModal" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">Best
						<span>Study</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="model-img-info">
						<img src="{{asset('front/images/e1.jpg')}}" alt="" />
						<p>Duis venenatis, turpis eu bibendum porttitor, sapien quam ultricies tellus, ac rhoncus risus odio eget nunc. Pellentesque
							ac fermentum diam. Integer eu facilisis nunc, a iaculis felis. Pellentesque pellentesque tempor enim, in dapibus turpis
							porttitor quis. Suspendisse ultrices hendrerit massa. Nam id metus id tellus ultrices ullamcorper. Cras tempor massa
							luctus, varius lacus sit amet, blandit lorem. Duis auctor in tortor sed tristique. Proin sed finibus sem</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- //modal -->
	<!-- middle section -->
	<div class="middle-sec-agile" style="background: url({{asset('front/images/bg4.jpg')}}) no-repeat center; background-size: cover;">
		<div class="container">
			<h4>Our
				<span>Focus as </span>Mbucha Co. Ltd. </h4>
			<ul>
				<li>
					<div class="midle-left-w3l">
						<span class="fa fa-check" aria-hidden="true"></span>
					</div>
					<div class="middle-right">
						<h5>Our Mission!</h5>
						<p>{{$company_data->mission}}</p>
					</div>
					<div class="clearfix"></div>
				</li>
				<li>
					<div class="midle-left-w3l">
						<span class="fa fa-check" aria-hidden="true"></span>
					</div>
					<div class="middle-right">
						<h5>Our Vision: </h5>
						<p>{{$company_data->vision}}</p>
					</div>
					<div class="clearfix"></div>
				</li>
				<li>
					<div class="midle-left-w3l">
						<span class="fa fa-check" aria-hidden="true"></span>
					</div>
					<div class="middle-right">
						<h5>Our Objective!</h5>
						<p>{{$company_data->objective}}</p>
					</div>
					<div class="clearfix"></div>
				</li>
			</ul>
			<a class="button-style scrol" href="#contact">Talk to Us Now</a>
		</div>
		<div class="pencil-img">
			<img src="" alt="" />
		</div>
	</div>
	<!-- //middle section -->
	<!-- contact -->
	<div class="contact" id="contact">
		<div class="container">
			<div class="title-div">
				<h3 class="tittle">
					<span>C</span>ontact
					<span>U</span>s
				</h3>
				<div class="tittle-style">

				</div>
			</div>
			<div class="contact-row">
				<div class="col-md-6 contact-text1">
					<h4>Contact Our
						<span>Customer Care</span>
					</h4>
					<p>Aliquam erat volutpat. Duis vulputate tempus laoreet.Aliquam erat volutpat. Duis vulputate tempus laoreet.Aliquam erat
						volutpat. Duis vulputate tempus laoreet.
					</p>
				</div>
				<div class="col-md-6 contact-w3lsright">
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8518303744845!2d36.79978901427464!3d-1.2611551359538125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f176b69033ae5%3A0x527c0b54641e212!2sSarit%20Centre%2C%20Karuna%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1606542960659!5m2!1sen!2ske" style="border:2px solid pink; padding:1px;" allowfullscreen="" ></iframe>
					<!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26370863.006641828!2d-113.70834778640587!3d36.212776709411365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited+States!5e0!3m2!1sen!2sin!4v1511345829734"
					    allowfullscreen></iframe> -->
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
	<div class="contact-lsleft" style="background: url({{asset('front/images/bg7.jpg')}}) no-repeat center;
	 background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    -ms-background-size: cover;">
		<div class="container">
			<div class="address-grid">
				<h4>Contact Details</h4>
				<ul class="w3_address">
					<li>
						<span class="fa fa-globe" aria-hidden="true"></span>{{$company_data->location}}
					</li>
					<li>
						<span class="fa fa-envelope-o" aria-hidden="true"></span>
						<a href="{{$company_data->email}}">{{$company_data->email}}</a>
					</li>
					<li>
						<span class="fa fa-phone" aria-hidden="true"></span>{{$company_data->phone}}
					</li>
				</ul>
			</div>
			<div class="contact-grid agileits">
				<h4>Get In Touch</h4>
				 @if(isset($status))
						<div class="alert alert-danger alert-dismissible show" role="alert">
						<strong>Holy guacamole!</strong> <b> {{ $status }} </b>	
						<button type="button"  class="close" data-dismiss="alert" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						</div>
				 @endif
				<form action="{{asset('contact')}}" method="post">
					@csrf()
					<div class="">
						<input type="text" name="name" placeholder="Name" required="">
					</div>
					<div class="">
						<input type="email" name="email" placeholder="Email" required="">
					</div>
					<div class="">
						<input type="text" name="phone" placeholder="Phone Number" required="">
					</div>
					<div class="">
						<textarea name="message" placeholder="Message..." required=""></textarea>
					</div>
					<input type="submit" value="Submit">
				</form>
			</div>
		</div>
	</div>
	<!-- //contact -->
	<!-- testimonials -->
	<div class="testimonials">
		<div class="container">
			<div class="title-div">
				<h3 class="tittle">
					<span>O</span>ur
					<span>C</span>lient's
					<span>S</span>ay
				</h3>
				<div class="tittle-style">

				</div>
			</div>
			<div class="row">
			<div class="col-lg-8 col-md-8">
					<ul id="flexiselDemo1">
					@foreach($testimonials as $testimonial)
						<li>
							<div class="three_testimonials_grid_main">
								
								<div class="col-xs-12 three_testimonials_grid" style="text-align:center;">
									<div class="three_testimonials_grid1">
										<h5>{{ $testimonial->name}}</h5>
										<p>{{ $testimonial->title}}</p>
									</div>
									<p>
										{{ $testimonial->message}}
									</p>
								</div>
								<div class="clearfix"> </div>
							</div>
						</li>
					@endforeach

					</ul>
					</div>
					<div class="col-lg-4 col-md-4">
					<form action="{{asset('testimony')}}" method="post">
						@csrf()
						<div class="">
							<input type="text" name="name" placeholder="Name" required="">
						</div>
						<div class="">
							<input type="text" name="title" placeholder="Title" required="">
						</div>
						<div class="">
							<textarea name="message" placeholder="Message..." required=""></textarea>
						</div>
						<input type="submit" value="Submit">
					</form>
					</div>
					
			</div>
			
		</div>
	</div>
	<!-- //testimonials -->
	
@endsection
