@extends('Admin.index', ['title' => 'Get This Book | Admin'])
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
                <div class=" header-buttons float-right">

                </div>
                <br>
                <br>
                
                <br>
                <br>
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
                                    aria-label="Name: activate to sort column ascending" style="width: 90px;">Name<span
                                        data-sorting_type="asc" data-column_name="iCaratID " class="CaratArrow"> &#8593
                                        &#8595</span> </th>
                               
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1"
                                    aria-label="Name: activate to sort column ascending" style="width: 90px;">Actions<span
                                        data-sorting_type="asc" data-column_name="iCaratID " class="CaratArrow"> &#8593
                                        &#8595</span> </th>
                            </tr>

                        </thead>
                        <tbody id="OrderTable">
                            @include('Admin.Admin.table')
                        </tbody>
                    </table>
                </div>

                <div class="page-links mt-4">
                    {{ $admins->links('pagination::bootstrap-4') }}
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
                <form action="{{ url('/admin/delete') }}" method="POST">
                    @csrf
                    <div class="modal-body">
                        <h4>Are you sure you want to delete this user?</h4>
                        <input type="hidden" name="deleteInput" id="deleteInput" type="text">
                    </div>
                    <div class="modal-footer justify-content-between">

                        <button type="submit" class="btn btn-danger">Delete</button>
                </form>
            </div>
        </div>
    </div>
    </div>
    <script>
        function openCusomtModal(id)
        {
            $('#modal-default').modal('show')
            $('#deleteInput').val(id)
        }
    </script>
@endsection
