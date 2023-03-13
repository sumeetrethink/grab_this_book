<?php

namespace Database\Seeders;

use App\Models\adminModel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class admin_credentials extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin=new adminModel();
        $admin->name='admin';
        $admin->vUsername='admin';
        $admin->vPassword=Hash::make('admin');
        $admin->save();
    }
}
