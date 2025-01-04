import { TApiResponse } from "../../../interfaces/api-response";
import { IProject } from "../../../interfaces/api.res.projects.type";
import { baseApi } from "../../api/base-api";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      transformResponse: (response: TApiResponse) => {
        if (!response || !response.data) {
          throw new Error("Invalid response structure");
        }
        return response.data;
      },
      providesTags: ["projects"],
    }),

    createNewProject: builder.mutation({
      query: (payload: Record<string, unknown>) => ({
        url: "/projects",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["projects"],
    }),

    updateProject: builder.mutation({
      query: (payload: { _id: string; data: IProject }) => ({
        url: `/projects/${payload._id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["projects"],
    }),

    deleteProject: builder.mutation({
      query: (args: { _id: string }) => ({
        url: `/projects/${args._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useFetchAllProjectsQuery,
  useDeleteProjectMutation,
  useCreateNewProjectMutation,
  useUpdateProjectMutation,
} = projectApi;
