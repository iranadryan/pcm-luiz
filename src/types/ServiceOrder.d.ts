export interface ServiceOrder {
  id: string;
  number?: number;
  plate: string;
  driver: string;
  startDate: string;
  endDate?: string;
  status: 'open' | 'closed'
}
