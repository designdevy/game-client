export default function gameTypes(type) {
  switch (type) {
    case 2:
      return 'Shapes';
    case 3:
      return 'Emoji';
    case 4:
      return 'Colors';
    default:
      return 'Numbers';
  }
}
