
// Fisher–Yates
// http://bost.ocks.org/mike/shuffle/

export default function shuffle(array) {
  let m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
