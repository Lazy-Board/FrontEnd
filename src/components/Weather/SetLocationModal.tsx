import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { weatherLocationState, getInfo, MyWeatherLocation } from "../../atom/weather";
import { api } from "../../atom/signin";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ErrorModal } from "../Modal/ErrorModal";
import SuccessModal from "../Modal/SuccessModal";

const SetLocationModal = ():JSX.Element => {
    const queryClient = useQueryClient();
    const { data:userLoc } = useQuery(['userWeatherData'], getInfo, {
        refetchOnWindowFocus:false,
    })
    const [locationNames, setLocationNames] = useRecoilState<MyWeatherLocation>(weatherLocationState);

    const {cityName, locationName} = locationNames;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState<string | null>(null);
    
    const changeLoc = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value}= e.target;
        setLocationNames({
            ...locationNames,
            [name]: value,
        });
    };

    useEffect(()=>{
        if (userLoc){
            setLocationNames({
                cityName:userLoc.cityName, 
                locationName:userLoc.locationName
            })
        }
    },[userLoc])

    useEffect(()=>{
        const timer = setTimeout(() => {
            if (error) {
                setError(null);
            }
            if (success){
                setSuccess(null);
            }
        }, 5000);
    
        return () => {
            clearTimeout(timer);
        };
    }, [])

    const uploadMutation = useMutation(()=>
        api.post(`/weather/user-info`, {cityName:cityName, locationName:locationName})
    )

    const updateMutation = useMutation(()=>
        api.put(`/weather/user-info`, {cityName:cityName, locationName:locationName})
    )

    const deleteMutation = useMutation(()=>
        api.delete(`/weather/user-info`)
    )

    const deleteBtn = async () => {
        try {
            await deleteMutation.mutateAsync();
            setLocationNames((prevLoc: any) => ({
                ...prevLoc,
                cityName: "", locationName:""
            }));
            queryClient.invalidateQueries(['userWeatherData']);
            queryClient.invalidateQueries(['weatherData']);
            setSuccess('삭제되었습니다.')
        } catch (error:any) {
            setError(error.response.data.message);
        }
    };

    const uploadText = async () => {
        try {
            if (!userLoc){
                const response = await uploadMutation.mutateAsync(userLoc);
                setLocationNames(response.data);
                queryClient.invalidateQueries(['userWeatherData']);
                queryClient.invalidateQueries(['weatherData']);
                setSuccess('성공적으로 저장되었습니다!');
            } else {
                const response = await updateMutation.mutateAsync(userLoc);
                setLocationNames(response.data)
                queryClient.invalidateQueries(['userWeatherData']);
                queryClient.invalidateQueries(['weatherData']);
                setSuccess('성공적으로 업데이트 되었습니다!');
            }
        } catch (error:any){
            setError(error.response.data.message);
        }
    }

    return (
    <>
        <input type='checkbox' id='location-modal' className="modal-toggle"/>
        <div className="modal">
            <div className="modal-box w-72">
                <p className="dark:text-slate-400">지역을 선택해주세요.</p>
                <form action="#" className="mt-4" >
                    <div className="flex flex-col gap-3">
                        <label className='block text-sm text-gray-900 dark:text-slate-100 text-left'>시/구/군</label>
                        <input type="text" required
                        placeholder="예: OO시/ OO구/ OO군"
                        onChange={changeLoc} name="cityName"
                        value={cityName}
                        className="w-full p-2 bg-stone-100 dark:bg-slate-800 rounded-md text-neutral-600 dark:text-slate-200 text-base"/>
                        <label className='block text-sm text-gray-900 dark:text-slate-100 text-left'>동/읍/면</label>
                        <input type="text" required
                        placeholder="예: OO동/ OO읍/ OO면"
                        value={locationName}
                        onChange={changeLoc} name="locationName"
                        className="w-full p-2 bg-stone-100 dark:bg-slate-800 rounded-md text-neutral-600 dark:text-slate-200 text-base"/>
                    </div>
                    <div className="modal-action pr-2 flex gap-4" >
                        <label htmlFor="location-modal" className="btn btn-primary" 
                        onClick={uploadText}>
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
        {error && (
        <ErrorModal message={error} onClose={() => setError(null)} />
        )}
        {success && (
        <SuccessModal message={success} onClose={() => setSuccess(null)} />
        )}
    </>
    )
}

export default SetLocationModal;