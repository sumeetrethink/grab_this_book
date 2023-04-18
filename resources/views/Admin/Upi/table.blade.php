@foreach ($upis as $item)
    <tr>

        <td>{{ $item->id }}</td>
        <td>
            {{ $item->username }}
        </td>
        <td>
            {{ $item->upi_name }}
        </td>
        <td>{{ $item->id_upi }}</td>
        <td>
            <button style="text-transform: capitalize" onclick="activeUpi({{$item->id}})"  class="btn {{$item->status==="active"?"btn-primary":"btn-danger" }}">{{$item->status}}</button>
            
        </td>
        <td>
            <button onclick="openModal({{$item->id}})" title="Click here to Delete" class="btn btn-danger deleteCarat ">Delete</button>
        </td>
        

    </tr>
@endforeach
