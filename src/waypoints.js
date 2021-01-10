
// WAYPOINTS //
// --------------------------------------------------------------- //
// http://imakewebthings.com/waypoints/guides/getting-started/

// Declare our zoom points on the map
// Make them with geojson.io but note that its flipped
// http://geojson.io/#map=19/40.80805/-73.96041
const point_venice = L.latLng(33.99539435637889, -118.46677780151366);
const point_hollywood = L.latLng(34.1016774615434, -118.330135345459);
const point_nyc = L.latLng(40.80807627279606, -73.96046251058578);
const point_burbank = L.latLng(34.18539, -118.364295);
const point_koreatown = L.latLng(34.05776160573775, -118.30073833465576);

// This is a callback function
// it changes locations for us
const zoomToLocation = (point, zoomLevel) => {
    mainMap.flyTo(point, zoomLevel, {
        animate: true,
        duration: 2,
        easeLinearity: 0.1
    });
    // mainMap.setZoom(zoom);
};


const make_waypoint = (
    selector,
    triggerpoint,
    offsety,
    zoomLevel,
    callbacky = x => { }
) => {
    new Waypoint({
        element: document.querySelector(selector),
        handler: function (direction) {
            zoomToLocation(triggerpoint, zoomLevel);
            // callbacky = typeof callbacky !== undefined ? null: callbacky();
            callbacky();
            console.log(
                "Triggered a waypoint with params: " + selector + triggerpoint
            );
        },
        offset: offsety
    });
};

const globalZoom = 15;
const global_offset = 500;

make_waypoint(
    "#introduction",
    pointHome,
    -1 * global_offset,
    globalZoom,
    x => {
        mainMap.setZoom(initZoom);
    }
);

make_waypoint("#koreatown", point_koreatown, global_offset, globalZoom);
const ktownAnnotation = L.latLng(34.061779137567214, -118.29195141792297);
make_waypoint("#ktownAnnotation", ktownAnnotation, global_offset, 17);

const hollywoodAnnotation = L.latLng(34.10100227884199, -118.3399200439453);

make_waypoint("#hollywood", point_hollywood, global_offset, globalZoom);
make_waypoint(
    "#hollywoodAnnotation",
    hollywoodAnnotation,
    global_offset,
    16
);

const veniceAnnotation = L.latLng(33.98735281410265, -118.47379446029662);
make_waypoint("#venice", point_venice, global_offset, globalZoom, x => { });
make_waypoint(
    "#veniceAnnotation",
    veniceAnnotation,
    global_offset,
    16,
    x => { }
);

// make_waypoint("#burbank", point_burbank, 50);
make_waypoint("#appendix", point_nyc, global_offset, globalZoom);

var appendix = new Waypoint({
    element: document.getElementById('appendix'),
    handler: function (direction) {
        console.log('Hiding map legend!');
        toggleLegend();
    }
});
