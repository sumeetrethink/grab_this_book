<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class payments implements FromCollection,WithHeadings
{
    protected $payments;

    function __construct($payments) {
           $this->payments = $payments;
           
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->payments;
    }
    public function headings(): array
    {
        return [
            'Category',
            'Box Name',
            'Product Type',
            'Product ',
           
         
          
        ];

    }
}
