<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('questions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('text')->nullable();
            $table->integer('time_type')->default(0);
            $table->integer('answer_type')->default(0);
            $table->timestamp('start_time')->nullable();
            $table->timestamp('end_time')->nullable();
            $table->string('letters')->nullable();
            $table->integer('score')->nullable();
            $table->integer('tries')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('questions');
    }
}
