import Vue from "vue";
import AMap from "vue-amap";
// 初始化vue-amap
AMap.initAMapApiLoader({
    // 申请的高德key
    key: "d32b64be0e422afca8dbab9abe4467be",
    // 插件集合
    plugin: [
        "AMap.Autocomplete",
        "AMap.PlaceSearch",
        "AMap.Scale",
        "AMap.OverView",
        "AMap.ToolBar",
        "AMap.MapType",
        "AMap.Geolocation",
        "AMap.Geocoder"
    ]
});
Vue.use(AMap);