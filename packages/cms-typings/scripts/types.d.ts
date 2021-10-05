export type MicroCMSApiFieldKind =
  | 'text'
  | 'textArea'
  | 'richEditor'
  | 'media'
  | 'date'
  | 'boolean'
  | 'select'
  | 'relation'
  | 'relationList'
  | 'number'
  | 'custom'
  | 'multiCustom';

export type MicroCMSApiField = {
  idValue?: string;
  fieldId: string;
  name: string;
  kind: MicroCMSApiFieldKind;
  required?: boolean;
  selectItems?: Array<{ id: string; value: string }>;
  multipleSelect?: boolean;
  customFieldCreatedAt?: string;
};

export type MicroCMSCustomField = {
  createdAt: string;
  fieldId: string;
  name: string;
  fields: Array<MicroCMSApiField>;
  position: string[][];
  updatedAt: string;
  viewerGroup: string;
};

export type MicroCMSApiSchema = {
  apiFields: MicroCMSApiField[];
  customFields: MicroCMSCustomField[];
};
