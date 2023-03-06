import { Title } from '../../components/Title';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Container } from './styles';
import { useMemo, useState } from 'react';
import { ServiceOrderCard } from './components/ServiceOrderCard';
import { ServiceOrder } from '../../types/ServiceOrder';
import { Plus } from 'phosphor-react';
import { NoData } from '../../components/NoData';
import { Link } from 'react-router-dom';

export function ListServiceOrders() {
  const [statusSelected, setStatusSelected] = useState('all');
  const [filterInput, setFilterInput] = useState('');
  const [serviceOrders] = useState<ServiceOrder[]>([
    { id: '1', number: 123123, plate: 'ABC123', driver: 'LUIZ LUZ', startDate: '25/02/2023', endDate: '26/02/2023', status: 'closed' },
    { id: '2', plate: 'ABC123', driver: 'LUIZ LUZ', startDate: '25/02/2023', status: 'open' },
  ]);
  const serviceOrdersToShow = useMemo(() => serviceOrders.filter(
    (serviceOrder) => (
      ((serviceOrder.number?.toString().includes(filterInput) || ''.includes(filterInput)) ||
        serviceOrder.plate.includes(filterInput)) &&
      (statusSelected === 'all' ? true : serviceOrder.status === statusSelected)
    )
  ), [statusSelected, filterInput, serviceOrders]);

  return (
    <Container>
      <Link to="new" className="new-order">
        <Plus color="#FFFFFF" size={24} weight="bold" />
      </Link>
      <div className="filters">
        <Input
          placeholder="Digite o número da OS ou Placa"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />
        <Select
          options={[
            { value: 'all', label: 'Todas' },
            { value: 'open', label: 'Abertas' },
            { value: 'closed', label: 'Fechadas' },
          ]}
          placeholder="Estado da ordem"
          selected={statusSelected}
          onSelect={setStatusSelected}
        />
      </div>
      <Title title="ORDENS DE SERVIÇO" />
      <div className="cards-list">
        {serviceOrdersToShow.length === 0 && (
          <NoData
            title="Nenhuma ordem encontrada!"
            text="Tente mudar os filtros, talvez apareçam."
          />
        )}
        {serviceOrdersToShow.map((serviceOrder) => (
          <ServiceOrderCard key={serviceOrder.id} serviceOrder={serviceOrder} />
        ))}
      </div>
    </Container>
  );
}
