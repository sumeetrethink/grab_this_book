@foreach ($admins as $item)
    <tr>

        <td>{{ $loop->iteration }}</td>
        <td>
            {{ $item->name }}
        </td>
        
        <td>
            <button onclick="openCusomtModal({{$item->id}})" title="Click here to Delete" class="btn btn-danger">Delete</button>
            <a href="{{url('admin/edit?id='.$item->id)}}" title="Click here to Delete" class="btn btn-primary">Edit</a>
        </td>
        

    </tr>
@endforeach
