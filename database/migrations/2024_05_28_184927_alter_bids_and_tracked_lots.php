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
        Schema::dropIfExists('bids');
        Schema::dropIfExists('tracked_lots');

        Schema::create('bids', function (Blueprint $table) {
            $table->id();
            $table->timestamp('set_at')->useCurrent();
            $table->decimal('value', total: 10, places: 2);
            $table->foreignId('user_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('lot_id')->references('id')->on('lots')->cascadeOnUpdate()->noActionOnDelete();
        });

        Schema::create('tracked_lots', function (Blueprint $table) {
            $table->id();
            $table->timestamp('added_at')->useCurrent();
            $table->foreignId('user_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('lot_id')->references('id')->on('lots')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bids');
        Schema::dropIfExists('tracked_lots');

        Schema::create('tracked_lots', function (Blueprint $table) {
            $table->timestamp('added_at')->useCurrent();
            $table->primary('added_at');
            $table->foreignId('user_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('lot_id')->references('id')->on('lots')->cascadeOnUpdate()->cascadeOnDelete();
        });

        Schema::create('bids', function (Blueprint $table) {
            $table->timestamp('set_at')->useCurrent();
            $table->decimal('value', total: 10, places: 2);
            $table->primary('set_at');
            $table->foreignId('user_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('lot_id')->references('id')->on('lots')->cascadeOnUpdate()->noActionOnDelete();
        });
    }
};
