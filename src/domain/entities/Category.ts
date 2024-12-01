export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateCategoryDTO = {
    name: string;
    description?: string | null;
    parentId?: string | null;
};

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;

export type CategoryListItem = Pick<Category, 'id' | 'name' | 'slug' | 'parentId'>;