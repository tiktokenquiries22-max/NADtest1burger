export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  vehicleModel?: string;
  text: string;
  source: 'Google' | 'Website';
  verifiedCustomer: boolean;
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Mark Davies',
    rating: 5,
    date: '2 months ago',
    vehicleModel: 'Range Rover Sport 3.0 SDV6',
    text: 'Bell Automotive diagnosed a tricky air suspension issue on my Range Rover Sport that another garage missed. Fantastic technical knowledge, transparent pricing, and turned the car around in less than 48 hours. Genuine Land Rover experts in Deeside.',
    source: 'Google',
    verifiedCustomer: true
  },
  {
    id: 'rev-2',
    author: 'Gareth Evans',
    rating: 5,
    date: '3 months ago',
    vehicleModel: 'Land Rover Defender 90',
    text: 'Brought my Defender 90 in with a major transfer box oil leak and clutch slipping. Gareth and the team sorted it quickly with OEM parts and kept me informed at every step. Honest family business—wouldn’t take my 4x4 anywhere else.',
    source: 'Google',
    verifiedCustomer: true
  },
  {
    id: 'rev-3',
    author: 'Sarah Hughes',
    rating: 5,
    date: '4 months ago',
    vehicleModel: 'Range Rover Vogue L405',
    text: 'Dealership-quality diagnostics without main dealer labor rates. They ran a full Autologic check on my Vogue before an MOT, caught a worn suspension bushing, and fixed it cleanly. Polite, professional, and trustworthy.',
    source: 'Google',
    verifiedCustomer: true
  },
  {
    id: 'rev-4',
    author: 'Richard Price',
    rating: 5,
    date: '5 months ago',
    vehicleModel: 'Discovery 4 3.0 TDV6',
    text: 'Had an intermittent engine management light and loss of power. Bell Automotive updated the ECU software and replaced an EGR valve assembly promptly. Superb communication throughout.',
    source: 'Google',
    verifiedCustomer: true
  },
  {
    id: 'rev-5',
    author: 'David Wilson',
    rating: 5,
    date: '6 months ago',
    vehicleModel: 'Range Rover Velar',
    text: 'Top class service from start to finish. The team explained exactly what was required for my annual service and brake replacement. Friendly, approachable, and highly skilled 4x4 mechanics in Queensferry.',
    source: 'Google',
    verifiedCustomer: true
  }
];
