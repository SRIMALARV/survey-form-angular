export interface Form {
    id?: string;
    name: string;
    status?: string; 
    questions: {
      questionText: string;
      type: string; 
      validations?: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        minValue?: number;
        maxValue?: number;
        options?: string[];
        allowedFormats?: string[];
      };
    }[];
  }
  