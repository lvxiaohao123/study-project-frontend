<template>
  <Header></Header>
  <div>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted } from 'vue';

export default {
  data() {
    return {
      map: null,
      markers: [],
    };
  },
  mounted() {
    // 动态加载高德地图脚本
    const script = document.createElement("script");
    script.src = "https://webapi.amap.com/maps?v=1.4.15&key=82eeae66daff0b5b0de59bee1485b681";
    script.async = true;
    script.onload = this.initMap;
    document.head.appendChild(script);

    // 获取标记点数据
    this.fetchMarkerData();
  },
  beforeDestroy() {
    // 在组件销毁前执行清理操作
    this.destroyMap();
  },
  methods: {
      async fetchMarkerData() {
          try {
            console.log('Fetching marker data...');
            const response = await axios.get('api/emergency/findAllEmergency');
            console.log('Response received:', response); // 检查响应是否有数据
            this.markers = response.data;
            console.log('Markers:', this.markers);
          } catch (error) {
            console.error('获取标记点数据失败', error);
          }
        },


    initMap() {
      // 初始化地图
      this.map = new AMap.Map(this.$refs.mapContainer, {
        zoom: 13,
        center: [116.397428, 39.90923],
      });

      // 添加ToolBar控件
      AMap.plugin(["AMap.ToolBar"], () => {
        this.map.addControl(new AMap.ToolBar());
      });

      // 添加PlaceSearch组件
      AMap.plugin("AMap.PlaceSearch", () => {
        var placeSearch = new AMap.PlaceSearch({
          map: this.map,
        });
        placeSearch.search("餐厅");
      });

      // 添加Geolocation组件
      AMap.plugin("AMap.Geolocation", () => {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
          convert: true,
          showButton: true,
          buttonPosition: "LB",
          buttonOffset: new AMap.Pixel(10, 20),
          showMarker: true,
          showCircle: true,
          panToLocation: true,
        });

        // 获取当前位置并设置为地图中心点
        geolocation.getCurrentPosition((status, result) => {
      if (status === 'complete') {
        this.map.setCenter(result.position);
        // 在这里调用 addMarkers，确保 Geolocation 初始化完成后再调用
        this.addMarkers();
      } else {
        console.error('定位失败', result);
        // 如果定位失败，也调用 addMarkers
        this.addMarkers();
      }
    });

      });

      // 添加HawkEye组件
      AMap.plugin("AMap.HawkEye", () => {
        var hawkeye = new AMap.HawkEye({
          map: this.map,
        });
        hawkeye.start();
      });

      // 批量添加标记点和信息窗体
      this.addMarkers();
    },
    addMarkers() {
  // 判断 this.markers 是否存在且为数组
  if (Array.isArray(this.markers)) {
    // 遍历标记点数组并在地图上添加标记和信息窗体
    this.markers.forEach(markerData => {
      // 创建自定义图标
      var customIcon = new AMap.Icon({
        image: 'https://a.amap.com/jsapi_demos/static/demo-center/marker/express2.png',  // 替换为你的自定义图标路径
        size: new AMap.Size(64,30),  // 图标尺寸
        imageSize: new AMap.Size(64,30),  // 图标实际显示大小
      });

      // 创建标记点并使用自定义图标
      var marker = new AMap.Marker({
        position: [markerData.longitude, markerData.latitude],
        map: this.map,
        icon: customIcon, // 使用自定义图标
      });

      // 创建信息窗体
      var infoWindow = new AMap.InfoWindow({
          content: `
            <div style="color: #333; font-size: 14px;">
              <p style="font-weight: bold;">设备ID: ${markerData.id}</p>
              <p>设备名: ${markerData.name}</p>
              <p>具体信息: <span style="font-weight: bold;">${markerData.description}</span></p>
              <p>联系方式: <span style="font-weight: bold;">${markerData.phone}</span></p>
            </div>
          `,
          offset: new AMap.Pixel(0, -30),
        });

      // 点击标记点时打开信息窗体
      marker.on('click', () => {
        infoWindow.open(this.map, marker.getPosition());
      });
    });
  }
},


    destroyMap() {
      if (this.map) {
        // 解绑地图的点击事件等其他清理操作
        // this.map.off("click", clickHandler);

        // 销毁地图，并清空地图容器
        this.map.destroy();

        // 地图对象赋值为null
        this.map = null;

        // 清除地图容器的 DOM 元素
        const mapContainer = document.getElementById("container");
        if (mapContainer) {
          mapContainer.remove();
        }
      }
    },
  },
};
onMounted(() => {
  this.fetchMarkerData();
});

</script>

<style scoped>
.map-container {
  width: 100%;
  height: 640px;
}

.custom-info-window {
  background-color: #a2a096; /* 修改为你想要的颜色 */
  padding: 10px;
  border-radius: 5px;
  color: #333; /* 修改为文本颜色 */
}
</style>

