export interface CardResponse {
  id: string;
  shortId: number;
  name: string;
  board_id: {
    id: string;
    name: string;
    status: number;
  };
}

export interface CardValues {
  name: string;
  board_id: string;
}
