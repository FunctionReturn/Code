import parse from '@emmetio/html-matcher';
import parseStylesheet from '@emmetio/css-parser';

export function isStyleSheet(syntax: string): boolean {
  const stylesheetSyntaxes = ['css', 'scss', 'sass', 'less', 'stylus'];
  return stylesheetSyntaxes.indexOf(syntax) > -1;
}

/**
 * Parses the given document using emmet parsing modules
 */
export function parseDocument(document, showError): Node | undefined {
  const parseContent = isStyleSheet(document.languageId)
    ? parseStylesheet
    : parse;
  try {
    return parseContent(document.getValue());
  } catch (e) {
    if (showError) {
      /* nothing */
    }
  }
  return undefined;
}

/**
 * Returns inner range of an html node.
 * @param currentNode
 */
export function getInnerRange(currentNode) {
  if (!currentNode.close) {
    return undefined;
  }
  return new monaco.Range(currentNode.open.end, currentNode.close.start);
}

/**
 * Returns node corresponding to given position in the given root node
 */
export function getNode(
  root: Node | undefined,
  position,
  includeNodeBoundary: boolean = false
) {
  if (!root) {
    return null;
  }

  let currentNode = root.firstChild;
  let foundNode = null;

  while (currentNode) {
    const nodeStart = currentNode.start;
    const nodeEnd = currentNode.end;
    if (
      (nodeStart.isBefore(position) && nodeEnd.isAfter(position)) ||
      (includeNodeBoundary &&
        (nodeStart.isBeforeOrEqual(position) &&
          nodeEnd.isAfterOrEqual(position)))
    ) {
      foundNode = currentNode;
      // Dig deeper
      currentNode = currentNode.firstChild;
    } else {
      currentNode = currentNode.nextSibling;
    }
  }

  return foundNode;
}
