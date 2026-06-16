export interface IAboutBlockImage {
  src: string;
  alt: string;
}

export interface IBestProgramsItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  backgroundColor: string;
  description: string;
}

export interface IBestProgramsImage {
  id: number;
  src: string;
  alt: string;
}

export interface IPopularTourisms {
  id: number;
  title: string;
  text: string;
  price: number;
  rating: number;
  image: string;
  alt: string;
}

export interface IBlog {
  id: number;
  title: string;
  text: string;
  date: string;
  image: string;
  alt: string;
}

export interface IMessage {
  id: number;
  status: string;
  text: string;
  isClosing?: boolean;
}
