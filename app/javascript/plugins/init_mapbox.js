// importar o plugin
import mapboxgl from 'mapbox-gl';
// Importar o geocoder do mapbox para poder procurar no mapa
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 1 });
};

const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {

    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow); // add this

    // Create a HTML element for your custom marker
    const element = document.createElement('div');
    element.className = 'marker';
    element.style.backgroundImage = `url('${marker.image_url}')`;
    element.style.backgroundSize = 'contain';
    element.style.width = '40px';
    element.style.height = '40px';

    new mapboxgl.Marker(element)
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup) // add this
      .addTo(map);
  });
};

// criar uma função
const initMapbox = () => {
  // encontrar um elemento único na página
  const mapElement = document.getElementById('map');

  // se ele for encontrado na página, rodar o código
  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;

    // se fosse ruby, seria assim:
    // Mapboxgl::Map.new({})

    const attributes = {
      container: 'map',
      style: 'mapbox://styles/epems/ckfgv9jef20ae19qcweazlcvl'
    }

    const map = new mapboxgl.Map(attributes);

    // Depois de criar o mapa, vamos criar os markers
    const markers = JSON.parse(mapElement.dataset.markers);

    // adicionar os markers ao mapa conforme função acima
    addMarkersToMap(map, markers)

    // ajustar o mapa aos markers conforme a função acima (na linha 4 - ou algo perto disso)
    fitMapToMarkers(map, markers);

    // adicionando uma barra de pesquisa no nosso mapa
    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl }));
  }
};

// exportar a função
export { initMapbox };



