/**
 * Check whether a hast node is a `<link>` that references CSS.
 *
 * Returns `true` if `node` is a `<link>` element with a `rel` list that
 * contains `'stylesheet'` and has no `type`, an empty `type`, or `'text/css'`
 * as its `type`.
 *
 * @param {Nodes} node
 *   Node to check.
 * @returns {boolean}
 *   Whether `node` is a CSS link.
 */
export function isCssLink(node: Nodes): boolean;
import type { Nodes } from 'hast';
//# sourceMappingURL=index.d.ts.map