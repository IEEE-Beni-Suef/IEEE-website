import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoriesApi, eventsApi } from "~/lib/api";
import type { ApiCategory, ApiEvent } from "~/types/api.types";
import type {
  CreateCategoryFormData,
  RenameCategoryFormData,
  UpdateCategoryDescFormData,
  CreateEventFormData,
  RenameEventFormData,
  UpdateEventKeywordsFormData,
  UpdateEventDatesFormData,
} from "~/utils/schemas";

// ──────────────────────────────────────────────────────────────
// Query Keys
// ──────────────────────────────────────────────────────────────
export const categoryKeys = {
  all: ["apiCategories"] as const,
  detail: (id: string) => ["apiCategories", id] as const,
};

export const eventKeys = {
  all: ["apiEvents"] as const,
  detail: (id: string) => ["apiEvents", id] as const,
};

// ──────────────────────────────────────────────────────────────
// Category Queries
// ──────────────────────────────────────────────────────────────

/** Fetch all GUID-based categories (new API) */
export const useApiCategories = () => {
  return useQuery<ApiCategory[]>({
    queryKey: categoryKeys.all,
    queryFn: categoriesApi.getAll,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

/** Fetch a single category by GUID */
export const useApiCategory = (id: string) => {
  return useQuery<ApiCategory | undefined>({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoriesApi.getById(id),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!id,
  });
};

// ──────────────────────────────────────────────────────────────
// Category Mutations
// ──────────────────────────────────────────────────────────────

/** Create a new category */
export const useCreateApiCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryFormData) =>
      categoriesApi.create({ name: data.name, description: data.description ?? null }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

/** Rename a category */
export const useRenameCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RenameCategoryFormData }) =>
      categoriesApi.rename(id, { newName: data.newName }),
    onSuccess: (_result, { id }) => {
      qc.invalidateQueries({ queryKey: categoryKeys.all });
      qc.invalidateQueries({ queryKey: categoryKeys.detail(id) });
    },
  });
};

/** Update a category's description */
export const useUpdateCategoryDesc = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryDescFormData }) =>
      categoriesApi.updateDescription(id, { newDescription: data.newDescription ?? null }),
    onSuccess: (_result, { id }) => {
      qc.invalidateQueries({ queryKey: categoryKeys.all });
      qc.invalidateQueries({ queryKey: categoryKeys.detail(id) });
    },
  });
};

/** Delete a category */
export const useDeleteApiCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoriesApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

// ──────────────────────────────────────────────────────────────
// Event Queries
// ──────────────────────────────────────────────────────────────

/** Fetch all events */
export const useApiEvents = () => {
  return useQuery<ApiEvent[]>({
    queryKey: eventKeys.all,
    queryFn: eventsApi.getAll,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

/** Fetch a single event by GUID */
export const useApiEvent = (id: string) => {
  return useQuery<ApiEvent | undefined>({
    queryKey: eventKeys.detail(id),
    queryFn: () => eventsApi.getById(id),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!id,
  });
};

// ──────────────────────────────────────────────────────────────
// Event Mutations
// ──────────────────────────────────────────────────────────────

/** Create a new event */
export const useCreateEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEventFormData) =>
      eventsApi.create({
        name: data.name,
        keyWords: data.keyWords,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        isCommingSoon: data.isCommingSoon,
        categoryId: data.categoryId,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: eventKeys.all });
    },
  });
};

/** Rename an event */
export const useRenameEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RenameEventFormData }) =>
      eventsApi.rename(id, { newName: data.newName }),
    onSuccess: (_result, { id }) => {
      qc.invalidateQueries({ queryKey: eventKeys.all });
      qc.invalidateQueries({ queryKey: eventKeys.detail(id) });
    },
  });
};

/** Update an event's keywords */
export const useUpdateEventKeywords = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEventKeywordsFormData }) =>
      eventsApi.updateKeywords(id, { keyWords: data.keyWords }),
    onSuccess: (_result, { id }) => {
      qc.invalidateQueries({ queryKey: eventKeys.all });
      qc.invalidateQueries({ queryKey: eventKeys.detail(id) });
    },
  });
};

/** Update an event's dates / coming-soon flag */
export const useUpdateEventDates = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEventDatesFormData }) =>
      eventsApi.updateDates(id, {
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        isCommingSoon: data.isCommingSoon,
      }),
    onSuccess: (_result, { id }) => {
      qc.invalidateQueries({ queryKey: eventKeys.all });
      qc.invalidateQueries({ queryKey: eventKeys.detail(id) });
    },
  });
};

/** Delete an event */
export const useDeleteEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => eventsApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: eventKeys.all });
    },
  });
};
