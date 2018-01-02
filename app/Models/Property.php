<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model {

    protected $table = 'property';

    public static function importRealEstateComAu($data){
        if(!isset($data['address']['location'])) return;

        $model = Property::query()->where('foreign_id',$data['prettyUrl'])->first();
        if(!$model){
            $model = new self();
        }
        $model->foreign_id = $data['prettyUrl'];
        $model->source = 'realestate.com.au';
        $model->address = $data['address']['streetAddress'];
        $model->suburb = $data['address']['locality'];
        $model->state = $data['address']['state'];
        $model->postCode = $data['address']['postCode'];
        $model->lat = $data['address']['location']['latitude'];
        $model->lng = $data['address']['location']['longitude'];
        $model->description = $data['description'];
        $model->agent_name = isset($data['listers'][0]['name']) ? $data['listers'][0]['name'] : json_encode($data['listers'][0]['website']);
        $model->agent_number = $data['listers'][0]['phoneNumber'];
        $model->display_price = $data['price']['display'];
        $model->bedrooms = isset($data['generalFeatures']['bedrooms']) ? $data['generalFeatures']['bedrooms']['value'] : 0;
        $model->bathrooms = isset($data['generalFeatures']['bathrooms']) ? $data['generalFeatures']['bathrooms']['value'] : 0;
        $model->carparks = isset($data['generalFeatures']['parkingSpaces']) ? $data['generalFeatures']['parkingSpaces']['value'] : 0;
        $model->save();

        // Now images
        foreach($data['images'] as $key => $img){


        }

    }
}