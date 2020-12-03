@extends('layouts.app')

@section('content')
        <!-- Gallery -->
	<div class="gallery">
		<div class="container">
			<div class="title-div">
				<h3 class="tittle">
					<span>O</span>ur <span>G</span>allery
				</h3>
				<div class="tittle-style">
				</div>
			</div>
			<div class="agileinfo-gallery-row">
                @foreach($gallerys as $gallery)
                    <?php $images = explode("|",$gallery->images)?>
                    @foreach($images as $image)
                        @if($image !== '')
                            <div class="col-xs-4 w3gallery-grids">
                                <a href="{{asset('storage/'.$image)}}" class="imghvr-hinge-right figure">
                                    <img src="{{asset('storage/'.$image)}}" alt="" title="{{$gallery->description}}" />
                                    <div class="agile-figcaption">
                                        <h4>{{$gallery->title}}</h4>
                                    </div>
                                </a>
                            </div>
                        @endif
                    @endforeach
                @endforeach
				
				<div class="clearfix"> </div>
			</div>
		</div>
	</div>
	<!-- //Gallery -->
@endsection