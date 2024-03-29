import { useNavigate } from "react-router-dom";
import { api } from "../../atom/signin";

const Confirm = (): JSX.Element => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const Logout = async () => {
    if (accessToken && refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      api
        .post("user/logout")
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <input type="checkbox" id="confirm-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-72">
          <p className="py-4 font-semibold text-center">정말로 로그아웃 하시겠습니까?</p>
          <div className="modal-action text-center">
            <label
              htmlFor="confirm-modal"
              className="btn btn-primary"
              onClick={Logout}
            >
              네
            </label>
            <label htmlFor="confirm-modal" className="btn btn-outline">
              아니오
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirm;
