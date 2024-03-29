/* global-kakao */
import { useEffect } from 'react'
import { useQuery } from 'react-query';
import { getDur } from '../../atom/traffic';

const { kakao }:any = window;

const MapContainer = () => {
    const { data } = useQuery(['userPosition'], getDur, {
        refetchOnWindowFocus:false,
        notifyOnChangeProps:'tracked',
    });

    useEffect(() => {
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};
        let geocoder = new kakao.maps.services.Geocoder();
        const map = new kakao.maps.Map(container, options);

        // 목적지 가리키도록 해야 함
        geocoder.addressSearch(!data ? '강남구 테헤란로 131' : data.destination, function(result:any, status:any) {
            // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                // 결과값으로 받은 위치를 마커로 표시
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
        
                // 인포윈도우로 장소에 대한 설명을 표시
                var infowindow = new kakao.maps.InfoWindow({
                    content: '<div class="destination" style="width:150px;text-align:center;padding:6px 0;">도착지</div>'
                });
                infowindow.open(map, marker);
        
                // 지도의 중심을 결과값으로 받은 위치로 이동
                map.setCenter(coords);
            } 
        })
    }, [data]);

    return (
        <div id='myMap' style={{
            width: '397px', 
            height: '385px'
        }}></div>
    );
}

export default MapContainer; 