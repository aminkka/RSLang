export function createElement(elem: string, className: string) {
  const htmlElem: HTMLButtonElement | HTMLElement = document.createElement(elem);
  htmlElem.classList.add(className);
  return htmlElem;
}

export const levelColors = [
  '#e050d9',
  '#0095ff',
  'rgb(158, 255, 195)',
  '#e6e930',
  '#FFAD00',
  '#e8743a',
  '#ff00aa',
  'rgb(255 26 62)',
];
export const levelsName = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const backgrounds = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6'];
