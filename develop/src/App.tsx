import styled from 'styled-components';
import Location from './components/Location';
import { GlobalStyle } from './styles/GlobalStyle';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: tomato;
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <AppContainer>
                <Location />
            </AppContainer>
        </>
    );
}

export default App;
