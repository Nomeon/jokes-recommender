export interface Education {
  studie: string;
  instelling: string;
  afrondingsjaar: string;
}

export interface Experience {
  bedrijf: string;
  start: string;
  einde: string;
  taken: string[];
}

export interface Language {
  taal: string;
  niveau: string;
}

export interface ParsedData {
  vaardigheden: string[];
  opleidingen: Education[];
  werkervaring: Experience[];
  talen: Language[];
  [key: string]: any; // For additional fields
}