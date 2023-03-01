import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { weatherLocationState, getInfo, MyWeatherLocation } from "../../atom/weather";
import { api } from "../../atom/signin";
import { useQuery, useMutation, useQueryClient } from "react-query";

const SetLocationModal = ():JSX.Element => {
    const queryClient = useQueryClient();
    const { data:userLoc } = useQuery(['userWeatherData'], getInfo, {
        refetchOnWindowFocus:false,
    })
    const [locationNames, setLocationNames] = useRecoilState<MyWeatherLocation>(weatherLocationState);

    const {cityName, locationName} = locationNames;
    
    const changeLoc = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value}= e.target;
        setLocationNames({
            ...locationNames,
            [name]: value,
        });
    };

    useEffect(()=>{
        if (userLoc){
            setLocationNames({cityName:userLoc.cityName, locationName:userLoc.locationName})
        }
    },[userLoc])

    const uploadMutation = useMutation(()=>
        api.post(`/weather/user-info`, {cityName:cityName, locationName:locationName})
    )

    const updateMutation = useMutation(()=>
        api.put(`/weather/user-info`, {cityName:cityName, locationName:locationName})
    )

    // 안됨..
    const deleteMutation = useMutation(()=>
        api.delete(`/weather/user-info`)
    )

    const deleteBtn = () => {
        deleteMutation.mutate()
    }

    const uploadText = async () => {
        try {
            const response = await uploadMutation.mutateAsync(userLoc);
            setLocationNames(response.data)
            queryClient.invalidateQueries(['userWeatherData']);
            queryClient.invalidateQueries(['weatherData']);
            alert('저장되었습니다.')
        } catch (error){
            setLocationNames({cityName:'',locationName:''})
            alert(`Error: \n${error}`)
        }
    }

    const updateText = async () => {
        try {
            const response = await updateMutation.mutateAsync(userLoc);
            setLocationNames(response.data)
            queryClient.invalidateQueries(['userWeatherData']);
            queryClient.invalidateQueries(['weatherData']);
            alert('업데이트되었습니다.')
        } catch (error){
            setLocationNames({cityName:'',locationName:''})
            alert(`Error: \n${error}`)
        }
    }

    return (
    <>
        <input type='checkbox' id='location-modal' className="modal-toggle"/>
        <div className="modal">
            <div className="modal-box w-72">
                <p>지역을 선택해주세요.</p>
                <form action="#" className="mt-4" >
                    <div className="flex flex-col gap-3">
                        <label className='block text-sm text-gray-900 dark:text-white text-left'>시/구/군</label>
                        <input type="text" required
                        placeholder="예: OO시/ OO구/ OO군"
                        onChange={changeLoc} name="cityName"
                        value={cityName}
                        className="w-full p-2 bg-stone-100 border-b border-stone-300 text-neutral-600 text-base"/>
                        <label className='block text-sm text-gray-900 dark:text-white text-left'>동/읍/면</label>
                        <input type="text" required
                        placeholder="예: OO동/ OO읍/ OO면"
                        value={locationName}
                        onChange={changeLoc} name="locationName"
                        className="w-full p-2 bg-stone-100 border-b border-stone-300 text-neutral-600 text-base"/>
                    </div>
                    <div className="modal-action pr-1 flex gap-4" >
                        <label htmlFor="location-modal" className="btn btn-primary" 
                        onClick={
                            userLoc && userLoc.cityName === "" ? uploadText : updateText}>
                            저장
                        </label>
                        <label htmlFor="location-modal" className="btn btn-secondary" onClick={deleteBtn}>
                            삭제
                        </label>
                        <label htmlFor="location-modal" className="btn btn-outline">
                            취소
                        </label>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default SetLocationModal;