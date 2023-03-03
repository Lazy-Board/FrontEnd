import axios from 'axios';
import { API_URL } from '../../API/API';
import { useNavigate } from 'react-router-dom'

const Confirm = ():JSX.Element => {
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate()
    const logout= async () =>{
        try {
            await axios.post(`${API_URL}/user/logout`,{
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            alert('로그아웃되었습니다.')
            navigate('/login')
        } catch (error) {
            alert(`Error: ${error}`)
        }
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