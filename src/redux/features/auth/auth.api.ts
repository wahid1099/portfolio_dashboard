import { TApiResponse } from "../../../interfaces/api-response";
import { baseApi } from "../../api/base-api";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse) => {
        if (!response || !response.data) {
          throw new Error("Invalid response format");
        }
        return response.data;
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
