import {
  WORK_DOCTOR,
  WORK_NURSE,
  WORK_TECHNICIAN,
  SAFETY_ENGINEER,
  CLINIC,
  ENTERPRISE,
} from './constants';

export const getMenuByRole = (typePersona, role) => {
  if (role === 'BackOffice') {
    return [
      { link: 'inicio', name: 'Início' },
      { link: 'conta', name: 'Contas' },
      { link: 'demandas', name: 'Demandas' },
      { link: 'documentos', name: 'Documentos' },
    ];
  }
  switch (typePersona) {
    case ENTERPRISE:
      return [
        { link: 'inicio', name: 'Início' },
        { link: 'demandas', name: 'Demandas' },
        { link: 'funcionarios', name: 'Funcionários' },
        { link: 'ambientes', name: 'Ambientes' },
      ];
    case CLINIC:
      return [
        { link: 'inicio', name: 'Início' },
        { link: 'agenda', name: 'Agenda' },
        { link: 'demandas', name: 'Demandas' },
      ];
    case SAFETY_ENGINEER:
    case WORK_DOCTOR:
    case WORK_NURSE:
    case WORK_TECHNICIAN:
      return [
        { link: 'inicio', name: 'Início' },
        { link: 'demandas', name: 'Demandas' },
        { link: 'clientes', name: 'Clientes' },
      ];
    default:
      break;
  }
  return [{ link: 'inicio', name: 'Início' }];
};

export const getClickByRole = (typePersona, role) => {
  if (role === 'BackOffice') {
    return { inicio: false, conta: false, demandas: false, documentos: false };
  }
  switch (typePersona) {
    case ENTERPRISE:
      return { inicio: false, demandas: false, funcionarios: false, ambientes: false };
    case CLINIC:
      return { inicio: false, agenda: false, demandas: false };
    case SAFETY_ENGINEER:
    case WORK_DOCTOR:
    case WORK_NURSE:
    case WORK_TECHNICIAN:
      return { inicio: false, demandas: false, clientes: false };
    default:
      break;
  }
  return { inicio: false, conta: false, demandas: false, documentos: false };
};
