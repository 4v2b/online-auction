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
        Schema::create('contact_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', 40);
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
        });

        Schema::create('people', function (Blueprint $table) {
            $table->foreignId('user_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->primary('user_id');
            $table->string('name', 30);
            $table->binary('profile_picture')->nullable();
        });

        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('value', 40);
            $table->foreignId('person_id')->references('user_id')->on('people')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('contact_type_id')->references('id')->on('contact_types')->cascadeOnUpdate()->cascadeOnDelete();
        });

        Schema::create('lots', function (Blueprint $table) {
            $table->id();
            $table->string('title', 70);
            $table->text('description');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('ends_at');
            $table->decimal('start_price', total: 10, places: 2);
            $table->foreignId('user_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();
        });

        Schema::create('bids', function (Blueprint $table) {
            $table->timestamp('set_at')->useCurrent();
            $table->decimal('value', total: 10, places: 2);
            $table->primary('set_at');
            $table->foreignId('user_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('lot_id')->references('id')->on('lots')->cascadeOnUpdate()->noActionOnDelete();
        });

        Schema::create('categories_lots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lot_id')->references('id')->on('lots')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('category_id')->references('id')->on('categories')->cascadeOnUpdate()->cascadeOnDelete();
        });

        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lot_id')->references('id')->on('lots')->cascadeOnUpdate()->cascadeOnDelete();
            $table->binary('photo');
        });

        Schema::create('tracked_lots', function (Blueprint $table) {
            $table->timestamp('added_at')->useCurrent();
            $table->primary('added_at');
            $table->foreignId('user_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('lot_id')->references('id')->on('lots')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tracked_lots');

        Schema::dropIfExists('photos');

        Schema::dropIfExists('categories_lots');

        Schema::dropIfExists('categories');

        Schema::dropIfExists('contacts');

        Schema::dropIfExists('contact_types');

        Schema::dropIfExists('bids');

        Schema::dropIfExists('lots');

        Schema::dropIfExists('people');
    }
};
