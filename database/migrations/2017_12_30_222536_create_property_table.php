<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePropertyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('property', function (Blueprint $table) {
            $table->increments('id');
            $table->string("foreign_id");
            $table->string("source");
            $table->string("address");
            $table->string("suburb");
            $table->string("postcode");
            $table->string("state");
            $table->integer('status')->nullable();
            $table->float('weighted_score')->nullable();
            $table->float("lat")->nullable();
            $table->float("lng")->nullable();
            $table->text("description")->nullable();
            $table->string("agent_name")->nullable();
            $table->string("agent_number")->nullable();
            $table->timestamps();
        });

        Schema::create('property_image', function(Blueprint $table){
            $table->increments('id');
            $table->integer("property_image_property_id");
            $table->string("path")->nullable();
            $table->string("image_type");
            $table->timestamps();
            $table->index(['property_image_property_id']);
            $table->index(['image_type']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('property');
    }
}
