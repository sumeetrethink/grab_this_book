@extends('Admin.index', ['title' => 'Get This Book | Dashboard'])
@section('content')
    <div class="content-header">
        <div class="container-fluid">
            @if (session()->has('msg-success'))
                <div class="alert alert-success">
                    <span class="glyphicon glyphicon-ok">
                        {{ session('msg-success') }}
                    </span>
                </div>
                {{ session()->forget('msg-success') }}
            @elseif(session()->has('msg-error'))
                {
                <div class="btn btn-danger">
                    <span class="glyphicon glyphicon-ok">
                        {{ session('msg-error') }}
                    </span>
                </div>
                {{ session()->forget('msg-error') }}
                }
            @endif
        </div>
    </div>
    <section class="content">
        <div class="card">
            <div class="card-body">
                <div class=" header-buttons ">
                    <form action="{{url('/upi')}}" method="get" id="search-form">
                    <div class="row">
                        <div class="form-group col-3">
                            <select class="form-control" name="user_id" id="user_id">
                                <option value="0">--Choose--</option>
                                @foreach ($admins as $item)
                                <option value="{{ $item->id }}">{{ $item->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        
                        <div class="form-group col-3">
                            <button class="btn btn-success" onclick="searchData()">Filter</button>
                        </div>
                    </form>
                    </div>
                </div>
                <div class="table-responsive table-hover">

                    <table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0"
                        role="grid" aria-describedby="dataTable_info" style="width: 100%;">


                        <thead>
                            <tr role="row">
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1"
                                    aria-label="Name: activate to sort column ascending" style="width: 90px;">S.No. <span
                                        data-sorting_type="asc" data-column_name="iCaratID " class="CaratArrow"> &#8593
                                        &#8595</span> </th>
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1"
                                    aria-label="Name: activate to sort column ascending" style="width: 90px;">Admin<span
                                        data-sorting_type="asc" data-column_name="iCaratID " class="CaratArrow"> &#8593
                                        &#8595</span> </th>
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1"
                                    aria-label="Name: activate to sort column ascending" style="width: 90px;">UPI Name<span
                                        data-sorting_type="asc" data-column_name="iCaratID " class="CaratArrow"> &#8593
                                        &#8595</span> </th>
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1"
                                    aria-label="Name: activate to sort column ascending" style="width: 90px;">UPi ID <span
                                        data-sorting_type="asc" data-column_name="iCaratID " class="CaratArrow"> &#8593
                                        &#8595</span> </th>

                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1"
                                    aria-label="Name: activate to sort column ascending" style="width: 90px;">Status<span
                                        data-sorting_type="asc" data-column_name="iCaratID " class="CaratArrow"> &#8593
                                        &#8595</span> </th>
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1"
                                    aria-label="Name: activate to sort column ascending" style="width: 90px;">Actions<span
                                        data-sorting_type="asc" data-column_name="iCaratID " class="CaratArrow"> &#8593
                                        &#8595</span> </th>
                            </tr>

                        </thead>
                        <tbody id="OrderTable">
                            @include('Admin.Upi.table')
                        </tbody>
                    </table>
                </div>

                <div class="page-links mt-4">
                    {{ $upis->links('pagination::bootstrap-4') }}
                </div>
                <input name="hidden_orders_page" id="hidden_orders_page" type="hidden" value="1">
                <input name="hidden_orders_column_name" id="hidden_orders_column_name" type="hidden"
                    value="iProductOrderID ">
                <input name="hidden_orders_sort_type" id="hidden_orders_sort_type" type="hidden" value="asc">
            </div>
        </div>

    </section>

    {{-- delete modal --}}
    {{-- MPOPPUP MODAL --}}
    <div class="modal fade show" id="modal-default" style=" padding-right: 17px;" aria-modal="true" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Default Modal</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <form action="{{ url('/upi/delete') }}" method="POST">
                    @csrf
                    <div class="modal-body">
                        <h4>Are you sure you want to delete this UPI?</h4>
                        <input type="hidden" name="deleteInput" id="deleteUPIInput" type="text">
                    </div>
                    <div class="modal-footer justify-content-between">

                        <button type="submit" class="btn btn-danger">Delete</button>
                </form>
            </div>
        </div>
    </div>
    </div>
    <script>
        function searchDate() {
            event.preventDefault();
        const url = new URL(window.location.href);
        const user_id = $('#user_id').val();
        url.searchParams.set('user', user_id ?? '');
        $('#search-form').attr('action', url.toString()).submit();
        }
    </script>
@endsection
