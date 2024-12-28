export interface BoardResponse {
  id: string;
  name: string;
  status: number;
  workplace_id: {
    id: string;
    name: string;
  };
}

export interface BoardValues {
  name: string;
  status: number;
  workplace_id: string;
}
