mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b25pb2pwYWNoZWNvIiwiYSI6ImNtaDljaXpjeTEycmYybnEzaXdrYThnZG8ifQ.xeHV0ObSbpRUSEwukMU97g';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/antoniojpacheco/cmmsrdhbs001501sk3jjufd5f',
    center: [-100, 30],
    zoom: 4
});

map.on('load', function () {

    map.addSource('points-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/antoniojpacheco/wixarika-map/main/data/map-data.geojson'
    });

    map.addLayer({
        id: 'points-layer',
        type: 'circle',
        source: 'points-data',
        paint: {
            'circle-color': '#4264FB',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });

    // POPUP
    map.on('click', 'points-layer', (e) => {

        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        const popupContent = `
            <div>
                <h3>${properties["Places and Items"] || ""}</h3>

                <p><strong>Other names:</strong> ${properties["Other names"] || ""}</p>
                <p><strong>Ecological/Environmental:</strong> ${properties["Ecological/Environmental"] || ""}</p>
                <p><strong>Cultural Elements:</strong> ${properties["Cultural Elements"] || ""}</p>
                <p><strong>Socio-Political:</strong> ${properties["Socio-Political"] || ""}</p>

                <img src="${properties["Image"] || ""}" style="width:100%; border-radius:8px; margin-top:10px;">
            </div>
        `;

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });

    // Cursor pointer on hover
    map.on('mouseenter', 'points-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'points-layer', () => {
        map.getCanvas().style.cursor = '';
    });

});
