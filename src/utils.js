export const bfs = (items, predicate, getChildren) => {
  const elems = [...items];
  while (elems.length !== 0) {
    const current = elems.shift();
    if (predicate(current)) {
      return current;
    } else {
      elems.push(...getChildren(current));
    }
  }
};
export const groupBy = (items, getGroup) => {
    return items.reduce((r, it)=> {
           const group = getGroup(it)
           r[group] = r[group] || [];
           r[group].push(it);
           return r;
       }, {});
 }

export const toList = (it) => {
    if(it){
        return Array.isArray(it)
        ? it
        : [it];
    } else {
        return []
    }
}