export type UserData = {
  id: string,
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  displayName: string;
  email: string;
}
