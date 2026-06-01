export type Item = {
  id: string;
  name: string;
  price: number;
};

export type Category = {
  name: string;
  items: Item[];
};

export const PRICING_DATA: Category[] = [
  {
    name: "KITS",
    items: [
      { id: "kit-reparacion", name: "KIT DE REPARACIÓN", price: 100 },
      { id: "kit-stance", name: "KIT DE STANCE", price: 250 },
      { id: "kit-pintura", name: "KIT DE PINTURA", price: 500 },
      { id: "kit-limpieza", name: "KIT DE LIMPIEZA", price: 50 },
      { id: "kit-humo", name: "KIT DE HUMO PARA NEUMÁTICOS", price: 250 },
      { id: "kit-extras", name: "KIT DE EXTRAS", price: 200 },
      { id: "kit-carroceria", name: "KIT DE CARROCERÍA", price: 200 },
    ],
  },
  {
    name: "PIEZAS",
    items: [
      { id: "pieza-rendimiento", name: "PIEZA DE RENDIMIENTO", price: 1600 },
      { id: "pieza-suspension", name: "PIEZAS DE SUSPENSIÓN", price: 550 },
      { id: "motor-electrico", name: "MOTOR ELÉCTRICO", price: 1200 },
      { id: "juego-llantas", name: "JUEGO DE LLANTAS", price: 900 },
      { id: "filtro-aire", name: "FILTRO DE AIRE", price: 100 },
      { id: "controlador-luces", name: "CONTROLADOR DE LUCES", price: 450 },
      { id: "bujia", name: "BUJÍA", price: 90 },
      { id: "bateria-ev", name: "BATERÍA EV", price: 300 },
    ],
  },
  {
    name: "CAMBIOS",
    items: [
      { id: "cambio-embrague", name: "CAMBIO DE EMBRAGUE", price: 400 },
      { id: "cambio-neumaticos", name: "CAMBIO DE NEUMÁTICOS", price: 100 },
      { id: "cambio-frenos", name: "CAMBIO DE PASTILLAS DE FRENO", price: 100 },
    ],
  },
  {
    name: "LÍQUIDOS",
    items: [
      { id: "refrigerante-ev", name: "REFRIGERANTE EV", price: 150 },
      { id: "aceite-motor", name: "ACEITE DE MOTOR", price: 100 },
    ],
  },
];
