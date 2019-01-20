export default function toString(value) {
  // Use concat rather than string so that the behavior is the same as when
  // expressions are evaluated in templates (look for Runtime Semantics:
  // Evaluation of a TemplateLiteral).
  return ''.concat(value);
}
