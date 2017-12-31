<?php
/**
 * Created by PhpStorm.
 * User: Kath
 * Date: 22/12/2017
 * Time: 3:45 PM
 */
header("Content-type: text/plain");
$obj = simplexml_load_file("Kangarilla_AM.xml");
$items = array();
foreach($obj->trk->trkseg->trkpt as $key=>$item){
    $attrs = [];
    foreach($item->attributes() as $key=>$value) $attrs[$key] = floatval($value . '');
    $items[] = array('lat'=>$attrs['lat'],'lng'=>$attrs['lon']);
}

file_put_contents("kangarilla.js", "var kangarillaBusCoords = " . json_encode($items) . ";");
