import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const crudApi = createApi({
  reducerPath: "crudApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  tagTypes: ["Crud"],
  endpoints: (build) => {
    return {
      getUsers: build.query({
        query: (api) => api,
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }: any) => ({ type: "Crud", id })),
                { type: "Crud", id: "LIST" },
              ]
            : [{ type: "Crud", id: "LIST" }],
      }),
      saveUser: build.mutation({
        query(data) {
          return {
            url: "/users",
            method: "post",
            body: data,
          };
        },
        invalidatesTags: [{ type: "Crud", id: "LIST" }],
      }),
      delUser: build.mutation({
        query(id) {
          return {
            url: `/users/${id}`,
            method: "delete",
          };
        },
        invalidatesTags: [{ type: "Crud", id: "LIST" }],
      }),
      saveResume: build.mutation({
        query(data) {
          return {
            url: "/resume",
            method: "post",
            body: data,
          };
        },
        invalidatesTags: [{ type: "Crud", id: "LIST" }],
      }),

      getResumeId: build.query({
        query(id) {
          return {
            url: `/resume?userId=${id}`,
            method: "get",
          };
        },
        providesTags: (id) => [{ type: "Crud", id }],
      }),
      getSingleResume: build.query({
        query: (id) => `/resume/${id}`,
        providesTags: (id) => [{ type: "Crud", id }],
      }),
    };
  },
});

export const {
  useGetUsersQuery,
  useSaveUserMutation,
  useDelUserMutation,
  useGetResumeIdQuery,
  useSaveResumeMutation,
  useGetSingleResumeQuery,
} = crudApi;
