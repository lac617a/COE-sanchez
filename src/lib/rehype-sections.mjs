/**
 * Agrupa cada h2 del MDX con lo que le sigue en un <section>: así cada tema de la guía
 * se ve como una sección numerada (estilos en src/styles/global.css → .content > section).
 * Los nodos ESM del MDX (import/export) se quedan en la raíz.
 *
 * @returns {(tree: any) => void}
 */
export function rehypeSections() {
  return (tree) => {
    const children = [];
    let current = null;
    for (const node of tree.children ?? []) {
      if (node.type === "mdxjsEsm") {
        children.push(node);
      } else if (node.type === "element" && node.tagName === "h2") {
        current = { type: "element", tagName: "section", properties: {}, children: [node] };
        children.push(current);
      } else if (current) {
        current.children.push(node);
      } else {
        children.push(node);
      }
    }
    tree.children = children;
  };
}
