<?php
$API_KEY = 'AIzaSyAEk2zBHs073Jmo9vwGki_2damJgBPoiHY';
/**
 * Created by PhpStorm.
 * User: kath.young
 * Date: 12/20/17
 * Time: 12:03 PM
 */
?><!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Simple Polylines</title>
    <style>
        /* Always set the map height explicitly to define the size of the div
         * element that contains the map. */
        #map {
            height: 100%;
        }
        /* Optional: Makes the sample page fill the window. */
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <script src="map_mash.js"></script>
</head>
<body>
<div id="map"></div>
<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=<?php echo $API_KEY;?>&callback=initMap">
</script>
<div style="position: absolute;top: 0px; left: 0px;">
    <input type="text" id="debug">
</div>
</body>
</html>