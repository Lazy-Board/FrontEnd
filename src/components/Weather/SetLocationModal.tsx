const SetLocationModal = ():JSX.Element => {
    return (
    <>
        <input type='checkbox' id='location-modal' className="modal-toggle"/>
        <div className="modal">
            <div className="modal-box w-72">
                <p>지역을 선택해주세요.</p>
                <form action="#" className="mt-4">
                    {/* post로 보내면 그 데이터를 화면에서 보여주게끔 처리? */}
                    <div className="flex flex-col gap-3">
                        <label className='block text-sm text-gray-900 dark:text-white text-left'>시/구/군</label>
                        <input type="text" 
                        placeholder="OO시, OO구, OO군..."
                        className="w-full p-2 bg-stone-100 border-b border-stone-300 text-neutral-600 text-base"/>
                        <label className='block text-sm text-gray-900 dark:text-white text-left'>동/읍/면</label>
                        <input type="text" 
                        placeholder="OO동, OO읍, OO면..."
                        className="w-full p-2 bg-stone-100 border-b border-stone-300 text-neutral-600 text-base"/>
                    </div>
                    <div className="modal-action" >
                        <label htmlFor="location-modal" className="btn btn-primary" >
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