import { useNavigate } from "react-router-dom";

const Complete = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <>
        <input type="checkbox" id="complete-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box w-72">
            <p className="py-4 font-semibold">
                회원가입을 축하드립니다! <br/>
                등록하신 이메일로 인증을 완료하세요.
            </p>
            <div className="modal-action mr-12">
                <label
                htmlFor="complete-modal"
                className="btn btn-primary"
                onClick={()=>navigate('/login')}
                >
                    로그인 화면으로
                </label>
            </div>
            </div>
        </div>
        </>
    );
};

export default Complete;