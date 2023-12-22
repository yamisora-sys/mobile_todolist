<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\RepeatType;
class RepeatTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $repeatTypes = config('repeatdata.data');
        foreach ($repeatTypes as $repeatType) {
            RepeatType::create($repeatType);
        }
    }
}
