import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

// Loader 컴포넌트 스타일 정의
const Loader = styled.div`
    width: 50px;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #25b09b;
    --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: ${rotate} 1s infinite linear;
`;

function Spinner() {
    return <Loader />;
}

export default Spinner;
