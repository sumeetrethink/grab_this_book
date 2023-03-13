<?php

namespace Database\Seeders;

use App\Models\statesModel;
use App\Models\statusModel;
use Illuminate\Database\Seeder;

class status_seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        {
            $stauses = [
                        [
                            'title' => 'Accepted',
                        ],
                        [
                            'title' => 'Rejected',
                        ],
                        [
                            'title' => 'Initiated',
                        ],
                       
            ];
            foreach ($stauses as $status)
             {
            statusModel::create($status);
            }
            }
    }
}
