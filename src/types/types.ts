export interface OptionType {
  id: string;
  title: string;
  isAnswer: boolean;
}

export interface QuestionType {
  id: string;
  prompt: string;
  images: string[];
  points: number;
  options: OptionType[];
  rtl?: boolean;
}

export interface QuizType {
  id: string;
  title: string;
  timeLimit: number;
  description: string;
  questions: QuestionType[];
  status?: string;
  updatedAt?: Date;
  points?: number;
  startTime: Date;
  endTime: Date;
  owner?: string;
  prizeAmount: number;
  prizeLogic?: string;
  prizeProcessed?: boolean;
}
