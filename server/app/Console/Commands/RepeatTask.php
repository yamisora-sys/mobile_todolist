<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\TodoList;
use Carbon\Carbon;
class RepeatTask extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sys:repeat-task';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $currentStartDay = Carbon::now()->startOfDay()->subDay();
        $currentEndDay = $currentStartDay->copy()->endOfDay();
        $todos = TodoList::where('repeat', true)->whereBetween('start_time', [$currentStartDay, $currentEndDay])->get();
            foreach ($todos as $todo) {
                $repeatType = $todo->repeatType()->name;
                $newTodo = $todo->replicate();
                $newTodo->push_notification = false;
                switch ($repeatType) {
                    case 'Daily':
                        $newTodo->start_time = Carbon::parse($todo->start_time)->addDays($todo->reapeat_every);
                        break;
                    case 'Weekly':
                        $newTodo->start_time = Carbon::parse($todo->start_time)->addWeeks($todo->reapeat_every);
                        break;
                    case 'Monthly':
                        $newTodo->start_time = Carbon::parse($todo->start_time)->addMonth($todo->reapeat_every);
                        break;
                    case 'Yearly':
                        $newTodo->start_time = Carbon::parse($todo->start_time)->addYear($todo->reapeat_every);
                        break;
                    default:
                        break;
                }
                $newTodo->completed = false;
                if($todo->parent_id == null){
                    $newTodo->parent_id = $todo->id;
                }
                $newTodo->save();
            }
    }
}
