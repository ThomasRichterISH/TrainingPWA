import { useSsrVariableInsteadOfPlatformIdRule } from '../src/rules/use-ssr-variable-instead-of-platform-id';

import { RuleTestConfig } from './_execute-tests';

const config: RuleTestConfig = {
  ruleName: 'use-ssr-variable-instead-of-platform-id',
  rule: useSsrVariableInsteadOfPlatformIdRule,
  tests: {
    valid: [],
    invalid: [
      {
        filename: 'file.ts',
        code: `if (isPlatformBrowser(this.platformId)) {}`,
        errors: [
          {
            messageId: 'useSsrVariableInsteadOfPlatformIdForBrowser',
            suggestions: [
              {
                messageId: 'useSsrVariableInsteadOfPlatformIdForBrowser',
                output: `if (!SSR) {}`,
              },
            ],
          },
        ],
      },
      {
        filename: 'file.ts',
        code: `if (isPlatformServer(this.platformId)) {}`,
        errors: [
          {
            messageId: 'useSsrVariableInsteadOfPlatformIdForServer',
            suggestions: [
              {
                messageId: 'useSsrVariableInsteadOfPlatformIdForServer',
                output: `if (SSR) {}`,
              },
            ],
          },
        ],
      },
    ],
  },
};

export default config;
