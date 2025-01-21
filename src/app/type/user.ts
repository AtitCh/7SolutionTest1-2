export type IUser = {
  gender: "male" | "female";
  company: { department: string };
  age: number;
  hair: { color: string };
  address: { postalCode: string };
  firstName: string;
  lastName: string;
};

export type ISummary = {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
};

export type IGroupedData = {
  [department: string]: ISummary;
};
