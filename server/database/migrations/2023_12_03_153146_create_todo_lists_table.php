<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('todo_lists', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->boolean('completed')->default(false);
            $table->foreignId('user_id')->constrained();
            $table->string('details');
            $table->string('imageURL')->nullable();
            $table->boolean('repeat')->default(false);
            $table->foreignId('repeat_type_id')->nullable()->constrained();
            $table->datetime('start_time')->nullable();
            $table->datetime('start_day')->nullable();
            $table->integer('repeat_every')->nullable();
            $table->foreignId('parent_id')->nullable()->constrained('todo_lists');
            $table->foreignId('category_id')->nullable()->constrained();
            // $table->boolean('remind')->default(false);
            $table->integer('remind_time')->nullable();
            $table->timestamps();
            $table->boolean('push_notification')->default(false);
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todo_lists');
    }
};
