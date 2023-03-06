import { Container } from './styles';
import { Button } from '../../../../components/Button';
import { ServiceOrder } from '../../../../types/ServiceOrder';
import { ArrowRight, Gear, NotePencil } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

interface ServiceOrderCardProps {
  serviceOrder: ServiceOrder;
}

export function ServiceOrderCard({ serviceOrder: {
  number,
  plate,
  driver,
  startDate,
  endDate
} }: ServiceOrderCardProps) {
  const navigate = useNavigate();

  return (
    <Container>
      <header>
        <div className="icon">
          <Gear color="#007F4E" size={32} weight="duotone" />
        </div>
        <strong>{number ? `#${number}` : 'ORDEM'}</strong>
        <small className={`${number ? '' : 'open'}`}>
          {number ? 'FECHADA' : 'ABERTA'}
        </small>
      </header>
      <div className="info">
        <div>
          <strong>Placa</strong>
          <span>{plate}</span>
        </div>
        <div>
          <strong>Motorista</strong>
          <span>{driver}</span>
        </div>
      </div>
      <div className="dates">
        <span>{startDate}</span>
        {endDate && (
          <>
            <ArrowRight color="#F37324" size={18} weight="bold" />
            <span>{endDate}</span>
          </>
        )}
      </div>
      <footer>
        {!number && (
          <Button secondary>
            Editar
            <NotePencil color="#FFFFFF" size={18} weight="bold" />
          </Button>
        )}
        <Button onClick={() => {
          navigate('view');
        }}secondary>
          Visualizar
          <ArrowRight color="#FFFFFF" size={18} weight="bold" />
        </Button>
      </footer>
    </Container>
  );
}
