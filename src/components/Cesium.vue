<template>
    <div id="cesiumContainer">
        <div id="info"></div>
        <el-tree class="elTree" :data="data" node-key="id" default-expand-all :props="defaultProps" @node-click="handleNodeClick" @check-change="handleCheckChange" ref="tree" show-checkbox></el-tree>
    </div>
</template>
<script setup>
import * as Cesium from 'cesium'
import { onMounted, ref } from 'vue'
import SuperGif from 'libgif'
const data = ref([
    {
        id: 1,
        name: '模型',
        children: [
            {
                id: 2,
                name: '倾斜模型',
            },
        ],
    },
])
const modelChecked = ref([])
const obliqueTileset = ref([])
const defaultProps = ref({ children: 'children', label: 'name' })
const handleNodeClick = data => {
    console.log(data)
}
const handleCheckChange = (data, checked) => {
    modelChecked.value = data.name
    console.log('🚀 ~ handleCheckChange ~ modelChecked.value:', modelChecked.value)
    if (modelChecked.value == '倾斜模型') {
        addCesium3DTileset('http://192.168.100.4:8092/beijingModel/osgb/tileset.json')
    } else {
        removeCesium3DTileset()
    }
}
async function addCesium3DTileset(url) {
    try {
        obliqueTileset.value = await Cesium.Cesium3DTileset.fromUrl(url, {
            show: true,
            maximumScreenSpaceError: 16,
            maximumMemoryUsage: 1024,
            cullWithChildrenBounds: true,
            skipLevelOfDetail: true,
            baseScreenSpaceError: 1024,
            skipScreenSpaceErrorFactor: 16,
            skipLevels: 1,
            immediatelyLoadDesiredLevelOfDetail: false,
            loadSiblings: false,
        })
        viewer.scene.primitives.add(obliqueTileset.value)
        viewer.zoomTo(obliqueTileset.value, new Cesium.HeadingPitchRange(0.0, -0.5, obliqueTileset.value.boundingSphere.radius * 2.0))
    } catch (error) {
        console.log(`Failed to load tileset: ${error}`)
    }
}
async function removeCesium3DTileset() {
    obliqueTileset.value.show = false
}
onMounted(() => {
    //标注
    const TDT_CIA_C = 'http://{s}.tianditu.gov.cn/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0' + '&LAYER=cia&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' + '&style=default&format=tiles&tk=d4782516c98542ebc0bdc11ec86b68ca'

    const TDT_IMG_C = 'http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0' + '&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' + '&style=default&format=tiles&tk=d4782516c98542ebc0bdc11ec86b68ca'

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNTc3MDhmMC02OGYxLTQzNTQtODJiYi05YmUyZTYxYmJhYTIiLCJpZCI6MzI5NjgsImlhdCI6MTY0NDk3NzIyOH0.Uanby3XNZVn1eq35LIyDczNmOo9J1uMd3uvjN1P8F7M'
    const viewer = new Cesium.Viewer('cesiumContainer', {
        animation: false, // 动画小组件
        baseLayerPicker: false, // 底图组件，选择三维数字地球的底图（imagery and terrain）。
        fullscreenButton: false, // 全屏组件
        vrButton: false, // VR模式
        geocoder: false, // 地理编码（搜索）组件
        homeButton: false, // 首页，点击之后将视图跳转到默认视角
        infoBox: false, // 信息框
        sceneModePicker: false, // 场景模式，切换2D、3D 和 Columbus View (CV) 模式。
        selectionIndicator: false, // 是否显示选取指示器组件
        timeline: false, // 时间轴
        navigationHelpButton: false, // 帮助提示，如何操作数字地球。
        // 如果最初应该看到导航说明，则为true；如果直到用户明确单击该按钮，则该提示不显示，否则为false。
        navigationInstructionsInitiallyVisible: false,
        // terrain: Cesium.Terrain.fromWorldTerrain(),
        // baseLayer: Cesium.ImageryLayer.fromProviderAsync(Cesium.ArcGisMapServerImageryProvider.fromBasemapType(Cesium.ArcGisBaseMapType.SATELLITE)),
        // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        //     url: TDT_IMG_C,
        //     layer: 'tdtImg_c',
        //     style: 'default',
        //     format: 'tiles',
        //     tileMatrixSetID: 'c',
        //     subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
        //     tilingScheme: new Cesium.GeographicTilingScheme(),
        //     tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
        //     maximumLevel: 50,
        //     show: false,
        // }),
    })
    viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
            //调用影响中文注记服务
            url: TDT_CIA_C,
            layer: 'tdtImg_c',
            style: 'default',
            format: 'tiles',
            tileMatrixSetID: 'c',
            subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tilingScheme: new Cesium.GeographicTilingScheme(),
            tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
            maximumLevel: 50,
            show: false,
        })
    )
    window.viewer = viewer //挂载到window上
    viewer._cesiumWidget._creditContainer.style.display = 'none' //	去除版权信息
    // viewer.scene.globe.enableLighting = true
    viewer.scene.globe.depthTestAgainstTerrain = true
    // 定位到某个点位上
    const boundingSphere = new Cesium.BoundingSphere(
        Cesium.Cartesian3.fromDegrees(120.55538, 31.87532, 100),
        200 // 控制高度
    )
    viewer.camera.flyToBoundingSphere(boundingSphere, {
        // 动画，定位到初始位置的过渡时间，设置成0，就没有动画
        duration: 1,
    })
    const _textColor = 'rgb(11, 255, 244)'
    let shuj = [
        {
            id: 1,
            name: '广告牌1',
            j: 120.5552,
            w: 31.87532,
            img: '/assets/camera.png',
        },
        {
            id: 2,
            name: '广告牌2',
            j: 120.5554,
            w: 31.87632,
            img: '/assets/camera.png',
        },
        {
            id: 3,
            name: '广告牌3',
            j: 120.55238,
            w: 31.87432,
            img: '/assets/camera.png',
        },
        {
            id: 4,
            name: '广告牌4',
            j: 120.55338,
            w: 31.87732,
            img: '/assets/start.png',
        },
        {
            id: 5,
            name: '广告牌5',
            j: 120.55538,
            w: 31.87732,
            img: '/assets/poi.png',
        },
        {
            id: 6,
            name: '广告牌6',
            j: 120.55538,
            w: 31.87432,
            img: '/assets/pin.png',
        },
        {
            id: 7,
            name: '广告牌7',
            j: 120.55438,
            w: 31.8754,
            img: '/assets/end.png',
        },
    ]
    // viewer.entities.add({
    //     position: Cesium.Cartesian3.fromDegrees(120.55438, 31.8754,10),
    //     billboard: {
    //         image: '/assets/start.png',
    //         // 设置贴地
    //         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    //     },
    // })
    for (let i = 0; i < shuj.length; i++) {
        // 添加实体
        viewer.entities.add({
            id: shuj[i].id, // id 为唯一的
            name: shuj[i].name, // 名字
            position: Cesium.Cartesian3.fromDegrees(shuj[i].j, shuj[i].w, 10), // 广告牌在地图上的位置,@params(经度{Number},维度{Number},高度{Number})
            billboard: {
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                image: shuj[i].img,
                scaleByDistance: new Cesium.NearFarScalar(500, 1.0, 2000, 0.1),
                // width: 18,
                // height: 24,
            },
            // 图标下的点 pixelSize为大小
            point: {
                pixelSize: 5,
            },
            // 标签名
            label: {
                // show: false,
                text: shuj[i].name,
                font: '12px monospace',
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                // fillColor: Cesium.Color.LIME,
                fillColor: Cesium.Color.fromCssColorString(_textColor),
                outlineWidth: 4,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向以底部来计算标签的位置
                pixelOffset: new Cesium.Cartesian2(0, -25), // 偏移量 文字处于 (1,2) 1、正为右，负为左，2、上为负，下为正
            },
        })
    }
    // 点击广告牌的事件
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    let leftclick = Cesium.ScreenSpaceEventType.LEFT_CLICK
    viewer.screenSpaceEventHandler.removeInputAction(leftclick)

    // 鼠标左键事件
    handler.setInputAction(e => {
        let pickObj = viewer.scene.pick(e.position, 3, 3)
        // 判断是否点击到地图上的图标
        if (Cesium.defined(pickObj)) {
            if (pickObj.id && pickObj.id instanceof Cesium.Entity) {
                // text.value = pickObj.id._name
                // 将地图的经纬度转换成在画布的位置坐标
                var winpos = viewer.scene.cartesianToCanvasCoordinates(pickObj.id._position._value)
                // 调用显示的方法
                showInfo(viewer.entities.getById(pickObj.id.id), winpos)
                // viewer.trackedEntity = viewer.entities.getById(pickObj.id.id); // 点击实体拉近与实体的距离
            }
        } else {
            hideInfo()
        }
    }, leftclick)
    // 显示信息
    function showInfo(entity, winpos) {
        let info = document.getElementById('info')
        // 对位置进行定位
        if (winpos) {
            info.style.left = (winpos.x + 10).toFixed(0) + 'px'
            info.style.top = (winpos.y - 100).toFixed(0) + 'px'
        }
        // 显示框里的内容
        info.innerHTML = ''
        info.innerHTML = entity.name
        info.style.display = 'block'
    }

    function hideInfo() {
        let info = document.getElementById('info')
        info.style.display = 'none'
    }
    function createGif() {
        let div = document.createElement('div')
        let img = document.createElement('img')
        div.appendChild(img)
        img.src = '/assets/circle_d.gif'
        img.onload = () => {
            let rub = new SuperGif({
                gif: img,
            })
            rub.load(() => {
                viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(120.5552, 31.87532, 10),
                    billboard: {
                        image: new Cesium.CallbackProperty(() => {
                            return rub.get_canvas().toDataURL('image/png')
                        }, false),
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                        scaleByDistance: new Cesium.NearFarScalar(500, 1.0, 2000, 0.1),
                    },
                })

                // viewer.trackedEntity = entity
            })
        }
    }
    createGif()
    console.log('🚀 ~ onMounted ~ modelChecked.value:', modelChecked.value)
    if (modelChecked.value == '倾斜模型') {
        obliqueTileset.value = viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: 'http://192.168.100.4:8092/beijingModel/osgb/tileset.json',
                show: true,
                maximumScreenSpaceError: 16,
                maximumMemoryUsage: 1024,
                cullWithChildrenBounds: true,
                skipLevelOfDetail: true,
                baseScreenSpaceError: 1024,
                skipScreenSpaceErrorFactor: 16,
                skipLevels: 1,
                immediatelyLoadDesiredLevelOfDetail: false,
                loadSiblings: false,
            })
        )
        obliqueTileset.value.readyPromise
            .then(tileset => {
                viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, -0.5, tileset.boundingSphere.radius * 2.0))
            })
            .catch(function (error) {
                console.log(error)
            })
    } else {
    }
})
</script>
<style scoped>
body {
    position: relative;
}
#cesiumContainer {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
#info {
    position: absolute;
    width: 300px;
    height: 200px;
    z-index: 1000;
    display: none;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid greenyellow;
    border-radius: 4px;
}
.elTree {
    position: absolute;
    width: 200px;
    height: 100px;
    top: 10px;
    left: 10px;
    z-index: 1;
    background: rgba(255, 255, 255, 0.5);
    /* border: 2px solid greenyellow;
    border-radius: 4px; */
}
</style>
