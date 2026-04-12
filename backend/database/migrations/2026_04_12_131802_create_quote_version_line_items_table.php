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
        Schema::create('quote_version_line_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quote_version_id')->constrained()->cascadeOnDelete();
            $table->string('description');
            $table->integer('quantity');
            $table->decimal('unit_price', 12, 2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quote_version_line_items');
    }
};
