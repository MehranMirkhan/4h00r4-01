import { AxiosResponse } from "axios";

import api from "src/api";
import config from "src/app.config.json";
import Storage from "src/tools/Storage";
import { isSuccess } from "src/tools/axiosInstance";
import { fetchMe } from "src/reducers/auth.reducer";

export function isHintBought(hint: Hint, boughtHints: LevelHint[]) {
  for (let h of boughtHints) if (h.hintId === hint.id) return true;
  return false;
}

export function getVisibleImages(q: Partial<Question>, hints: LevelHint[]) {
  const images = [];
  if (!!q.images) images.push(...q.images);
  if (!!q.hints)
    images.push(
      ...q.hints
        .filter(h => h.type === "image" && isHintBought(h, hints))
        .map(h => h.value)
    );
  return images;
}

export function isLetterRemovedByHint(
  q: Partial<Question>,
  hints: LevelHint[],
  index: number
) {
  if (!!q.hints) {
    const letterHints: Hint[] = q.hints.filter(
      h => h.type === "letter" && isHintBought(h, hints)
    );
    for (let lh of letterHints) {
      const lhValue: String[] = JSON.parse(lh.value);
      if (lhValue.map(x => Number(x)).indexOf(index) > -1) return true;
    }
  }
  return false;
}

export function getPurchasableHints(q: Partial<Question>, hints: LevelHint[]) {
  return (q.hints || []).filter(h => !isHintBought(h, hints));
}

export async function syncWithServer(level: LevelState, dispatch: any) {
  Storage.get("sync").then((v: string | null) => {
    if (config.log) console.log("Checking if sync is needed");
    if (v !== "1") return;
    if (config.log) console.log("Syncing with server");
    api.users
      .update({ level: level.currentLevel })
      .then((resp: AxiosResponse) => {
        if (isSuccess(resp)) {
          Storage.set("sync", "0");
          dispatch(fetchMe());
          if (config.log) console.log("Sync success");
        }
      });
  });
}
