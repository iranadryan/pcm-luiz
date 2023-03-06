import { Header } from '../Header';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { AntSelectStyles } from '../../styles/AntSelectStyles';
import { Container } from './styles';
import { Routes } from '../../Routes';

export function App() {
  return (
    <Container>
      <AntSelectStyles />
      <GlobalStyles />
      <Header />
      <Routes />
    </Container>
  );
}
