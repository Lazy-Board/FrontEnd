import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Top = styled.div`
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 200;
  @media screen and (max-width: 1920px) {
    width: 448px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  @media screen and (max-width: 440px) {
    width: 100%;
  }
`;

const DetailTopBar = ({ title }: any) => {
  //   const navigate = useNavigate();

  return (
    <Top className="h-14 flex items-center justify-center bg-white">
      <button
        // onClick={() => navigate(-1)}
        className="absolute left-3 hover:text-green-400 transition-colors"
      >
        <FiArrowLeft size={20} />
      </button>
      {title}
    </Top>
  );
};

export default DetailTopBar;
=======
=======
>>>>>>> 5df3547e8c57d0ba333584f765e25334095515c2
=======
>>>>>>> a6ee64081247e89a04d46e78dac2739808830191
    width: 100%;
    position: fixed;
    top:0;
    z-index:200;
    @media screen and (max-width: 3840px) {
        width:448px;
        left: 50%;
        transform: translate(-50%, 0);
    }
    @media screen and (max-width: 440px) {
        width: 100%;
    }
`

const DetailTopBar = ({title}:any) => {
    const navigate = useNavigate();

    return (
        <Top className="h-14 flex items-center justify-center bg-white shadow-sm">
            <button onClick={()=>navigate(-1)} 
            className='absolute left-3 hover:text-green-400 transition-colors'>
                <FiArrowLeft size={20}/>
            </button>
            {title}
        </Top>
    )
}

<<<<<<< HEAD
<<<<<<< HEAD
export default DetailTopBar;
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
=======
export default DetailTopBar;
>>>>>>> 5df3547e8c57d0ba333584f765e25334095515c2
=======
export default DetailTopBar;
>>>>>>> a6ee64081247e89a04d46e78dac2739808830191
