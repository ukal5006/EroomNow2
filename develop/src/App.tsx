import styled from 'styled-components';
import { GlobalStyle } from './stlyes/GlobalStyle';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: tomato;
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <AppContainer></AppContainer>
        </>
    );
}

export default App;
