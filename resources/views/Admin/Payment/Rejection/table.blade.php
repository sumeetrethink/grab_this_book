@foreach ($payments as $item)
    <tr>

        <td>{{ $item->id }}</td>
        <td>
            {{ $item->name }}
        </td>
        <td>{{ $item->phone }}</td>
        <td>{{ $item->state_id }}</td>
        <td class="text-bold">₹ {{ $item->amount }}</td>
        <td>
            {{ $item->status_name ?? 'Initiated' }}
        </td>

        <td>
                 <button onclick="revertPayment({{$item->id}})" title="Click here to Delete" class="btn btn-danger deleteCarat ">Revert</button>
        </td>

    </tr>
@endforeach
