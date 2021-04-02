export interface TogglResponseData {
  description: string;
}

// This is not the complete response type - it has just the properties I need
export interface TogglResponse {
  total_grand: number;
  total_count: number;
  data: Array<TogglResponseData>;
}
