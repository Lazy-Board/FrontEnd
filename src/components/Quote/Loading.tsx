import styled from "styled-components";

const Spinner = styled.div`
    border: 8px solid #ccc;
    border-top: 8px solid #999;
    border-radius: 50%;
    height: 80px;
    width: 80px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% {
        transform: rotate(0deg);
        }

        100% {
        transform: rotate(360deg);
        }
    }
`;

const Loading = () => {
    return (
        <div className="w-96 h-28 pl-4 flex items-center justify-center">
            <Spinner />
        </div>
    )
}

export default Loading;