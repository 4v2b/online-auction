<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            'name' => 'Антикваріат і Колекціонування'
        ]);
        DB::table('categories')->insert([
            'name' => 'Електроніка та Техніка'
        ]);
        DB::table('categories')->insert([
            'name' => 'Дім та Дозвілля'
        ]);
        DB::table('categories')->insert([
            'name' => 'Мода і Краса'
        ]);
        DB::table('categories')->insert([
            'name' => 'Дитячий світ'
        ]);
        DB::table('categories')->insert([
            'name' => 'Авто, Мото'
        ]);
        DB::table('categories')->insert([
            'name' => 'Ноутбуки, ПК і Планшети'
        ]);
        DB::table('categories')->insert([
            'name' => 'Телефони і Смартфони'
        ]);
        DB::table('categories')->insert([
            'name' => 'Спорт і Здоров\'я'
        ]);
        DB::table('categories')->insert([
            'name' => 'Інше'
        ]);
    }
}
