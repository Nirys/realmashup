var base_url = "https://m.realestate.com.au";
var apiKey = "AIzaSyAEk2zBHs073Jmo9vwGki_2damJgBPoiHY";
var suburbs = "woodcroft%2c+sa+5162%3b+bellevue+heights%2c+sa+5050%3b+happy+valley%2c+sa+5159%3b+eden+hills%2c+sa+5050%3b+blackwood%2c+sa+5051%3b+coromandel+valley%2c+sa+5051%3b+flagstaff+hill%2c+sa+5159";
var service;
//url = "https://m.realestate.com.au/buy/with-4-bedrooms-between-0-600000-in-" + suburbs + "/list-1?misc=ex-under-contract&adcall=1513823650764";
url = "dummy_data.html";

function getProperties(){
    return;
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
        center: {lat: -35.0751053416915, lng: 138.55304718017578},
        mapTypeId: 'terrain'
    });

    //var transitLayer = new google.maps.TransitLayer();
    //transitLayer.setMap(map);

    map.addListener('click', function(evt){
        var theValue = "{lat: " + evt.latLng.lat() + ", lng: " + evt.latLng.lng() + "}";
        document.getElementById("debug").value = theValue;
    });

    service = new google.maps.DirectionsService();
    addBusRoutes(map);
    window.map = map;
    getProperties();
}

function addBusRoutes(map){
    var blackwoodBusCoords = [{"lat":-35.01647,"lng":138.57119},
        {"lat":-35.01647,"lng":138.57119},
        {lat: -35.02367069023674, lng: 138.58566284179688},
        {lat: -35.027606725681196, lng: 138.58935356140137},
        {lat: -35.027747294870615, lng: 138.59939575195312},
        {"lat":-35.01679,"lng":138.57612},{"lat":-35.02268,"lng":138.60791},{"lat":-35.02117,"lng":138.61666},{"lat":-35.03388,"lng":138.62463},{"lat":-35.04656,"lng":138.62071},{"lat":-35.05927,"lng":138.61907},{"lat":-35.05847,"lng":138.61678},{"lat":-35.05821,"lng":138.60206},{"lat":-35.05817,"lng":138.60171},{"lat":-35.05817,"lng":138.60164},{"lat":-35.0639,"lng":138.59228},{"lat":-35.06393,"lng":138.59222},{"lat":-35.06585,"lng":138.59669},{"lat":-35.06585,"lng":138.59665},{"lat":-35.07953,"lng":138.59064},{"lat":-35.08072,"lng":138.59074},{"lat":-35.0809,"lng":138.58905},{"lat":-35.0809,"lng":138.58901},{"lat":-35.08259,"lng":138.58866},{"lat":-35.08496,"lng":138.58723},{"lat":-35.08561,"lng":138.5863},{"lat":-35.08384,"lng":138.58266},{"lat":-35.0839,"lng":138.58235},{"lat":-35.08429,"lng":138.58224},{"lat":-35.08499,"lng":138.58256},{"lat":-35.08531,"lng":138.58426},{"lat":-35.08623,"lng":138.58448},{"lat":-35.08818,"lng":138.58464},{"lat":-35.08827,"lng":138.58452},{"lat":-35.0884,"lng":138.58335},{"lat":-35.09137,"lng":138.57979},{"lat":-35.09094,"lng":138.57285},{"lat":-35.09156,"lng":138.57257},{"lat":-35.0923,"lng":138.57226},{"lat":-35.09268,"lng":138.56525},{"lat":-35.09297,"lng":138.55955},{"lat":-35.0931,"lng":138.55657},{"lat":-35.09359,"lng":138.54747},{"lat":-35.09398,"lng":138.53941},{"lat":-35.09399,"lng":138.53929},{"lat":-35.09664,"lng":138.53629},{"lat":-35.09762,"lng":138.53482},{"lat":-35.09861,"lng":138.53367},{"lat":-35.09869,"lng":138.53362},{"lat":-35.0991,"lng":138.53373},{"lat":-35.09919,"lng":138.53383},{"lat":-35.10096,"lng":138.53453},{"lat":-35.11475,"lng":138.53555},{"lat":-35.11503,"lng":138.53558}];
    blackwoodBus = addBusRoute(map, blackwoodBusCoords, '#000033');
    return;

    var seacliffBusCoords = [{"lat":-35.10586,"lng":138.49929},{"lat":-35.10586,"lng":138.49929},{"lat":-35.08365,"lng":138.51045},{"lat":-35.07154,"lng":138.52591},{"lat":-35.06082,"lng":138.53517},{"lat":-35.04788,"lng":138.53236},{"lat":-35.03449,"lng":138.52423},{"lat":-35.02963,"lng":138.52384},{"lat":-35.02497,"lng":138.52349},{"lat":-35.01925,"lng":138.52305},{"lat":-35.01896,"lng":138.52666},{"lat":-35.01823,"lng":138.54024},{"lat":-35.01728,"lng":138.5552},{"lat":-35.01742,"lng":138.55522},{"lat":-35.01736,"lng":138.55522},{"lat":-35.01713,"lng":138.55803},{"lat":-35.01711,"lng":138.55895},{"lat":-35.01788,"lng":138.55909},{"lat":-35.02242,"lng":138.55943},{"lat":-35.0257,"lng":138.55956},{"lat":-35.02817,"lng":138.55964},{"lat":-35.05072,"lng":138.57321},{"lat":-35.051,"lng":138.57343},{"lat":-35.04873,"lng":138.58325},{"lat":-35.05818,"lng":138.60183},{"lat":-35.05817,"lng":138.60164},{"lat":-35.05878,"lng":138.60053},{"lat":-35.06963,"lng":138.58371},{"lat":-35.06992,"lng":138.58325},{"lat":-35.07033,"lng":138.58313},{"lat":-35.07352,"lng":138.58345},{"lat":-35.08319,"lng":138.58216},{"lat":-35.0837,"lng":138.58227},{"lat":-35.08266,"lng":138.57427},{"lat":-35.08256,"lng":138.57394},{"lat":-35.08666,"lng":138.56533},{"lat":-35.08669,"lng":138.56485},{"lat":-35.09085,"lng":138.55992},{"lat":-35.0909,"lng":138.55939},{"lat":-35.09278,"lng":138.55943},{"lat":-35.09289,"lng":138.55944},{"lat":-35.09291,"lng":138.56091},{"lat":-35.09463,"lng":138.56142},{"lat":-35.09927,"lng":138.56315},{"lat":-35.09974,"lng":138.56238},{"lat":-35.10043,"lng":138.56009},{"lat":-35.10281,"lng":138.56025},{"lat":-35.10333,"lng":138.56029},{"lat":-35.1035,"lng":138.55845},{"lat":-35.10376,"lng":138.55314},{"lat":-35.10425,"lng":138.54353},{"lat":-35.10466,"lng":138.53533},{"lat":-35.10473,"lng":138.53489},{"lat":-35.11447,"lng":138.53552},{"lat":-35.11503,"lng":138.53558}];
    seacliffBus = addBusRoute(map, seacliffBusCoords, '#0000AA');

    var kangarillaBusCoords = [{"lat":-35.1485,"lng":138.65926},{"lat":-35.1485,"lng":138.65926},{"lat":-35.14851,"lng":138.6612},{"lat":-35.1476,"lng":138.66109},{"lat":-35.11051,"lng":138.63122},{"lat":-35.10971,"lng":138.62989},{"lat":-35.10915,"lng":138.6222},{"lat":-35.09337,"lng":138.61262},{"lat":-35.08782,"lng":138.61337},{"lat":-35.08765,"lng":138.61294},{"lat":-35.08756,"lng":138.61311},{"lat":-35.08765,"lng":138.61294},{"lat":-35.08381,"lng":138.58363},{"lat":-35.08391,"lng":138.58192},{"lat":-35.084,"lng":138.57972},{"lat":-35.08117,"lng":138.56945},{"lat":-35.08119,"lng":138.56933},{"lat":-35.08128,"lng":138.56914},{"lat":-35.08171,"lng":138.5684},{"lat":-35.08254,"lng":138.55935},{"lat":-35.08232,"lng":138.54751},{"lat":-35.08301,"lng":138.5464},{"lat":-35.08302,"lng":138.54637},{"lat":-35.08605,"lng":138.54612},{"lat":-35.09456,"lng":138.54688},{"lat":-35.10383,"lng":138.54757},{"lat":-35.10398,"lng":138.54759},{"lat":-35.10431,"lng":138.54244},{"lat":-35.10469,"lng":138.53504},{"lat":-35.10473,"lng":138.53489},{"lat":-35.10838,"lng":138.53506},{"lat":-35.11461,"lng":138.53553},{"lat":-35.11503,"lng":138.53558},{"lat":-35.11499,"lng":138.5388}];
    kangarillaBus = addBusRoute(map, kangarillaBusCoords, '#0000FF');

}

function addBusRoute(map, coords, color){
    path = [];
    for(var i=0; i < coords.length; i++){
        path.push(coords[i].lat + "," + coords[i].lng);

        var marker = new google.maps.Marker({
            position: coords[i], map: map
        });


    }

    jQuery.ajax({
        url: 'https://roads.googleapis.com/v1/snapToRoads',
        data: {
            interpolate: true,
            key: apiKey,
            path: path.join('|')
        },
        complete: function(response) {
            var data = jQuery.parseJSON( response.responseText);
            snappedCoordinates = [];
            placeIdArray = [];
            for (var i = 0; i < data.snappedPoints.length; i++) {
                var latlng = new google.maps.LatLng(
                    data.snappedPoints[i].location.latitude,
                    data.snappedPoints[i].location.longitude);
                snappedCoordinates.push(latlng);
                placeIdArray.push(data.snappedPoints[i].placeId);
            }
            var busRoute = new google.maps.Polyline({
                path: snappedCoordinates,
                geodesic: true,
                strokeColor: color,
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            busRoute.setMap(map);


        }
    });

    /*var busRoute = new google.maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    busRoute.setMap(map);
    return busRoute;*/
}