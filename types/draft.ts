export interface CreateDraftDto {
  title: string;
  content: string;
  userId: string;
}

export interface UpdateDraftDto extends Partial<CreateDraftDto> {}
