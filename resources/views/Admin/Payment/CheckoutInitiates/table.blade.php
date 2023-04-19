@foreach ($payments as $item)
    <tr>

        <td>{{ $item->id }}</td>
        <td>
            {{ $item->name }}
        </td>
        <td>{{ $item->phone }}</td>
        <td>{{ $item->state_id }}</td>
        <td class="text-bold">₹ {{ $item->amount }}</td>
        <td class="">{{ \Carbon\Carbon::parse($item->updated_at)->format('F j, Y,') }}</td>
        <td>
            {{ $item->status_name ?? 'Initiated' }}
        </td>

        <td>
            <a title="Click here to Edit" onclick="changeStatuue({{ $item->id }},'Accepted')" class="btn btn-primary"
                style="margin-right:5px">Approve</a>
            <button onclick="changeStatuue({{ $item->id }},'Rejected')"title="Click here to Delete"
                class="btn btn-danger deleteCarat ">Reject</button>
        </td>

    </tr>
@endforeach
