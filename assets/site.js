$(document).ready(function() {
    $("[data-global-menu]").click(function(e) {
        e.preventDefault(),
        $("body").toggleClass("global-menu-on")
    });
    $(".global-menu__link").click(function(e) {
        // e.preventDefault(),
        $("body").removeClass("global-menu-on");
    });


    $( ".scrollLink" ).click(function( event ) {
        // event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top - 10 }, 500);
    });

    var map = L.map('map').setView([41.899466, 12.4875926], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    map.scrollWheelZoom.disable();

    var biblioStyle = {
                  radius: 8,
                  stroke: true,
                  color: "#428BCA",
                  weight: 3,
                  opacity: 0.8,
                  fillColor: "#357EBD",
                  fillOpacity: 0.8
              };
    var convegniStyle = {
                  radius: 8,
                  stroke: true,
                  color: "#D2605A",
                  weight: 3,
                  opacity: 0.8,
                  fillColor: "#C8514C",
                  fillOpacity: 0.8
              };

    var biblio = new L.geoJson(null, {
        onEachFeature: function(feature, layer) {
            // var pContent;
            if (feature.properties) {
                var pContent = '<article class="popover"><header class="popover__header">';
                pContent += '<p class="popover__subtitle"> <a href="https://maps.google.com/?q=';
                pContent+= feature.properties.indirizzo + '">' + feature.properties.indi + '</a></p>';
                pContent += '<h1 class="popover__title"> <a href="' + feature.properties.link +'">';
                pContent += feature.properties.biblio + '</a></h1>';
                // DATA INCONTRO
                // pContent += '<p class="popover__subtitle">' + feature.properties.data + '</p>';
                pContent += '</article>';
            }
            // console.log("Eccole:" + feature.properties.biblio);
            // layer.bindPopup(feature.properties.biblio);
            layer.bindPopup(pContent);
        },
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, biblioStyle)
        }
    });
    $.ajax({
     // url: "data/biblio.geojson",
     url: "data/biblio.json",
     dataType: "json",
     success: function(data) {
        biblio.addData(data);
        biblio.addTo(map);
        map.fitBounds(biblio.getBounds());
     },
     error: function (xhr) {
        alert(xhr.statusText)
     }
    })

    var pathname = window.location.pathname;
    // if (window.location.pathname == '/index.htmll')
    // if (window.location.pathname == '/roma2021/index.html') {
    if (pathname.indexOf("index.html") >= 0) {
      // console.log(pathname)
      var convegni = new L.geoJson(null, {
          onEachFeature: function(feature, layer) {
              // var pContent;
              if (feature.properties) {
                  var pContent = '<article class="popover"><header class="popover__header">';
                  pContent += '<p class="popover__subtitle"> <a href="https://maps.google.com/?q=';
                  pContent+= feature.properties.indirizzo + '">' + feature.properties.indi + '</a></p>';
                  pContent += '<h1 class="popover__title"> <a href="' + feature.properties.link +'">';
                  pContent += feature.properties.biblio + '</a></h1>';
                  pContent += '<p class="popover__subtitle">' + feature.properties.data + '</p>';
                  pContent += '</article>';
              }
              // console.log("Eccole:" + feature.properties.biblio);
              // layer.bindPopup(feature.properties.biblio);
              layer.bindPopup(pContent).openPopup();
          },
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, convegniStyle)
          }
      });
      $.ajax({
       url: "data/convegni.geojson",
       dataType: "json",
       success: function(data) {
          convegni.addData(data);
          convegni.addTo(map);
          // map.fitBounds(biblio.getBounds());
       },
       error: function (xhr) {
          alert(xhr.statusText)
       }
      })

    }

});
