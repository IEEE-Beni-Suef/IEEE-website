// ============================================================
// Shared API response wrapper
// ============================================================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// ============================================================
// Categories
// (id is a GUID string — distinct from the legacy Category in ~/types)
// ============================================================
export interface ApiCategory {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string | null;
}

export interface RenameCategoryPayload {
  newName: string;
}

export interface UpdateCategoryDescPayload {
  newDescription: string | null;
}

// ============================================================
// Events
// ============================================================
export interface ApiEvent {
  id: string;
  name: string;
  keyWords: string[];
  startDate: string | null;
  endDate: string | null;
  isCommingSoon: boolean;
  categoryId: string;
  category?: ApiCategory;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventPayload {
  name: string;
  keyWords: string[];
  startDate: string | null;
  endDate: string | null;
  isCommingSoon: boolean;
  categoryId: string;
}

export interface RenameEventPayload {
  newName: string;
}

export interface UpdateEventKeywordsPayload {
  keyWords: string[];
}

export interface UpdateEventDatesPayload {
  startDate: string | null;
  endDate: string | null;
  isCommingSoon: boolean;
}
