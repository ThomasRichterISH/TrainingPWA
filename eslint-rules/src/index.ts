import { banImportsFilePatternRule } from './rules/ban-imports-file-pattern';
import { componentCreationTestRule } from './rules/component-creation-test';
import { doNotUseThemeIdentifierRule } from './rules/do-not-use-theme-identifier';
import { meaningfulDescribeInTestsRule } from './rules/meaningful-describe-in-tests';
import { newlineBeforeRootMembersRule } from './rules/newline-before-root-members';
import { noAssignmentToInputsRule } from './rules/no-assignment-to-inputs';
import { noCollapsibleIfRule } from './rules/no-collapsible-if';
import { noInitializeObservablesDirectlyRule } from './rules/no-initialize-observables-directly';
import { noIntelligenceInArtifactsRule } from './rules/no-intelligence-in-artifacts';
import { noObjectLiteralTypeAssertionRule } from './rules/no-object-literal-type-assertion';
import { noReturnUndefinedRule } from './rules/no-return-undefined';
import { noStarImportsInStoreRule } from './rules/no-star-imports-in-store';
import { noTestbedWithThenRule } from './rules/no-testbed-with-then';
import { noVarBeforeReturnRule } from './rules/no-var-before-return';
import { orderedImportsRule } from './rules/ordered-imports';
import { privateDestroyFieldRule } from './rules/private-destroy-field';
import { projectStructureRule } from './rules/project-structure';
import { requireFormlyCodeDocumentationRule } from './rules/require-formly-code-documentation';
import { sortTestbedMetadataArraysRule } from './rules/sort-testbed-metadata-arrays';
import { useAliasImportsRule } from './rules/use-alias-imports';
import { useAsyncSynchronizationInTestsRule } from './rules/use-async-synchronization-in-tests';
import { useCamelCaseEnvironmentPropertiesRule } from './rules/use-camel-case-environment-properties';
import { useComponentChangeDetectionRule } from './rules/use-component-change-detection';
import { useCorrectComponentOverridesRule } from './rules/use-correct-component-overrides';
import { useJestExtendedMatchersInTestsRule } from './rules/use-jest-extended-matchers-in-tests';
import { useSsrVariableInsteadOfPlatformIdRule } from './rules/use-ssr-variable-instead-of-platform-id';

const rules = {
  'no-return-undefined': noReturnUndefinedRule,
  'no-assignment-to-inputs': noAssignmentToInputsRule,
  'use-component-change-detection': useComponentChangeDetectionRule,
  'no-initialize-observables-directly': noInitializeObservablesDirectlyRule,
  'no-intelligence-in-artifacts': noIntelligenceInArtifactsRule,
  'use-async-synchronization-in-tests': useAsyncSynchronizationInTestsRule,
  'no-testbed-with-then': noTestbedWithThenRule,
  'component-creation-test': componentCreationTestRule,
  'private-destroy-field': privateDestroyFieldRule,
  'use-jest-extended-matchers-in-tests': useJestExtendedMatchersInTestsRule,
  'ordered-imports': orderedImportsRule,
  'use-camel-case-environment-properties': useCamelCaseEnvironmentPropertiesRule,
  'no-star-imports-in-store': noStarImportsInStoreRule,
  'use-alias-imports': useAliasImportsRule,
  'no-collapsible-if': noCollapsibleIfRule,
  'no-object-literal-type-assertion': noObjectLiteralTypeAssertionRule,
  'ban-imports-file-pattern': banImportsFilePatternRule,
  'project-structure': projectStructureRule,
  'newline-before-root-members': newlineBeforeRootMembersRule,
  'no-var-before-return': noVarBeforeReturnRule,
  'require-formly-code-documentation': requireFormlyCodeDocumentationRule,
  'sort-testbed-metadata-arrays': sortTestbedMetadataArraysRule,
  'do-not-use-theme-identifier': doNotUseThemeIdentifierRule,
  'use-correct-component-overrides': useCorrectComponentOverridesRule,
  'meaningful-describe-in-tests': meaningfulDescribeInTestsRule,
  'use-ssr-variable-instead-of-platform-id': useSsrVariableInsteadOfPlatformIdRule,
};

module.exports = {
  rules,
};
