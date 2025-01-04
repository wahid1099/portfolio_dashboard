import { TApiResponse } from "../../../interfaces/api-response";
import { baseApi } from "../../api/base-api";

const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editAbout: builder.mutation({
      query: (args: Record<string, string>) => ({
        url: "/about",
        method: "PUT",
        body: args,
      }),
      invalidatesTags: ["about"],
    }),

    fetchAbout: builder.query({
      query: () => ({
        url: "/about",
        method: "GET",
      }),
      transformResponse: (response: TApiResponse) => {
        if (!response || !response.data) {
          throw new Error("Invalid response structure");
        }
        return response.data;
      },
      providesTags: ["about"],
    }),
  }),
});

export const { useEditAboutMutation, useFetchAboutQuery } = aboutApi;
