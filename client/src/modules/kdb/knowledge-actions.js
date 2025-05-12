import { post } from '@/api/client';

export const importFile = async (formData) => await post(`/rag/import/file`, formData);
