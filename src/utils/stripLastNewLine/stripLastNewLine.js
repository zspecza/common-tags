import toString from '../toString';

export default function stripLastNewLine(value) {
  const stringValue = toString(value);
  const { length } = stringValue;
  return length > 0 && stringValue[length - 1] === '\n'
    ? stringValue.slice(0, length - 1)
    : stringValue;
}
