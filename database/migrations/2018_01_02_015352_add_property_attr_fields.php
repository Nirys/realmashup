<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPropertyAttrFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('property', function(Blueprint $table){
            $table->decimal('bedrooms',9,2);
            $table->decimal('bathrooms',9,2);
            $table->decimal('carparks', 9, 2)->nullable();
            $table->string('display_price');
        });

        Schema::table('property_image', function (Blueprint $table){
            $table->string("remote_url")->nullable();
            $table->boolean('is_primary');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('property', function(Blueprint $table){
            $table->dropColumn('bedrooms');
            $table->dropColumn('bathrooms');
            $table->dropColumn('carparks');

        });

        Schema::table('property_image', function (Blueprint $table){
            $table->dropColumn('remote_url');
            $table->dropColumn('is_primary');
        });
    }
}
