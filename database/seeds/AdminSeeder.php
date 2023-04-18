<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin=new User();
        $admin->name='Super Admin';
        $admin->username='admin';
        $admin->password=Hash::make('admin');
        $admin->role="Super Admin";
        $admin->save();
    }
}
