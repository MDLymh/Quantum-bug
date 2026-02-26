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
        Schema::table('users', function (Blueprint $table) {
            $table->string('last_name')->after('name');
            $table->string('country_code',5)->after('maternal_surname')->nullable();
            $table->string('phone',20)->after('country_code')->nullable();
            $table->string('status')->default(1);
            $table->string('version')->default(1);
            $table->dateTime('phone_verified_at')->nullable()->after('phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('paternal_surname');
            $table->dropColumn('maternal_surname');
            $table->dropColumn('country_code');
            $table->dropColumn('phone');
            $table->dropColumn('status');
            $table->dropColumn('version');
            $table->dropColumn('phone_verified_at');
        });
    }
};
