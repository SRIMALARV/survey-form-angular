export interface Response {
    id?: string; 
    formId: string;
    responses: {
      questionId: string;
      answer: string | number | string[] | null;  
    }[];
    status: string;
  }
  