export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  order?: number;
  dueDate?: string;
  notes?: string; //设计稿中没有用到这个字段
  tags?: string[]; //设计稿中没有用到这个字段
}

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
