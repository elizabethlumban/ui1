export interface IItem {
  name: string;
  origUrl: string;
}
export interface IRecord {
  originalUrl: string;
}

export interface IState {
  loading: boolean;
  submittingChanges: boolean;
  items: IItem[];
  originalUrl: string;
}
