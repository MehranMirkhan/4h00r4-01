import config from "src/app.config.json";

export function convertQuestion(question: any) {
  let q = { ...question };
  if (!!q.images) {
    q.images = JSON.parse(question.images);
    q.images = q.images.map(
      (img: string) => `${config.base_url}/storage/${img}`
    );
  }
  if (!!q.choices) q.choices = JSON.parse(question.choices);
  if (!!q.letters) q.letters = JSON.parse(question.letters);
  return q;
}

export function getVisibleImages(q: Partial<Question>) {
  const images = [];
  if (!!q.images) images.push(...q.images);
  if (!!q.hints)
    images.push(
      ...q.hints.filter(h => h.type === "image" && !!h.value).map(h => h.value)
    );
  return images;
}

export function isChoiceRemovedByHint(q: Partial<Question>, index: number) {
  if (!!q.hints) {
    const choiceHints: Hint[] = q.hints.filter(
      h => h.type === "choice" && !!h.value
    );
    for (let lh of choiceHints) {
      const lhValue: String[] = JSON.parse(lh.value);
      if (lhValue.map(x => Number(x)).indexOf(index) > -1) return true;
    }
  }
  return false;
}

export function isLetterRemovedByHint(q: Partial<Question>, index: number) {
  if (!!q.hints) {
    const letterHints: Hint[] = q.hints.filter(
      h => h.type === "letter" && !!h.value
    );
    for (let lh of letterHints) {
      const lhValue: String[] = JSON.parse(lh.value);
      if (lhValue.map(x => Number(x)).indexOf(index) > -1) return true;
    }
  }
  return false;
}

export function getPurchasableHints(q: Partial<Question>) {
  return (q.hints || []).filter(h => h.value !== undefined);
}
