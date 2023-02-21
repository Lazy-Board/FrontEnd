import { useRecoilState } from "recoil";
import { weatherLocationState } from "../../atom/weather";
import axios from "axios";

const SetLocationModal = ():JSX.Element => {
    const [locationNames, setLocationNames] = useRecoilState(weatherLocationState);

    const {cityName, locationName} = locationNames;

    const changeLoc = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value}= e.target;
        setLocationNames({
            ...locationNames,
            [name]: value,
        });
    };

    const uploadText = async () => {
        try {
            const response = await axios.post('http://localhost:5175/weather/user-info', {cityName:cityName,locationName:locationName})
            setLocationNames(response.data)
        } catch (error){
            setLocationNames({cityName:'',locationName:''})
            console.log(`Error: \n${error}`)
        }
    }

    const onSubmitData = (e:React.SyntheticEvent) => {
        e.preventDefault();
        uploadText();
    }

    return (
    <>
        <input type='checkbox' id='location-modal' className="modal-toggle"/>
        <div className="modal">
            <div className="modal-box w-72">
                <p>지역을 선택해주세요.</p>
                <form action="#" className="mt-4" onSubmit={onSubmitData}>
                    {/* post로 보내면 그 데이터를 화면에서 보여주게끔 처리? */}
                    <div className="flex flex-col gap-3">
                        <label className='block text-sm text-gray-900 dark:text-white text-left'>시/구/군</label>
                        <input type="text" required
                        placeholder="OO시, OO구, OO군..."
                        onChange={changeLoc} name="cityName"
                        className="w-full p-2 bg-stone-100 border-b border-stone-300 text-neutral-600 text-base"/>
                        <label className='block text-sm text-gray-900 dark:text-white text-left'>동/읍/면</label>
                        <input type="text" required
                        placeholder="OO동, OO읍, OO면..."
                        onChange={changeLoc} name="locationName"
                        className="w-full p-2 bg-stone-100 border-b border-stone-300 text-neutral-600 text-base"/>
                    </div>
                    <div className="modal-action" >
                        <label htmlFor="location-modal" className="btn btn-primary" onClick={uploadText}>
                            저장
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