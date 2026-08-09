export interface VehiclePart {
  id: string;
  name: string;
  category: 'Powertrain' | 'Chassis & Ride' | 'Electronics & Diagnostics' | 'Body & Structural';
  shortDescription: string;
  description: string;
  whyItMatters: string;
  commonIssues: string[];
  serviceDescription: string;
  hotspot: {
    x: number; // percentage X position on canvas (0 to 100)
    y: number; // percentage Y position on canvas (0 to 100)
  };
}

export const VEHICLE_PARTS: VehiclePart[] = [
  {
    id: 'engine-v8',
    name: '5.0L Supercharged V8 / Ingenium Engine',
    category: 'Powertrain',
    shortDescription: 'High-performance engine assembly delivering smooth power and refined torque.',
    description: 'The heartbeat of the Range Rover. Engineered for dual personality—effortless highway cruising and uncompromising all-terrain capability. Requires specialist maintenance to preserve precise valve timing, supercharger efficiency, and cooling equilibrium.',
    whyItMatters: 'Optimal engine health ensures full power output, fuel efficiency, and prevents thermal stress on surrounding aluminum components.',
    commonIssues: [
      'Timing chain wear & guide tensioner slack',
      'Supercharger isolator wear & noise',
      'Coolant crossover pipe cracking',
      'Oil cooler tube o-ring degradation'
    ],
    serviceDescription: 'Bell Automotive provides comprehensive engine diagnostics, timing chain replacements, supercharger service, and full engine rebuilds using genuine Land Rover specifications.',
    hotspot: { x: 50, y: 38 }
  },
  {
    id: 'air-suspension',
    name: 'Adaptive Electronic Air Suspension',
    category: 'Chassis & Ride',
    shortDescription: 'Multi-chamber air struts providing legendary magic-carpet ride quality.',
    description: 'Land Rover’s advanced electronic air suspension system adjusts height and dampening dynamically across varying terrain. Features cross-linked air springs, height sensor feedback loops, and a central pneumatic valve block.',
    whyItMatters: 'Essential for maintaining vehicle level, aerodynamic stability at speed, and maximum ground clearance when off-roading.',
    commonIssues: [
      'Air strut bladder pinhole leaks',
      'Compressor motor overheating & pressure drop',
      'Height sensor calibration drift',
      'Valve block solenoid seal failure'
    ],
    serviceDescription: 'We specialize in air suspension leak detection, compressor refurbishments, height sensor recalibrations, and conversion/replacement with OEM dampening hardware.',
    hotspot: { x: 30, y: 62 }
  },
  {
    id: 'braking-system',
    name: 'Brembo High-Performance Braking System',
    category: 'Chassis & Ride',
    shortDescription: 'Six-piston front calipers with ventilated disc rotors for supreme stopping power.',
    description: 'Designed to bring a 2.5-ton luxury vehicle to a controlled, immediate standstill. Features lightweight aluminum multi-piston calipers, heat-dissipating ventilated rotors, and integrated electronic park brake modules.',
    whyItMatters: 'Uncompromised braking performance is safety-critical, particularly under towing conditions or downhill terrain descending.',
    commonIssues: [
      'Uneven brake pad wear & rotor warping',
      'Electronic park brake (EPB) actuator binding',
      'Brake fluid moisture accumulation & fade',
      'ABS sensor wiring harness abrasion'
    ],
    serviceDescription: 'Full brake system maintenance including high-performance rotor replacement, EPB recalibration, brake line flushing, and ABS module diagnostics.',
    hotspot: { x: 74, y: 65 }
  },
  {
    id: 'transmission-zf8',
    name: 'ZF 8-Speed Automatic & Transfer Case',
    category: 'Powertrain',
    shortDescription: 'Ultra-fast gear shifting twin-speed transfer box with locking center differential.',
    description: 'Pairs high-speed mechanical gear shifting with intelligent terrain response shift maps. Seamlessly manages torque split between front and rear axles via an active electronic center differential.',
    whyItMatters: 'Smooth gear transitions protect drivetrain components and optimize fuel efficiency during high-torque demands.',
    commonIssues: [
      'Mechatronic valve body solenoid hesitation',
      'Fluid degradation past 60,000 miles',
      'Transfer case shift motor position sensor fault',
      'Output shaft seal weeping'
    ],
    serviceDescription: 'Fluid and pan filter service, mechatronics reconditioning, transfer case motor recalibration, and complete gearbox overhauls.',
    hotspot: { x: 44, y: 48 }
  },
  {
    id: 'autologic-ecu',
    name: 'Central ECU & Autologic Diagnostic Network',
    category: 'Electronics & Diagnostics',
    shortDescription: 'Interconnected CAN-bus computer modules orchestrating vehicle dynamics.',
    description: 'Over 70 onboard electronic control units govern everything from Terrain Response 2 algorithms to dynamic stability, air ride balance, and engine map optimization.',
    whyItMatters: 'Precise diagnostic scan data allows technicians to pinpoint software glitches or sensor failures without blind component swapping.',
    commonIssues: [
      'Low voltage battery cascading software errors',
      'CAN-bus communication gateway interference',
      'Outdated module firmware causing sensor glitches',
      'Water ingress in passenger footwell ECU wiring'
    ],
    serviceDescription: 'Bell Automotive utilizes Autologic dealer-level diagnostic equipment to perform module flash updates, software adaptations, and electronic fault tracing.',
    hotspot: { x: 58, y: 30 }
  },
  {
    id: 'cooling-intake',
    name: 'Twin-Turbo / Supercharger Cooling System',
    category: 'Powertrain',
    shortDescription: 'Dual charge-air coolers, auxiliary radiators, and variable thermostat housing.',
    description: 'High-output luxury engines generate substantial heat under load. The cooling system features aluminum radiators, electric water pumps for intercoolers, and intelligent thermostat routing.',
    whyItMatters: 'Prevents thermal engine lock, maintains intake air density for maximum horsepower, and protects cylinder head gaskets.',
    commonIssues: [
      'Brittle plastic coolant outlet pipes',
      'Auxiliary water pump impeller failure',
      'Thermostat stuck open or closed',
      'Radiator core stone puncture'
    ],
    serviceDescription: 'Cooling system pressure testing, metal crossover pipe upgrades, coolant flush, and auxiliary pump replacements.',
    hotspot: { x: 62, y: 42 }
  },
  {
    id: 'steering-rack',
    name: 'Electronic Power Assisted Steering (EPAS)',
    category: 'Chassis & Ride',
    shortDescription: 'Variable ratio electric steering rack providing precision feedback and park assist.',
    description: 'Eliminates hydraulic drag while delivering fingertip maneuverability at low speeds and reassuring weighting on highways.',
    whyItMatters: 'Keeps steering predictable and aligned across harsh road surfaces and off-road obstacles.',
    commonIssues: [
      'EPAS belt alignment noise',
      'Steering tie rod inner/outer ball joint play',
      'Rack position sensor fault codes',
      'Corrosion on mounting hardware'
    ],
    serviceDescription: 'Steering geometry alignment, rack bolt replacement, tie rod renewals, and EPAS torque sensor calibration.',
    hotspot: { x: 38, y: 55 }
  },
  {
    id: 'exhaust-dpf',
    name: 'Stainless Steel Exhaust & DPF / SCR System',
    category: 'Powertrain',
    shortDescription: 'Acoustically tuned exhaust manifolds with selective catalytic reduction.',
    description: 'Reduces tailpipe emissions while tuning the rich exhaust acoustic profile characteristic of modern Range Rovers.',
    whyItMatters: 'Ensures compliance with emissions standards and prevents engine backpressure restrictions.',
    commonIssues: [
      'Diesel Particulate Filter (DPF) soot saturation from short trips',
      'AdBlue / SCR injector crystallization',
      'Exhaust gas temperature (EGT) sensor breakdown',
      'Flexi-pipe stainless mesh fatigue'
    ],
    serviceDescription: 'DPF forced regeneration, chemical cleaning, AdBlue system repairs, and custom stainless exhaust repairs.',
    hotspot: { x: 25, y: 45 }
  }
];
