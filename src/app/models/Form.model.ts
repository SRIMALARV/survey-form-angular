export interface Form {
    id?: string;
    name: string;
    status?: string; // Default is "active"
    questions: {
      questionText: string;
      type: string; // text, number, checkbox, etc.
      validations?: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        minValue?: number;
        maxValue?: number;
        options?: string[];
      };
    }[];
  }
  