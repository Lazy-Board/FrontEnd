import styled from "styled-components";

const WidgetLoading = () => {
    return (
        <BallFade className="w-full h-32 flex items-center justify-center">
            <div data-loader="ball-fade"></div>
        </BallFade>
    )
}

export default WidgetLoading;

const BallFade = styled.div`
    [data-loader='ball-fade']
    {
        position: relative;

        width: 15px;
        height: 15px;

        -webkit-animation: 1.2s ball-fade infinite cubic-bezier(.78, .14, .15, .86) .2s;
            -o-animation: 1.2s ball-fade infinite cubic-bezier(.78, .14, .15, .86) .2s;
                animation: 1.2s ball-fade infinite cubic-bezier(.78, .14, .15, .86) .2s;

        border-radius: 100%;
        background-color: rgba(102, 204, 138, .0);
    }
    [data-loader='ball-fade']:before,
    [data-loader='ball-fade']:after
    {
        position: absolute;

        width: 15px;
        height: 15px;

        content: '';
        -webkit-animation: 1.2s ball-fade infinite cubic-bezier(.78, .14, .15, .86);
            -o-animation: 1.2s ball-fade infinite cubic-bezier(.78, .14, .15, .86);
                animation: 1.2s ball-fade infinite cubic-bezier(.78, .14, .15, .86);

        border-radius: 100%;
        background-color: rgba(102, 204, 138, .0);
    }
    [data-loader='ball-fade']:before
    {
        left: -20px;
    }
    [data-loader='ball-fade']:after
    {
        right: -20px;

        -webkit-animation-delay: .4s;
            -o-animation-delay: .4s;
                animation-delay: .4s;
    }
    @-webkit-keyframes ball-fade
    {
        0%
        {
            background-color: rgba(102, 204, 138, 1);
        }
        100%
        {
            background-color: rgba(102, 204, 138, 0);
        }
    }
    @-moz-keyframes ball-fade
    {
        0%
        {
            background-color: rgba(102, 204, 138, 1);
        }
        100%
        {
            background-color: rgba(102, 204, 138, 0);
        }
    }
    @-o-keyframes ball-fade
    {
        0%
        {
            background-color: rgba(102, 204, 138, 1);
        }
        100%
        {
            background-color: rgba(102, 204, 138, 0);
        }
    }
    @keyframes ball-fade
    {
        0%
        {
            background-color: rgba(102, 204, 138, 1);
        }
        100%
        {
            background-color: rgba(102, 204, 138, 0);
        }
    }
`