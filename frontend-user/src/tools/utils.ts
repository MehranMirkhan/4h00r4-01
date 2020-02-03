import moment from "moment";

export function getURLParams(search: string) {
  const s: string = search.substr(1);
  const a: string[] = s.split("&");
  let params: { [key: string]: string } = {};
  a.forEach(e => {
    const x: string[] = e.split("=");
    params[x[0]] = x[1];
  });
  return params;
}

export function getRemainedTime(deadline?: string | Date) {
  const start = moment();
  const end = moment.utc(deadline);
  return end.diff(start);
}
