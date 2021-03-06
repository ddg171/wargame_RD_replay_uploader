import axios from "axios";
import { formatISO, isDate } from "date-fns";


const api = axios.create({
  baseURL:"/api/v1",
});

export default api;

export async function detail(id: string): Promise<any> {
  if (!id) {
    throw Error("invalid ID");
  }

  const query = new URLSearchParams();
  query.append("id", id.toString());

  return await api
    .post("/replay/detail", query)
    .then((res) => {
      const data = res.data;

      return data;
    })
    .catch((e) => {
      throw e;
    });
}

export async function list(
  limit = 10,
  start: Date | undefined = undefined
): Promise<any[]> {
  const query: FormData = new URLSearchParams();
  if (typeof limit !== "number" || limit <= 0) {
    throw Error("invalid limit");
  }
  query.append("limit", limit.toString());
  if (start && !isDate(start)) {
    throw Error("invalid date");
  }
  if (start && isDate(start)) {
    query.append("start", formatISO(start));
  }

  return await api
    .post("/replay/list", query)
    .then((res) => {
      const data = res.data;
      if (!data?.replay) {
        return [];
      }
      return data.replay;
    })
    .catch((e) => {
      throw e;
    });
}

export async function deleteReplay(id: string, pin: string): Promise<any> {
  const query = new URLSearchParams();
  query.append("id", id.toString());
  query.append("pin", pin);

  return await api
    .post("/replay/del", query)
    .then((res) => {
      const data = res.data;

      return data;
    })
    .catch((e) => {
      throw e;
    });
}

export async function getURL(id: string): Promise<any> {
  const query = new URLSearchParams();
  query.append("id", id.toString());
  return await api
    .post("/replay/download", query)
    .then((res) => {
      const data = res.data;
      return data;
    })
    .catch((e) => {
      throw e;
    });
}

export async function downloadAsBlob(url: string): Promise<any> {
  return await axios.get(url, { responseType: "blob" }).then((res) => {
    return res.data;
  });
}
