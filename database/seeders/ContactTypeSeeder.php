<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContactTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('contact_types')->insert([
            'name' => 'Telegram'
        ]);
        DB::table('contact_types')->insert([
            'name' => 'Номер телефону'
        ]);
        DB::table('contact_types')->insert([
            'name' => 'Viber'
        ]);
        DB::table('contact_types')->insert([
            'name' => 'Instagram'
        ]);
    }
}
