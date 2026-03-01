# Architecture Map

## 1.1 Entry Points and Runtime Flow

**Actual Runtime Entry**

- the application is built firmly on React Router v7.
- **Entry point configs:** `react-router.config.ts`, `vite.config.ts`, `package.json` build scripts (`react-router dev`).
- **Main React entry point:** `app/root.tsx` acts as the root layout and provider wrapper.
- **Route Definitions:** `app/routes.ts` contains the routing tree, utilizing RRv7's `route` and `index` configuration patterns.

**Boot Sequence**

1. **Router Creation:** Handled automatically by the React Router framework under the hood, parsing `app/routes.ts`.
2. **Navigation Init:** `useNavigationInit()` hook is called in `App()` component (`app/root.tsx:64`), which registers the navigation service so utility functions (like the auth interceptor) can navigate outside React components.
3. **Theme Init:** `useEffect` in `app/root.tsx:66` dispatches `initializeTheme()` to the Redux store on mount.
4. **Provider Wiring (`app/root.tsx`):**
   - `<QueryClientProvider client={queryClient}>` (from `app/config/queryClient.ts`) wraps the app.
   - `<Provider store={store}>` (from `app/store/store.ts`) wraps the inner elements.
   - UI shells like `<Navbar />`, `<InactiveBanner />`, `<Chatbot />`, and `<Toaster />` sit alongside the `<Outlet />`.

## 1.2 Layering Model

| Module/Folder             | Responsibility                                                       | Key Files                                                                                        | Consumes                                             | Produces                                                | Risks/Notes                                                                        |
| :------------------------ | :------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- | :--------------------------------------------------- | :------------------------------------------------------ | :--------------------------------------------------------------------------------- |
| **Presentation (UI)**     | Reusable UI components, forms, icons, theme toggles, modals.         | `app/components/ui/*`, `app/components/form/*`, `app/components/Modal.tsx`                       | `lucide-react`, Tailwind CSS                         | Reusable UI primitive chunks                            | Direct coupling to Tailwind class utility logic.                                   |
| **Presentation (Routes)** | Pages corresponding to URLs, dashboard views, modals wired to pages. | `app/routes/Login.tsx`, `app/routes/article.$id.tsx`, `app/routes/protected/dashboard.users.tsx` | Hooks, Components                                    | Page Views                                              | Large files blending UI and domain logic.                                          |
| **Domain (Hooks)**        | Business hooks mapping queries and mutations to domains.             | `app/hooks/useApi.ts`, `app/hooks/useAuth.ts`                                                    | `react-query`, `app/lib/api.ts`, Redux/Zustand logic | Domain actions (e.g., `useCommittees`, `useActiveUser`) | `useApi.ts` is quite bloated—contains all entity hooks in one file.                |
| **State (Queries/Redux)** | Caching, async state, and tiny global states (theme).                | `app/config/queryClient.ts`, `app/store/store.ts`, `app/store/slices/themeSlice.ts`              | `@tanstack/react-query`, `@reduxjs/toolkit`          | Cached Data, sync state                                 | Auth state is managed in custom hooks vs Redux, which spreads state.               |
| **Data Access (API)**     | Axios instances, interceptors, endpoint mappers.                     | `app/config/apiClient.ts`, `app/lib/api.ts`                                                      | Axios, local storage/cookies                         | Raw JSON data, token refresh                            | Interceptors handle token refresh via a custom queue.                              |
| **Shared Utils/Types**    | Validation schemas, TS interfaces, navigation utils.                 | `app/utils/scemas.ts`, `app/types/index.ts`, `app/utils/navigation.ts`                           | Zod                                                  | Typed schemas, models                                   | Relies heavily on `any` types in `api.ts` instead of strict schemas in some spots. |

## 1.3 Access Control & Roles (Docs + Code)

According to `docs/permission-decision-trees.md` and `docs/user-roles-diagram.md`:

**Roles Matrix (Inferred from code & docs):**

- System Roles: Normal Member (4), HR Member (3), Head Member/Vice Head (2, 5), High Board (1). Note: The code (`CommitteeModal.tsx`) assumes `roleId === 2` is Head/High Board, and `roleId === 5` is Vice Head.

**Role Check in UI:**

- Managed comprehensively by `app/components/ProtectedRoute.tsx`.
- Receives an `allowedRoles` array prop. Example: `<ProtectedRoute allowedRoles={[1, 2]}>`. If `user.roleId` is not in this array, it displays "Access Denied".

| Role                    | Allowed routes / UI Actions              | Allowed App Actions (Server-side assumed)                      |
| :---------------------- | :--------------------------------------- | :------------------------------------------------------------- |
| **High Board** (`1`)    | Dashboard, Committees, Events, all Users | Create/Update Committees, Delete any item, full modifications. |
| **Head Member** (`2`)   | Dashboard, assigned Committees           | Modify assigned committees, Assignment rating.                 |
| **HR Member** (`3`)     | Dashboard, limited access                | Attendance rating, adding behaviors tracking.                  |
| **Normal Member** (`4`) | Profile view, public routes              | View own assignments, view profile.                            |
| **Vice Head** (`5`)     | Assigned Committees                      | Similar to Head member, subset of committee actions.           |

**Permissions Warning:** Permission constraints rest heavily on the backend returning 401/403s on unauthorized operations, as `ProtectedRoute` hides UI elements, but raw APIs are accessible if a token is valid.
