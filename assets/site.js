$(document).ready(function() {
    $("[data-global-menu]").click(function(e) {
        e.preventDefault(), $("body").toggleClass("global-menu-on")
    });
    $(".global-menu__link").click(function(e) {
        e.preventDefault(), $("body").removeClass("global-menu-on");
    });


    $( "a.scrollLink" ).click(function( event ) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top - 50 }, 500);
    });

    var map = L.map('map').setView([41.899466, 12.4875926], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // $.ajax({
    //     url: "/api/map.geojson",
    //     dataType: "json"
    // }).done(function(e) {
    //     t(s = e)
    // })
    var sitiStyle = {
                  radius: 8,
                  stroke: true,
                  color: "#428BCA",
                  weight: 3,
                  opacity: 0.8,
                  fillColor: "#357EBD",
                  fillOpacity: 0.8
              };

    // function onEachFeature(feature, layer) {
    //     // var popupContent = "<p>I started out as a GeoJSON " +
    //     //     feature.geometry.type + ", but now I'm a Leaflet vector!</p>";
    //     var pContent;
    //     if (feature.properties && feature.properties.popupContent) {
    //         pContent += feature.properties.biblio;
    //     }
    //     layer.bindPopup(pContent);
    // }

    var biblio = new L.geoJson(null, {
        onEachFeature: function(feature, layer) {
            // var pContent;
            if (feature.properties) {
                var pContent = '<article class="popover"><header class="popover__header">';
                pContent += '<p class="popover__subtitle"> <a href="https://maps.google.com/?q=';
                pContent+= feature.properties.indirizzo + '">' + feature.properties.indi + '</a></p>';
                pContent += '<h1 class="popover__title"> <a href="' + feature.properties.link +'">';
                pContent += feature.properties.biblio + '</a></h1>';
                pContent += '<p class="popover__subtitle">' + 'DATA' + '</p>';
                pContent += '</article>';
            }
            // console.log("Eccole:" + feature.properties.biblio);
            // layer.bindPopup(feature.properties.biblio);
            layer.bindPopup(pContent);
        },
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, sitiStyle)
        }
    });
    // biblio.addTo(map);
    $.ajax({
     url: "data/biblio.geojson",
     dataType: "json",
     success: function(data) {
        // console.log("Data successfully loaded!"),
        // console.log(data),
        // $(data.features).each(function(key, data) {
        //     biblio.addData(data);
        // });
        biblio.addData(data);
        biblio.addTo(map);
        map.fitBounds(biblio.getBounds());
        // map.addLayer(biblio);
     },
     // success: console.log("Data successfully loaded!"),
     error: function (xhr) {
        alert(xhr.statusText)
     }
    })

});
