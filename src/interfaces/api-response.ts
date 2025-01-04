/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the shape of the API response
export type TApiResponse = {
  status: number;
  success: boolean;
  message: string;
  data: any;
};
