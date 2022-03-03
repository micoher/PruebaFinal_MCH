var mapMain;
var legendLayers;

var webmapId = "7d987ba67f4640f0869acb82ba064228";


require([    
    "esri/map",
    "esri/tasks/locator",
    "esri/tasks/AddressCandidate",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/Font",
    "esri/symbols/TextSymbol",
    "esri/graphic",
    "esri/layers/FeatureLayer",
    "esri/geometry/Extent",
    "esri/tasks/ServiceAreaTask",
    "esri/tasks/ServiceAreaParameters",
    "esri/tasks/FeatureSet",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/geometry/Point",
    "esri/tasks/query",

    

    "dojo/_base/Color",
    "dojo/_base/array",

    "dojo/dom",
    "dojo/on",
    "dojo/parser",
    "dojo/ready",

    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dojo/domReady!"
        ],
    function (Map,Locator,AddressCandidate, SimpleMarkerSymbol,Font,TextSymbol, Graphic, FeatureLayer, Extent, ServiceAreaTask, ServiceAreaParameters, FeatureSet, SimpleFillSymbol, SimpleLineSymbol, Point, Query,
        Color, arrayUtils,
        dom, on, parser, ready,
        BorderContainer, ContentPane) {
                ready(function(){
                    parser.parse();
                
                
                    mapMain = new Map("divmap", {
                        basemap: "streets-vector",
                        extent: new Extent({
                            xmin: -449786.9006735621,
                            ymin: 4910183.260269083,
                            xmax: -371515.3837096471,
                            ymax: 4946949.470874203,
                            spatialReference: {
                                wkid: 102100
                            }}),                       
                        Zoom: 5,
                        sliderStyle: "small", 
                     });

                    var centrosSalud = new FeatureLayer(
                        url= "https://services5.arcgis.com/zZdalPw2d0tQx8G1/ArcGIS/rest/services/CENTROS_SALUD_MCH/FeatureServer/0"
                    )

                    mapMain.addLayer(centrosSalud);

                    

                    // var serviceAreaTask = new ServiceAreaTask("https://formacion.esri.es/server/rest/services/RedMadrid/NAServer")
                    
                    // var params = new ServiceAreaParameters();
                    // params.defaultBreaks= [3];
                    // params.outSpatialReference = mapMain.spatialReference;
                    // params.returnFacilities = true ;
                    // // params.impedanceAttribute= TiempoCoche;
                    
                    // var facilities = new FeatureSet();
                    // facilities.features = centrosSalud;
                    // params.facilities = facilities;

                    // var featureSet = new FeatureSet();

                    // featureSet.features.push(centrosSalud);
                    // console.log("featureset", featureSet)

                    // var centros = featureSet.features[0].graphics

                    // console.log("puntos", centros);

                    // console.log("facilities", facilities.features)
                    // console.log("centrosSalud", centrosSalud)
                    // console.log("TiempoCoche", params.impedanceAttribute)
                    // console.log("aaaa",centrosSalud.fields["0"])
////////////////////////////////////////////////////////////////////

                    // mapMain.on("layer-add-result", printZonas);

                    // function printZonas(centrosSalud) {
                    //     console.log("aaaa",centrosSalud.fields["*"])
                    //     var geometryInput = centrosSalud.geometry;
                    //     var pointSymbol = new SimpleMarkerSymbol(
                    //         "diamond",
                    //         20,
                    //         new SimpleLineSymbol(
                    //           "solid",
                    //           new Color([88,116,152]), 2
                    //         ),
                    //         new Color([88,116,152,0.45])
                    //       );
                    //       var punto0X = -3.646236982;
                    //       var punto0Y = 40.40627165;
                    //       var inPoint = new Point(punto0X , punto0Y , mapMain.spatialReference);
                    //       var location = new Graphic(inPoint, pointSymbol);
                    //     console.log("a ver", inPoint)
                    //       mapMain.graphics.add(location);
                    //       var features = [];
                    //       features.push(location);
                    //       var facilities = new FeatureSet();
                    //       facilities.features = features;
                    //       params.facilities = facilities;

                        // var graphic = new Graphic(geometryInput, tbDrawSymbol);
                        // mapMain.graphics.add(graphic);
                
                        //solve
                        // serviceAreaTask.solve(params,function(solveResult){
                        //   var polygonSymbol = new SimpleFillSymbol(
                        //     "solid",
                        //     new SimpleLineSymbol("solid", new Color([232,104,80]), 2),
                        //     new Color([232,104,80,0.25])
                        //   );
                        //   arrayUtils.forEach(solveResult.serviceAreaPolygons, function(serviceArea){
                        //     serviceArea.setSymbol(polygonSymbol);
                        //     mapMain.graphics.add(serviceArea);
                        //   });
                
                        // }, function(err){
                        //   console.log("h",err.message);
                        // });
                    //   }

/////////////////////////////////////////////////////////////

                    mapMain.on("click", mapClickHandler);

                    params = new ServiceAreaParameters();
                    params.defaultBreaks= [1];
                    params.outSpatialReference = mapMain.spatialReference;
                    params.returnFacilities = true;

                    var serviceAreaTask = new ServiceAreaTask("https://formacion.esri.es/server/rest/services/RedMadrid/NAServer");

                    
                    function mapClickHandler(evt) {
                    
                    mapMain.graphics.clear(); //clear existing graphics
                    //define the symbology used to display the results and input point
                    var pointSymbol = new SimpleMarkerSymbol(
                        "diamond",
                        20,
                        new SimpleLineSymbol(
                        "solid",
                        new Color([88,116,152]), 2
                        ),
                        new Color([88,116,152,0.45])
                    );
                    var inPoint = new Point(evt.mapPoint.x, evt.mapPoint.y, mapMain.spatialReference);
                    var location = new Graphic(inPoint, pointSymbol);

                    mapMain.graphics.add(location);
                    var features2 = [];
                    features2.push(location);
                    var facilities2 = new FeatureSet();
                    facilities2.features = features2;
                    params.facilities = facilities2;

                    //solve
                    serviceAreaTask.solve(params,function(solveResult){
                        var polygonSymbol = new SimpleFillSymbol(
                        "solid",
                        new SimpleLineSymbol("solid", new Color([232,104,80]), 2),
                        new Color([232,104,80,0.25])
                        );
                        arrayUtils.forEach(solveResult.serviceAreaPolygons, function(serviceArea){
                        serviceArea.setSymbol(polygonSymbol);
                        mapMain.graphics.add(serviceArea);
                        });

                    });
                    }
                    




                })
        });