// Definiția structurii unui film pentru aplicația noastră
export interface Movie {
  id: number;
  title: string;
  year: number;
  image: string;
}

export interface MovieDetail extends Movie {
  overview?: string;
  backdropImage?: string;
  voteAverage?: number;
  genres?: string[];
  runtime?: number;
}

// Definiția structurii pentru datele de conectare
export interface UserCredentials {
  email: string;
  password?: string; // Parola este opțională în anumite contexte de validare
}
