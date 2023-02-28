// import { api } from '../../atom/signin'

const Confirm = ():JSX.Element => {
    const logout= async () =>{
        // try {
        //     await api.post(`/user/logout`,{})
        //     alert('로그아웃되었습니다.')
        // } catch (error) {
        //     alert(`Error: ${error}`)
        // }
    }

    return (
        <>
            <input type='checkbox' id='confirm-modal' className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box w-72">
                    <p className="py-4 font-semibold">
                        정말로 로그아웃 하시겠습니까?
                    </p>
                    <div className="modal-action" >
                        <label htmlFor="confirm-modal" className="btn btn-primary" onClick={logout}>
                            네
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