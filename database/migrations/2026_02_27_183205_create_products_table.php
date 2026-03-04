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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
             $table->string('name');
            $table->text('description');
            $table->dateTime('release_date');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->string('current_version',20);
            $table->string('last_stable_version',20);
            $table->boolean('is_active')->default(true);
            $table->boolean('has_subscription')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
