import emojiData from 'emoji-datasource';
import "babel-polyfill";
const CATEGORIES = ['People', 'Nature', 'Foods', 'Activity', 'Places', 'Objects', 'Symbols', 'Flags'];

const charFromCode = utf16 => String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));

const _emoji = emojiData.reduce((acc, item) => {
  const { category } = item;
  if (!acc[category]) acc[category] = [];
  acc[category].push({ sortOrder: item.sort_order, char: charFromCode(item.unified) });
  return acc;
}, {});

const emoji = CATEGORIES.map(category => {
  let items = _emoji[category] || [];
  items = items.sort((a, b) => {
    return (a.sortOrder > b.sortOrder) ? 1 : -1;
  }).map(x => x.char);
  return { category, items };
});

export default emoji;
