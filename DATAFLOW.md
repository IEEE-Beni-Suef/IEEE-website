# Dataflow Map (End-to-End)

## 2.1 Main Data Entities

Extracted from `app/utils/scemas.ts`, `app/lib/api.ts`, and component typings:

- **User / AuthSession:** (`accessToken`, `refreshToken`, `userId`, `roleId`)
- **Committee:** (`name`, `description`, `headId`, `vicesId`, image)
- **Article:** (`title`, `description`, `category`, `keywords`, `photo`, multiple `subsections`)
- **Article Subsection:** (`subtitle`, `paragraph`, `photo`)
- **Category:** (`name`)
- **Meeting:** (`title`, `type`, `description`, `recap`, `committeeId`, `headId`, attendees array)
- **Meeting Attendance:** (`userId`, `isAttend`, `score`)

## 2.2 Main Flows

### Flow 1: Authentication (Login)

- **Trigger:** User clicks "Sign In" button in `app/routes/Login.tsx`.
- **Components involved:** `Login.tsx` -> `Button`.
- **Hooks involved:** `useForm(zodResolver(loginSchema))` -> `useMutation` -> `saveAuth()`.
- **Store/Cache usage:** Saves tokens in cookies (`access_token`, `refresh_token`, `user_id`). Dispatches `notifyAuthChange` to update `useAuth()` listeners.
- **API calls:** POST `/Account/Login` triggered via `loginApi()` (in `api.ts`).
- **Transformation steps:** Validated via `loginSchema` (Zod).
- **Error handling:** Axios error extracted in `loginApi()`. `onError` logs failure, `react-hot-toast` displays notifications (configured in `App.tsx` global Toaster).

### Flow 2: Route Protection (ProtectedRoute)

- **Trigger:** Navigating to protected routes (e.g., `/dashboard`).
- **Components involved:** `app/components/ProtectedRoute.tsx`.
- **Hooks involved:** `useAuth()` (`app/hooks/useAuth.ts`), `useQuery` inside `useAuth`, `useLocation()`.
- **Store/Cache usage:** Reads tokens from cookies. `useQuery` fetches User by `userId`.
- **API calls:** GET `/Users/${id}` triggered via `getUser()` (if token exists).
- **Logic:** Checks `!isAuthenticated` -> Redirect to `/login`. Checks `!allowedRoles.includes(user.roleId)` -> Render "Access Denied" view.

### Flow 3: Articles list + details (ArticleDisplay)

- **Trigger:** User navigates to `/article/:id`.
- **Components involved:** `app/routes/article.$id.tsx`.
- **Hooks involved:** `useParams()`, `useGetArticleSubsection(id)`.
- **Store/Cache usage:** Query cache key: `["articleSubsection", id]`.
- **API calls:** GET `/Articles/${id}/show` via `getArticleSubsectionByIdApi`.
- **Logic:** Renders loading skeleton while `isLoading` is true. Displays Article data and loops over `article.subsections`.

### Flow 4: Categories Management

- **Trigger:** Submitting "Create/Edit Category" in `app/components/CategoryModal.tsx`.
- **Components involved:** `CategoryModal.tsx` rendered typically inside `dashboard.articles.tsx` (or similar).
- **Hooks involved:** Local State `useState`, Zod parsing `categorySchema.parse(formData)`. Parent passes `onSubmit` which typically calls `useCreateCategory().mutate()`.
- **Store/Cache usage:** `onSuccess` from the mutation calls `queryClient.invalidateQueries({ queryKey: ["categories"] })` to force refetch.
- **API calls:** POST `/Category` or PUT `/Category/${id}`.

### Flow 5: Committees Management

- **Trigger:** Submitting the `CommitteeModal` form.
- **Components involved:** `app/components/CommitteeModal.tsx`.
- **Hooks involved:** `useAllUsers()` to fetch heads/vices. `useForm(zodResolver(committeeSchema))`.
- **Store/Cache usage:** `useAllUsers` hits cache `["users"]`. On submit success, invalidates `["committees"]`.
- **Transformations:** Custom `FormData` assembly appending `vicesId` loop and `imageUrl` File object.
- **API calls:** POST `/Committees` or PUT `/Committees/${id}` via `api.ts` (multipart/form-data config).

### Flow 6: Navigation-driven Flow & Refresh Interceptor

- **Trigger:** 401 Unauthorized API error intercept in `app/config/apiClient.ts`.
- **Components involved:** `app/root.tsx` -> `useNavigationInit()`.
- **Hooks involved:** `useNavigationInit()` mounts `navigationService.setNavigate()`.
- **Logic:** `apiClient.interceptors.response` detects 401. Queues subsequent calls into `failedQueue`. Triggers `refreshTokenApi(refreshToken)`.
- **API calls:** POST `/Account/refresh`.
- **Outcome:** If successful, rewrites headers and replays queued calls. If failed, triggers `navigationService.navigateTo("/login")` outside of the React routing tree context.

## 2.3 Edges List for Graph Drawing

```text
Login.tsx -> useForm -> loginApi -> POST /Account/Login -> saveAuth(cookie) -> navigate(/)
Router -> ProtectedRoute -> useAuth -> getUser -> GET /Users/${id} -> Render View or Redirect
article.$id.tsx -> useGetArticleSubsection -> getArticleSubsectionByIdApi -> GET /Articles/${id}/show -> Render Article
CategoryModal.tsx -> z.parse() -> parent.onSubmit -> useCreateCategory -> POST /Category -> queryClient.invalidate["categories"]
CommitteeModal.tsx -> useAllUsers -> fetch Heads/Vices -> useForm -> FormData -> createCommitteeApi -> POST /Committees
useNavigationInit -> setGlobalNavigate -> apiClient.interceptor 401 -> refreshTokenApi -> POST /Account/refresh
```
