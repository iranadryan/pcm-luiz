import moment from 'moment';
import { ArrowLeft, ArrowRight } from 'phosphor-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Option } from '../../components/Select';
import { Title } from '../../components/Title';
import { ActivitiesStep } from './components/ActivitiesStep';
import { CreatedModal } from './components/CreatedModal';
import { HeaderStep } from './components/HeaderStep';
import { Container } from './styles';

export interface Material {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

export interface Activity {
  id: string;
  activityId: string;
  name: string;
  startTime: string;
  endTime: string;
  endDate: string;
  plate: string | null;
  performer: string | null;
  materials: Material[];
}

export interface FormData {
  startDate: string;
  startTime: string;
  plate: string | null;
  driver: string | null;
  kilometers: string;
  observation: string;
  activities: Activity[];
}

export function NewServiceOrder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [concludedModalIsVisible, setConcludedIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    startDate: moment().format('DDMMYYYY'),
    startTime: moment().format('HHmm'),
    plate: null,
    driver: null,
    kilometers: '',
    observation: '',
    activities: []
  });
  const FormTitles = ['NOVA ORDEM DE SERVIÇO', 'INSIRA AS ATIVIDADES'];
  const plateOptions: Option[] = [
    { value: '1', label: 'LRX-2403' },
    { value: '2', label: 'CYP-1427' },
    { value: '3', label: 'NEK-9138' },
    { value: '4', label: 'HZP-5174' },
  ];
  const driverOptions: Option[] = [
    { value: '1', label: 'LUIZ FELIPE' },
    { value: '2', label: 'MIGUEL PADILHA' },
    { value: '3', label: 'IRAN ADRYAN' },
  ];
  const performerOptions: Option[] = [
    { value: '1', label: 'LUIZ FELIPE EXE' },
    { value: '2', label: 'MIGUEL PADILHA EXE' },
    { value: '3', label: 'IRAN ADRYAN EXE' },
  ];
  const activityOptions: Option[] = [
    { value: '1', label: 'MANUTENÇÃO 1' },
    { value: '2', label: 'MANUTENÇÃO 2' },
    { value: '3', label: 'MANUTENÇÃO 3' },
  ];
  const materialOptions: Option[] = [
    { value: '1', label: 'MATERIAL 1' },
    { value: '2', label: 'MATERIAL 2' },
    { value: '3', label: 'MATERIAL 3' },
  ];
  const materialUnits = [
    { id: '1', unit: 'UN' },
    { id: '2', unit: 'L' },
    { id: '3', unit: 'GAL' },
  ];

  const handleDataChange = useCallback((
    name: keyof FormData,
    data: string | number | Activity[],
  ) => {
    setFormData((prevData) => ({ ...prevData, [name]: data }));
  }, []);

  function handleSubmitForm() {
    console.log('Formulário enviado', formData);
    setConcludedIsVisible(true);
  }

  function handlePreviousStep() {
    setCurrentStep((prevStep) => prevStep === 0 ? prevStep : prevStep - 1);
  }

  function handleNextStep() {
    setCurrentStep(
      (prevStep) => prevStep === FormTitles.length - 1 ? prevStep : prevStep + 1
    );
  }

  function StepDisplay() {
    switch (currentStep) {
    case 0:
      return <HeaderStep
        plateOptions={plateOptions}
        driverOptions={driverOptions}
        data={formData}
        onDataChange={handleDataChange}
      />;
    case 1:
      return <ActivitiesStep
        activityOptions={activityOptions}
        plateOptions={plateOptions}
        performerOptions={performerOptions}
        materialOptions={materialOptions}
        materialUnits={materialUnits}
        data={formData}
        onDataChange={handleDataChange}
      />;
    }
  }

  return (
    <Container>
      <CreatedModal isVisible={concludedModalIsVisible} />
      <header>
        {currentStep === 0 && (
          <Link to="/" className="back-button">
            <ArrowLeft color="#FFFFFF" size={24} weight="bold" />
          </Link>
        )}
        <Title title={FormTitles[currentStep]} />
      </header>
      <div className="form">
        {StepDisplay()}
      </div>
      <footer>
        {currentStep > 0 && (
          <Button onClick={handlePreviousStep}>
            <ArrowLeft color="#FFFFFF" size={20} weight="bold" />
            Anterior
          </Button>
        )}
        <Button onClick={
          currentStep === FormTitles.length - 1
            ? handleSubmitForm
            : handleNextStep
        }>
          {currentStep === FormTitles.length - 1 ? 'Finalizar' : 'Próximo'}
          <ArrowRight color="#FFFFFF" size={20} weight="bold" />
        </Button>
      </footer>
    </Container>
  );
}
