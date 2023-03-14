<?php

use App\State;
use App\Status;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
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
        foreach ($stauses as $status) {
            Status::create($status);
        }
    }
}
