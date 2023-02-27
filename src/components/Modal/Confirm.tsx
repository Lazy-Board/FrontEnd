const Confirm = ():JSX.Element => {
    // 로그아웃, 탈퇴, 모듈 삭제 버튼 클릭 시 나타나도록
    // id, 출력텍스트, 네 버튼 쪽에 따로 처리해주면 재활용 가능할 것 같기도
    return (
        <>
            <input type='checkbox' id='confirm-modal' className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box w-72">
                    <p className="py-4 font-semibold">
                        정말로 로그아웃 하시겠습니까?
                    </p>
                    <div className="modal-action" >
                        <label htmlFor="confirm-modal" className="btn btn-primary" >
                            네
                            {/* 네 누르면 로그아웃되었습니다 alert 창 띄우고 로그인 화면으로 리다이렉트하도록 */}
                        </label>
                        <label htmlFor="confirm-modal" className="btn btn-outline">
                            아니오
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirm;