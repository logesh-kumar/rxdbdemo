import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";

const userSchemLiteral = {
  title: "user schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    age: {
      type: "integer",
    },
  },
  required: ["id", "firstName", "lastName", "age"],
} as const; // set as const to preserve the type information

const schemaTyped = toTypedRxJsonSchema(userSchemLiteral);

// aggreragete the document type from the schema
export type UserType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

// create a typed RxJsonSchema fdoem the literal typed object
export const userSchema: RxJsonSchema<UserType> = userSchemLiteral;
