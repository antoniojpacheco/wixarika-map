  mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b25pb2pwYWNoZWNvIiwiYSI6ImNtaDljaXpjeTEycmYybnEzaXdrYThnZG8ifQ.xeHV0ObSbpRUSEwukMU97g';
  const map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/antoniojpacheco/cmmsrdhbs001501sk3jjufd5f',
          center: [-100, 30], // starting position [lng, lat]. Note that lat must be set between -90 and 90
          zoom: 4 // starting zoom
      });

  map.on('load', function() {
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

      // This is the click event for popUps
      map.on('click', 'points-layer', (e) => {
          // Get coordinates/geometry
          const coordinates = e.features[0].geometry.coordinates.slice();
          const properties = e.features[0].properties;

          // Create popup content using the properties from the data
           const popupContent = `
              <div>
                  <h3>${properties["Places and Items"] || ""}</h3>
                  <p><strong>Other names:</strong> ${properties["Other names"] || ""}</p>
                  <p><strong>Ecological/Environmental:</strong> ${properties["Ecological/Environmental"] || ""}</p>
                  <p><strong>Cultural Elements:</strong> ${properties["Cultural Elements"] || ""}</p>
                  <p><strong>Socio-Political:</strong> ${properties["Socio-Political"] || ""}</p>
                  <p><strong>Image:</strong> ${properties["Image"] || ""}</p>
                  <img src="${feature.properties.image}" style="width:50%; border-radius:8px;">
              </div>
    `      ;
        // Build and attach popup to coordinates
          new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(popupContent)
              .addTo(map);
      });

      // Change cursor to pointer when hovering over points
      map.on('mouseenter', 'points-layer', () => {
              map.getCanvas().style.cursor = 'pointer';
      });

      // Change cursor back when leaving points
      map.on('mouseleave', 'points-layer', () => {
            map.getCanvas().style.cursor = '';
      });       
  });
