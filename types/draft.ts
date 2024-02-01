export interface CreateDraftDto {
  title: string;
  content: string;
  userId: string;
}

export interface UpdateDraftDto extends Partial<CreateDraftDto> {}

export interface GenerateDraftDto {
  articleType: 'technical how-to' | 'marketing';
}

export interface PublishDraftToHashnodeDto {
  title: string;
  content: string;
  tags: string;
}

export interface HashnodeTags {
  name: string;
  slug: string;
}
