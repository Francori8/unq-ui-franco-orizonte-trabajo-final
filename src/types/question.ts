export interface Question {
  id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;

  translatedQuestion?: string;
  translatedOption1?: string;
  translatedOption2?: string;
  translatedOption3?: string;
  translatedOption4?: string;
}
