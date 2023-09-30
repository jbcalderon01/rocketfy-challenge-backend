export interface ZodError {
  issues: Issue[];
}

export interface Issue {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
}

export function errorSchemaFormatter(error: ZodError) {
  return {
    message: "Schema Validation error",
    errors: error.issues.map((issue: Issue) => {
      return {
        code: issue.code,
        expected: issue.expected,
        received: issue.received,
        field: issue.path[1],
        message: issue.message,
      };
    }),
  };
}
