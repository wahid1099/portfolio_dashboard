import { IArticle } from "../../../components/dashboard/edit-article";
import { TApiResponse } from "../../../interfaces/api-response";
import { baseApi } from "../../api/base-api";

const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllArticles: builder.query({
      query: () => ({
        url: "/articles",
        method: "GET",
      }),
      transformResponse: (response: TApiResponse) => {
        if (!response || !response.data) {
          throw new Error("Invalid response structure");
        }
        return response.data;
      },
      providesTags: ["articles"],
    }),

    getSingleArticle: builder.query({
      query: (args: { _id: string }) => ({
        url: `/articles/${args._id}`,
        method: "GET",
      }),
      transformResponse: (response: TApiResponse) => {
        if (!response || !response.data) {
          throw new Error("Invalid response structure");
        }
        return response.data;
      },
      providesTags: ["articles"],
    }),

    createNewArticle: builder.mutation({
      query: (payload: Record<string, unknown>) => ({
        url: "/articles",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["articles"],
    }),

    updateArticle: builder.mutation({
      query: (payload: { _id: string; data: IArticle }) => ({
        url: `/articles/${payload._id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["articles"],
    }),

    deleteArticle: builder.mutation({
      query: (args: { _id: string }) => ({
        url: `/articles/${args._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["articles"],
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useCreateNewArticleMutation,
  useDeleteArticleMutation,
  useGetSingleArticleQuery,
  useUpdateArticleMutation,
} = articleApi;
