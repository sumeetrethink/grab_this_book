<?php

namespace Database\Seeders;

use App\Models\statusModel;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            admin_credentials::class,
            status_seeder::class,
        ]);
    }
}
           
           
