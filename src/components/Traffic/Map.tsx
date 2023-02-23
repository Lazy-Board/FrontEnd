/* global-kakao */
import { useEffect } from 'react'

{/* <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b35e79a6f9f2e46c13beccf05f6a97f9&libraries=services,clusterer"></script> */}

const { kakao }:any = window;

const MapContainer = () => {
    // 경로는 url scheme으로만 되는거 같은데 문제는 이거..찾아보니까 앱으로 연결하는 방식 같던데 여기다 적용이 가능한가???내가 이해를 잘 못하는건가???
    // 웹지도로 보여주는거는 또 어떻게 처리하냐..

    useEffect(() => {
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};
        let geocoder = new kakao.maps.services.Geocoder();
        const map = new kakao.maps.Map(container, options);

        geocoder.addressSearch('서울특별시 송파구 올림픽로 240', function(result:any, status:any) {

            // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
        
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        
                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
        
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                // var infowindow = new kakao.maps.InfoWindow({
                //     content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                // });
                // infowindow.open(map, marker);
        
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            } 
        })
    }, []);

    return (
        <div id='myMap' style={{
            width: '397px', 
            height: '320px'
        }}></div>
    );
}

export default MapContainer; 
