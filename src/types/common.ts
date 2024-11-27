export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export type CreateDTO<T> = Omit<T, keyof BaseEntity>;
export type UpdateDTO<T> = Partial<CreateDTO<T>>; 