import parse from "css/lib/parse";

function formatSelectorName(selector) {
  return selector.replace(/#|\./g, "");
}

function formatProperty(dec) {
  return dec.replace(/-(\w)/g, (a, b) => {
    return b.toUpperCase();
  });
}

function buildDeclarations(declarations) {
  const formattedDeclarations = {};
  declarations.forEach(dec => {
    if (dec.type !== "declaration") return;
    const property = formatProperty(dec.property);
    return (formattedDeclarations[property] = dec.value.replace(/"|'/g, ""));
  });
  return formattedDeclarations;
}


export default function convertCSS(
  cssInput,
  options,
) {
  const ast = parse(cssInput);
  const cssInJs = {};
  const pseudoSelectors = {};

  ast.stylesheet.rules.forEach(rule => {
    if (rule.type === "media") {
      const mediaQuery = `@media ${rule.media}`;
      rule.rules.forEach(innerRule => {
        const selectors = innerRule.selectors;
        const declarations = buildDeclarations(innerRule.declarations);
        selectors.forEach(selector => {
          cssInJs[formatSelectorName(selector)] = Object.assign(
            cssInJs[selector] || {},
            {
              [mediaQuery]: declarations
            }
          );
        });
      });
    }

    if (rule.type === "keyframes" && options.convertAnimations) {
      rule.keyframes.forEach(keyframe => {
        const declarations = buildDeclarations(keyframe.declarations);
        keyframe.values.forEach(value => {
          cssInJs[value] = Object.assign(cssInJs[value] || {}, declarations);
        });
      });
    }

    if (rule.type !== "rule") return;

    const declarations = buildDeclarations(rule.declarations);
    rule.selectors.forEach(selector => {
      if (selector.indexOf(":") !== -1) {
        return (pseudoSelectors[formatSelectorName(selector)] = declarations);
      }
      return (cssInJs[formatSelectorName(selector)] = declarations);
    });
  });

  Object.keys(pseudoSelectors).forEach(key => {
    const split = key.split(/(:+)/);

    cssInJs[split[0]] = Object.assign(cssInJs[split[0]] || {}, {
      [`${split[1]}${split[2]}`]: pseudoSelectors[key]
    });
  });

  return cssInJs;


}