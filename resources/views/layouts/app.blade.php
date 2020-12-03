<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Mbucha Co. Ltd') }}</title>

    <!-- Scripts -->
    <script>
		addEventListener("load", function () {
			setTimeout(hideURLbar, 0);
		}, false);

		function hideURLbar() {
			window.scrollTo(0, 1);
		}
	</script>
	
    <!-- <script src="{{ asset('js/app.js') }}" defer></script> -->

    <!-- Fonts -->
    <link href="{{asset('front/css/font-awesome.css')}}" rel="stylesheet">

    <!-- Styles -->
    <link href="{{asset('front/css/bootstrap.css')}}" rel="stylesheet" type="text/css" media="all" />
	<link href="{{asset('front/css/style.css')}}" rel="stylesheet" type="text/css" media="all" />
    <!-- <link href="{{ asset('css/app.css') }}" rel="stylesheet"> -->
</head>
<body>
    <!-- header -->
	<div class="header-top">
		<div class="container">
			<div class="bottom_header_left">
				<p>
					<span class="fa fa-map-marker" aria-hidden="true"></span>
					{{ $company_data->location }}
				</p>
			</div>
			<div class="bottom_header_right">
				<div class="bottom-social-icons">
					<a class="facebook" href="{{$company_data->facebook}}">
						<span class="fa fa-facebook"></span>
					</a>
					<a class="twitter" href="{{$company_data->twitter}}">
						<span class="fa fa-twitter"></span>
					</a>
					<a class="pinterest" href="{{$company_data->instagram}}">
						<span class="fa fa-instagram"></span>
					</a>
					<a class="linkedin" href="{{$company_data->linkedin}}">
						<span class="fa fa-linkedin"></span>
					</a>
				</div>
				<div class="header-top-righ">
					<!-- <a href="login.html">
						<span class="fa fa-sign-out" aria-hidden="true"></span>Login</a> -->
				</div>
				<div class="clearfix"> </div>
			</div>
			<div class="clearfix"> </div>
		</div>
	</div>
	<div class="header">
		<div class="content white">
			<nav class="navbar navbar-default">
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-4 col-lg-4 col-sm-4 col-xs-10">
							<a class="navbar-brand" style="min-height:70px;" href="#">
								<span aria-hidden="true"> </span>
									<img class="col-md-4 col-xs-12" style="max-height:70px; max-width:400px;"  src="{{asset('storage/images/company/logo.jpeg')}}" alt="Logo">
							</a>
						</div>
						<div class="">
							<div class="navbar-header">
								<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
									<span class="sr-only">Toggle navigation</span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
								</button>
								
							</div>
							<!--/.navbar-header-->
							<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
								<nav class="link-effect-2" id="link-effect-2">
									<ul class="nav navbar-nav">
										<li class="active">
											<a href="{{asset('')}}" class="effect-3">Home</a>
										</li>
										<li>
											<a href="#about" class="effect-3  scrol">About</a>
										</li>
										<li>
											<a href="#news" class="effect-3  scrol">Projects</a>
										</li>
										<li>
											<a href="#services" class="effect-3 scrol">Services</a>
										</li>
										<li>
											<a href="#contact" class="effect-3 scrol">Contacts</a>
										</li>
										<li>
											<a href="{{asset('/gallery')}}" class="effect-3">Gallery</a>
										</li>
									</ul>
								</nav>
							</div>
							<!--/.navbar-collapse-->
							<!--/.navbar-->
						</div>
					</div>
					
				</div>
			</nav>
		</div>
	</div>
        <main class="py-4">
            @yield('content')
        </main>
    </div>
<!-- footer -->
<div class="mkl_footer">
		<div class="sub-footer">
			<div class="container">
				<div class="mkls_footer_grid">
					<div class="col-xs-4 mkls_footer_grid_left">
						<h4>Location:</h4>
						<p>{{$company_data->location}}</p>
					</div>
					<div class="col-xs-4 mkls_footer_grid_left">
						<h4>Mail Us:</h4>
						<p>
							<span>Phone : </span>{{$company_data->phone}}</p>
						<p>
							<span>Email : </span>
							<a href="mailto:{{$company_data->email}}">{{$company_data->email}}</a>
						</p>
					</div>
					<div class="col-xs-4 mkls_footer_grid_left">
						<h4>Opening Hours:</h4>
						
						<p>
						{{$company_data->workingDays}}
						</p>
					</div>
					<div class="clearfix"> </div>
				</div>
				<div class="botttom-nav-allah">
					<ul>
						<li>
							<a href="#" class="scrol">Home</a>
						</li>
						<li>
							<a href="#about" class="scrol">About Us</a>
						</li>
						<li>
							<a href="#services" class="scrol">Services</a>
						</li>
						<li>
							<a href="#contact" class="scrol">Contact Us</a>
						</li>
					</ul>
				</div>
				<!-- footer-button-info -->
				<div class="footer-middle-thanks">
					<h2>Thanks For Being our Client.</h2>
				</div>
				<!-- footer-button-info -->
			</div>
		</div>
		<div class="footer-copy-right">
			<div class="container">
				<div class="allah-copy">
					<p>Website Developed by
						<a href="#">0703993629</a>
					</p>
					<p> Design by
						<a href="http://w3layouts.com/">W3layouts</a>
					</p>
				</div>
				<div class="footercopy-social">
					<ul>
						<li>
							<a href="{{$company_data->facebook}}">
								<span class="fa fa-facebook"></span>
							</a>
						</li>
						<li>
							<a href="{{$company_data->twitter}}">
								<span class="fa fa-twitter"></span>
							</a>
						</li>
						<li>
							<a href="{{$company_data->instagram}}">
								<span class="fa fa-instagram"></span>
							</a>
						</li>
						<li>
							<a href="{{$company_data->linkedin}}">
								<span class="fa fa-linkedin"></span>
							</a>
						</li>
					</ul>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
	<!--/footer -->

	<!-- js files -->
	<!-- js -->
	<script>
  const navlink = document.querySelectorAll(".scrol");
  navlink.forEach(elem => elem.addEventListener("click", smoothscroll));
  function smoothscroll(event){
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href");
    window.scrollTo({
      top: document.querySelector(targetId).offsetTop,
      behavior: "smooth"
    })
  }

</script>
	<script src="{{asset('front/js/jquery-2.1.4.min.js')}}"></script>
	<!-- bootstrap -->
	<script src="{{asset('front/js/bootstrap.js')}}"></script>
	<!-- stats numscroller-js-file -->
	<script src="{{asset('front/js/numscroller-1.0.js')}}"></script>
	<!-- //stats numscroller-js-file -->

	<!-- Flexslider-js for-testimonials -->
	<script>
		$(window).load(function () {
			$("#flexiselDemo1").flexisel({
				visibleItems: 1,
				animationSpeed: 1000,
				autoPlay: true,
				autoPlaySpeed:10000,
				pauseOnHover: true,
				enableResponsiveBreakpoints: true,
				responsiveBreakpoints: {
					portrait: {
						changePoint: 480,
						visibleItems: 1
					},
					landscape: {
						changePoint: 640,
						visibleItems: 1
					},
					tablet: {
						changePoint: 768,
						visibleItems: 1
					}
				}
			});

		});
	</script>
	<script src="{{asset('front/js/jquery.flexisel.js')}}"></script>
	<!-- //Flexslider-js for-testimonials -->
	<!-- smooth scrolling -->
	<script src="{{asset('front/js/SmoothScroll.min.js')}}"></script>
	<script src="{{asset('front/js/move-top.js')}}"></script>
	<script src="{{asset('front/js/easing.js')}}"></script>
	<!-- here stars scrolling icon -->
	<script>
		$(document).ready(function () {

			$().UItoTop({
				easingType: 'easeOutQuart'
			});

		});
	</script>
	<!-- //here ends scrolling icon -->
	<!-- smooth scrolling -->
	<!-- //js-files -->
<!-- simple-lightbox -->
<script type="text/javascript" src="{{asset('front/js/simple-lightbox.js')}}"></script>	
	<script>
		$(function () {
			var gallery = $('.agileinfo-gallery-row a').simpleLightbox({
				navText: ['&lsaquo;', '&rsaquo;']
			});
		});
	</script>
	<link href="{{asset('front/css/simplelightbox.min.css')}}" rel="stylesheet" type="text/css">
	<!-- Light-box css -->
</body>
</html>