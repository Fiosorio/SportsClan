function obtenerClimaPorGeolocalizacion() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          const latitud = position.coords.latitude;
          const longitud = position.coords.longitude;
          obtenerClimaPorCoordenadas(latitud, longitud);
      }, function(error) {
          console.error("Error al obtener la ubicación:", error);
      });
  } else {
      console.error("Geolocalización no es compatible con este navegador.");
  }
}

function obtenerClimaPorCoordenadas(latitud, longitud) {
  const apiKey = "843df866c7664306a8a25139241105";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitud},${longitud}&aqi=no`;

  fetch(url)
      .then(res => res.json())
      .then(data => {
          const cityElement = document.getElementById("city");
          const tempElement = document.getElementById("temp");
          const weatherIconElement = document.getElementById("weather-icon");

          cityElement.innerText = data.location.name;
          tempElement.innerText = data.current.temp_c + "°C";
          weatherIconElement.src = "https:" + data.current.condition.icon;
      })
      .catch(error => {
          console.error('Error al obtener datos del clima:', error);
      });
}

// Llamar a la función para obtener el clima por geolocalización cuando se carga la página
obtenerClimaPorGeolocalizacion();