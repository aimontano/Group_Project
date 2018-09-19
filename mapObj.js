var loadMap = {
    Config: {
        apiKey:            "AIzaSyD4Knjz8L7b6Tbk9Ipe6lcaSMwFWPZzMfA",
        authDomain:        "mapmarkers-dba7e.firebaseapp.com",
        databaseURL:       "https://mapmarkers-dba7e.firebaseio.com",
        projectId:         "mapmarkers-dba7e",
        storageBucket:     "mapmarkers-dba7e.appspot.com",
        messagingSenderId: "1047905061223",
        dataBase:          "userMarkers"
    },
    Pos: {
        lat: null,
        lng: null
    },
    Tags : {
        UserInput: "#user-name",
        SubmitButton: "#submit-name",
        UserMess: "#user-mess",
        CUser: "#c-user"
    },
    Mess : {
        1: "Fieled id empty",
        2: "User Location has been updated",
        3: "User not found (new user is added).",
        4: "hello "
    },
    Markers : [],
    Map: null,
    Database: null,
    Bounds: {},
    UserName: 'default',
    UserData: {},
    CUserData: {},
    
    GetUserName: function () {
        $(loadMap.Tags.SubmitButton).on('click', function () {
            loadMap.UserName = $(loadMap.Tags.UserInput).val();
            if (loadMap.Tags.UserName == "") {
                loadMap.SetMess(1, 2);
            } else if (loadMap.CheckUser()) {
                loadMap.SetMess(2, 1);
                loadMap.UserEvent();
            } else {
                loadMap.SetMess(3, 1);
                loadMap.UserEvent();
            }
        });
    },
    SetMess: function (MessID, Type) {
        $(loadMap.Tags.UserMess).css({'color' : Type == 1 ? 'green' : 'red' }).text(loadMap.Mess[MessID]);
    },
    GetMarkers : function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                loadMap.Pos = {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                };
                loadMap.Load();
                loadMap.GetUserName();
            });
        }
    },
    CheckUser : function () {

        if (loadMap.UserData[loadMap.UserName]) {
            loadMap.CUserData = loadMap.UserData[loadMap.UserName];
            return true;
        }
         return null;
    },
    Load : function () {
        loadMap.Database = firebase.initializeApp(loadMap.Config);
        loadMap.Database = loadMap.Database.database();

        loadMap.GetMarker();

        loadMap.Database.ref(loadMap.Config.dataBase).on("value", function(snapshoot){
            loadMap.UserData = snapshoot.val();
            loadMap.GetMarker();
            for (var key in loadMap.UserData ) {
                if (loadMap.UserData.hasOwnProperty(key)) {
                    loadMap.AddAllMarkers(loadMap.UserData[key].lat, loadMap.UserData[key].lng);
                }
            }

            loadMap.Map.fitBounds(loadMap.Bounds);
        });
    },
    UserEvent: function () {
        loadMap.Database.ref("/" + loadMap.Config.dataBase + "/"+loadMap.UserName).set({
            name: loadMap.UserName,
            icon: "userIcon",
            lat: loadMap.Pos.lat,
            lng: loadMap.Pos.lng
        });
        loadMap.SayHi();
    },
    SayHi : function () {
        $(loadMap.Tags.CUser).text(loadMap.Mess[4]+loadMap.UserName);
    },
    GetMarker : function () {
        loadMap.Map = new google.maps.Map(document.getElementById("map"), {
            center: {lat: loadMap.Pos.lat, lng: loadMap.Pos.lng},
            zoom:9
        });
        loadMap.Bounds = new google.maps.LatLngBounds({lat: loadMap.Pos.lat, lng: loadMap.Pos.lng});

        loadMap.AddAllMarkers(loadMap.Pos.lat, loadMap.Pos.lng);
    },
    AddAllMarkers : function (let, lng) {

        if (let == undefined || lng == undefined) return;

        loadMap.Markers.push(new google.maps.Marker({
            position: new google.maps.LatLng(let, lng)
        }));

        for(i=0;i< loadMap.Markers.length;i++)
        {
            var m = loadMap.Markers[i];
            m.setMap(loadMap.Map);
        }
        loadMap.Bounds.extend({lat: let, lng: lng});

        google.maps.event.addListener(m,'click',function(){
            loadMap.Map.setZoom(14);
            loadMap.Map.setCenter(m.getPosition());
        });
    }
};

loadMap.GetMarkers();
