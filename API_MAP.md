# API Surface Map

## 3.1 API Base Config

- **Location:** `app/config/apiClient.ts`
- **Base URL:** `import.meta.env.VITE_API_URL`
- **Default Headers:** `Content-Type: application/json`
- **Auth Token Location:** Stored in cookies (`access_token`, `refresh_token`, `user_id`), retrieved via `getCookie()`.
- **Auth Mechanism:** Request interceptor injects `Authorization: Bearer ${accessToken}` if token exists.
- **Retry/Cancel Logic:**
  - Response interceptor catching `401 Unauthorized`.
  - Checks if `isRefreshing` is true. If true, queues requests in `failedQueue`.
  - Fires `refreshTokenApi(/Account/refresh)`. On success, updates cookies and replays `failedQueue`.
  - If refresh fails, it clears credentials and forcibly navigates to `/login` via global `navigationService`.

## 3.2 Endpoint Enumeration

| Method     | Path                         | Request Shape                                | Response Shape                                | Auth Req?        | Called From (Hook/File)                  | Caching / Invalidation              |
| :--------- | :--------------------------- | :------------------------------------------- | :-------------------------------------------- | :--------------- | :--------------------------------------- | :---------------------------------- |
| **POST**   | `/Account/Register`          | `{ fName, lName, email, password... }` (zod) | User object                                   | No               | `api.ts` -> `registerApi`                | N/A                                 |
| **POST**   | `/Account/Login`             | `{ email, password }`                        | `{ accessToken, refreshToken, user: { id } }` | No               | `api.ts` -> `loginApi`                   | Saved to cookies                    |
| **POST**   | `/Account/refresh`           | `token` string                               | `{ accessToken, refreshToken }`               | No?              | `api.ts` -> `refreshTokenApi`            | Updates cookies                     |
| **POST**   | `/Users`                     | User payload (zod)                           | User Object                                   | Yes              | `useApi.ts` -> `useCreateUser`           | Invalidates `["users"]`             |
| **GET**    | `/Users`                     | None                                         | `User[]`                                      | Yes              | `useApi.ts` -> `useAllUsers`             | Query `["users"]`                   |
| **GET**    | `/Users/${id}`               | Path Param                                   | `User`                                        | Yes              | `useApi.ts` -> `useAuth`, `getUser`      | Query `["user", id]`                |
| **DELETE** | `/Users/${id}`               | Path Param                                   | Result Object                                 | Yes              | `useApi.ts` -> `useDeleteUser`           | N/A                                 |
| **PUT**    | `/Users/${id}`               | Updated payload                              | User Object                                   | Yes              | `useApi.ts` -> `useUpdateUser`           | Invalidates `["users", "user"]`     |
| **PUT**    | `/Admin/ActivateUser/${id}`  | Path Param                                   | Result Object                                 | Yes              | `useApi.ts` -> `useActiveUser`           | N/A                                 |
| **GET**    | `/Committees`                | None                                         | `Committee[]`                                 | Yes              | `useApi.ts` -> `useCommittees`           | Query `["committees"]`              |
| **POST**   | `/Committees`                | FormData                                     | `Committee`                                   | Yes              | `useApi.ts` -> `useCreateCommittee`      | Invalidates `["committees"]`        |
| **PUT**    | `/Committees/${id}`          | FormData                                     | `Committee`                                   | Yes              | `useApi.ts` -> `useUpdateCommittee`      | Invalidates `["committees"]`        |
| **GET**    | `/Committees/${id}`          | Path Param                                   | `Committee`                                   | Yes              | `useApi.ts` -> `useGetCommittee`         | Query `["committee", id]`           |
| **DELETE** | `/Committees/${id}`          | Path Param                                   | Result Object                                 | Yes              | `useApi.ts` -> `useDeleteCommittee`      | Invalidates `["committees"]`        |
| **GET**    | `/Articles`                  | None                                         | `Article[]`                                   | Yes              | `useApi.ts` -> `useAllArticles`          | Query `["articles"]`                |
| **GET**    | `/Articles/${id}`            | Path Param                                   | `Article`                                     | Yes              | `useApi.ts` -> `useGetArticle`           | Query `["article", id]`             |
| **POST**   | `/Articles`                  | FormData                                     | `Article`                                     | Yes              | `useApi.ts` -> `useCreateArticle`        | Invalidates `["articles"]`          |
| **PUT**    | `/Articles/${id}`            | FormData                                     | `Article`                                     | Yes              | `useApi.ts` -> `useUpdateArticle`        | Invalidates `["articles"]`          |
| **DELETE** | `/Articles/${id}`            | Path Param                                   | Result Object                                 | Yes              | `useApi.ts` -> `useDeleteArticle`        | Invalidates `["articles"]`          |
| **GET**    | `/Articles/${id}/show`       | Path Param                                   | `Article` + Subsections                       | Yes              | `useApi.ts` -> `useGetArticleSubsection` | Query `["articleSubsection", id]`   |
| **GET**    | `/Category`                  | None                                         | `Category[]`                                  | Yes              | `useApi.ts` -> `useAllCategories`        | Query `["categories"]`              |
| **POST**   | `/Category`                  | `{ name }`                                   | `Category`                                    | Yes              | `useApi.ts` -> `useCreateCategory`       | Invalidates `["categories"]`        |
| **PUT**    | `/Category/${id}`            | `{ name }`                                   | `Category`                                    | Yes              | `useApi.ts` -> `useUpdateCategory`       | Invalidates `["categories"]`        |
| **DELETE** | `/Category/${id}`            | Path Param                                   | Result Object                                 | Yes              | `useApi.ts` -> `useDeleteCategory`       | Invalidates `["categories"]`        |
| **GET**    | `/Subsections`               | None                                         | `Subsection[]`                                | Yes              | `useApi.ts` -> `useAllSubsections`       | Query `["articleSubsection"]`       |
| **POST**   | `/Subsections`               | FormData                                     | `Subsection`                                  | Yes              | `useApi.ts` -> `useCreateSubsection`     | Invalidates `["articleSubsection"]` |
| **PUT**    | `/Subsections/${id}`         | FormData                                     | `Subsection`                                  | Yes              | `useApi.ts` -> `useUpdateSubsection`     | Invalidates `["articleSubsection"]` |
| **DELETE** | `/Subsections/${id}`         | Path Param                                   | Result                                        | Yes              | `useApi.ts` -> `useDeleteSubsection`     | Invalidates `["articleSubsection"]` |
| **GET**    | `/Meetings`                  | None                                         | `Meeting[]`                                   | Yes              | `useApi.ts` -> `useAllMeetings`          | Query `["meetings"]`                |
| **GET**    | `/Meetings/${id}`            | Path Param                                   | `Meeting`                                     | Yes              | `useApi.ts` -> `useGetMeeting`           | Query `["meeting", id]`             |
| **GET**    | `/Meetings/attendents/${id}` | Path Param                                   | `Attendance[]`                                | Yes              | `useApi.ts` -> `useGetMeetingAttendance` | Query `["meetingAttendance", id]`   |
| **POST**   | `/Meetings`                  | `CreateMeetingPayload`                       | `Meeting`                                     | Yes              | `useApi.ts` -> `useCreateMeeting`        | Invalidates `["meetings"]`          |
| **POST**   | `/Meetings/attendent`        | `SubmitAttendancePayload`                    | Result                                        | Yes              | `useApi.ts` -> `useSubmitAttendance`     | Invalidates `["meetingAttendance"]` |
| **POST**   | `/chatbot_fn`                | `{ user_message, chat_history }`             | `string[]`                                    | 3rd Party Gradio | `api.ts` -> `sendChatMessage`            | N/A                                 |
| **POST**   | `/reset_chat`                | None                                         | Output                                        | 3rd Party Gradio | `api.ts` -> `resetChat`                  | N/A                                 |

### Unknowns and Risks:

- Missing Environment Variables: Ensure `VITE_API_URL` is set in `.env` (it is used across `apiClient.ts` as `import.meta.env.VITE_API_URL`).
- Chatbot uses `@gradio/client` targeting `amrhassank/IEEE_AI_ChatBot`. Ensure backend handles this properly.
- All errors are broadly mapped to `error.response?.data.message || "Failed to..."` which is fine but loses specific field validation errors on the client