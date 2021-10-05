import { JSONSchema4, JSONSchema4TypeName } from 'json-schema';
import { MicroCMSApiField, MicroCMSApiFieldKind, MicroCMSApiSchema } from './types';

const propertyToJsonSchema = (apiField: MicroCMSApiField, schema: MicroCMSApiSchema): JSONSchema4 => {
  const { fieldId, name, kind } = apiField;

  switch (kind) {
    case 'text':
    case 'textArea':
    case 'richEditor':
    case 'date':
      return { type: 'string' };
    case 'media':
      return {
        type: 'object',
        properties: {
          url: { type: 'string' },
          height: { type: 'number' },
          width: { type: 'number' },
        },
        required: ['url', 'height', 'width'],
        additionalProperties: false,
      }
    case 'boolean':
      return { type: 'boolean' };
    case 'select':
      return {
        type: 'array',
        items: { type: 'string' },
      };
    case 'relation':
      return {};
    case 'relationList':
      return {};
    case 'number':
      return { type: 'number' };
    case 'custom':
      return {};
    case 'multiCustom':
      return {};
    default:
      return {}
  }
}

const apiFieldToJsonSchema = (apiFields: MicroCMSApiField[], schema: MicroCMSApiSchema): JSONSchema4 => {
  const propertiesEntries: (readonly [string, JSONSchema4])[] = apiFields.map((apiField) => {
    const { fieldId, name } = apiField;

    const jsonSchema: JSONSchema4 = {
      description: name,
      ...propertyToJsonSchema(apiField, schema),
    };

    return [fieldId, jsonSchema] as const;
  });
  const required = apiFields.filter(({ required }) => required).map(({ fieldId }) => fieldId);

  return {
    properties: Object.fromEntries(propertiesEntries),
    required,
    additionalProperties: false,
    additionalItems: false,
  }
}

export const apiSchemaToJsonSchema = (apiSchema: MicroCMSApiSchema): JSONSchema4 => {
  return apiFieldToJsonSchema(apiSchema.apiFields, apiSchema);
};
