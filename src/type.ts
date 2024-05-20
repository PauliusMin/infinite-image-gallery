interface CatBreed {
  id: string;
  name: string;
  [key: string]: any; // Additional properties can be added as necessary
}

interface CatCategory {
  id: number;
  name: string;
  [key: string]: any; // Additional properties can be added as necessary
}

export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: CatBreed[];
  categories: CatCategory[];
}