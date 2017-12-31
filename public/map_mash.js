var base_url = "https://m.realestate.com.au";
var apiKey = 'AIzaSyAEk2zBHs073Jmo9vwGki_2damJgBPoiHY';
var url = "https://m.realestate.com.au/buy/with-4-bedrooms-between-0-650000-in-woodcroft,+sa+5162%3b+bellevue+heights,+sa+5050%3b+happy+valley,+sa+5159%3b+eden+hills,+sa+5050%3b+blackwood,+sa+5051%3b+coromandel+valley,+sa+5051%3b+flagstaff+hill,+sa+5159/list-1?activeSort=list-date&misc=ex-under-contract&adcall=1514348785943";

url = "dummy_data.html";

function getProperties(){
    jQuery.ajax({
        url: url,
        complete: function(result){
            data = result.responseText;
            processResult(data);        }

    });
}

function processResult(input){
    var properties = new Array();
    var regex = /<script[\s\S]*?>([\s\S]*?)<\/script>/g;

    var matches;
    while (matches = regex.exec(input)) {
        if(matches[1].indexOf("REA.resultsData =") !== -1) {
            eval(matches[1] + "window.REA = REA");
        }
    }

    for(var i=0; i < REA.resultsData.tieredResults.length; i++){
        for(var x=0; x < REA.resultsData.tieredResults[i].results.length; x++){
            property = REA.resultsData.tieredResults[i].results[x];
            properties.push(property);
            addPropertyPin(property);
        }
    }
}

function addPropertyPin(property){
    var link = "https://www.realestate.com.au/" + property.prettyUrl;
    var addressString = property.address.streetAddress + ", " + property.address.locality;
    var price = property.price.display;
    var contentString = "<div style='padding: 5px; max-width: 520px'><b><a href='" + link + "'>" + addressString + "</a><br>" + price + "</b><br><br>";
    contentString += '<img src="' + property.mainImage.server + "/500x300/" + property.mainImage.uri + '"><br><br>';
    contentString += "<div style='max-height: 200px; overflow: auto;'>" + property.description + "</div>";
    contentString += '</div>';

    infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var  propertyPos = {lat: property.address.location.latitude, lng: property.address.location.longitude};
    var marker = new google.maps.Marker({
        position: propertyPos, map: window.map
    });
    marker.addListener('click', function() {
        if(window.currentInfowindow){
            window.currentInfowindow.close();
            window.currentInfowindow = null;
        }
        infowindow.setContent(contentString);
        infowindow.open(window.map, marker);
        window.currentInfowindow = infowindow;
    });

}

// This example creates a 2-pixel-wide red polyline showing the path of
// the first trans-Pacific flight between Oakland, CA, and Brisbane,
// Australia which was made by Charles Kingsford Smith.

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: -35.07805552755867, lng: 138.58180046081543},
        mapTypeId: 'terrain'
    });

    //var transitLayer = new google.maps.TransitLayer();
    //transitLayer.setMap(map);

    map.addListener('click', function(evt){
        var theValue = "{lat: " + evt.latLng.lat() + ", lng: " + evt.latLng.lng() + "}";
        document.getElementById("debug").value = theValue;
    });

    addBusRoutes(map);
    window.map = map;
    getProperties();
}

function addBusRoutes(map){
    blackwoodBus = addBusRoute(map, blackwoodBusCoords, '#2c6c7b');
    seacliffBus = addBusRoute(map, seacliffBusCoords, '#aa1070');
    kangarillaBus = addBusRoute(map, kangarillaBusCoords, '#0000FF');
}

function addBusRoute(map, coords, color){
    var pathValues = [];

    var busRoute = new google.maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    busRoute.setMap(map);
    return busRoute;


    for(var i=0; i < coords.length; i++){
//        var marker = new google.maps.Marker({
//            position: coords[i], map: map, label: "" + (i+1)
//        });
        pathValues.push(coords[i].lat + ',' + coords[i].lng);
    }

    jQuery.ajax({
        url: 'https://roads.googleapis.com/v1/snapToRoads',
        data: {
            interpolate: true,
            key: apiKey,
            path: pathValues.join('|')
        },
        complete : function(request){
            var data = jQuery.parseJSON(request.responseText);
            var coords = processSnapToRoadResponse(data);
            var busRoute = new google.maps.Polyline({
                path: coords,
                geodesic: true,
                strokeColor: color,
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            busRoute.setMap(map);
            return busRoute;

        }
    });
}

// Store snapped polyline returned by the snap-to-road service.
function processSnapToRoadResponse(data) {
    snappedCoordinates = [];
    placeIdArray = [];
    for (var i = 0; i < data.snappedPoints.length; i++) {
        var latlng = new google.maps.LatLng(
            data.snappedPoints[i].location.latitude,
            data.snappedPoints[i].location.longitude);
        snappedCoordinates.push(latlng);
        placeIdArray.push(data.snappedPoints[i].placeId);
    }
    return snappedCoordinates;
}
