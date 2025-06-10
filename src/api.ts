import queryString from "query-string";
import { Message } from "./message";
export class Responses<T> {
  constructor(
    public statusCode?: 200 | 201 | 500 | 404,
    public message?: string,
    public data?: T,
    public count?: number,
  ) {}
}

export const keyUser = "m8nvn*&hKwcgb^D-D#Hz^5CXfKySpY";
export const KEY_TOKEN = "b7a2bdf4-ac40-4012-9635-ff4b7e55eae0";
export const LINK_API = "http://dev1.geneat.vn:7100/api/v1";
export const API = {
  init: () =>
    ({
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: localStorage.getItem(KEY_TOKEN)
          ? "Bearer " + localStorage.getItem(KEY_TOKEN)
          : "",
        "Accept-Language": localStorage.getItem("i18nextLng") ?? "",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }) as RequestInit,
  responsible: async <T>({
    url,
    params = {},
    config,
    headers = {},
    throwError = false,
    showMessage = false,
  }: {
    url: string;
    params?: any;
    config: RequestInit;
    headers?: RequestInit["headers"];
    throwError?: boolean;
    showMessage?: boolean;
  }) => {
    config.headers = { ...config.headers, ...headers };
    const linkParam = queryString.stringify(params, { arrayFormat: "index" });
    const response = await fetch(
      (url.includes("https://") || url.includes("http://") ? "" : LINK_API) +
        url +
        (linkParam && "?" + linkParam),
      config,
    );
    const res: Responses<T> = await response.json();
    if (response.ok) {
      if (showMessage && res.message) Message.success({ text: res.message });
      return res;
    }

    if (response.status === 401) {
      localStorage.removeItem(keyUser);
      location.reload();
    } else if (res.message) {
      if (!throwError) Message.error({ text: res.message });
      else throw new Error(res.message);
    }
    return res;
  },
  get: <T>({
    url,
    params = {},
    headers,
    throwError = false,
    showMessage = false,
  }: {
    url: string;
    params?: any;
    headers?: RequestInit["headers"];
    throwError?: boolean;
    showMessage?: boolean;
  }) =>
    API.responsible<T>({
      url,
      params,
      config: { ...API.init(), method: "GET" },
      headers,
      throwError,
      showMessage,
    }),
  post: <T>({
    url,
    values = {},
    params = {},
    headers,
    throwError = false,
    showMessage = true,
  }: {
    url: string;
    values: any;
    params?: any;
    headers?: RequestInit["headers"];
    throwError?: boolean;
    showMessage?: boolean;
  }) =>
    API.responsible<T>({
      url,
      params,
      config: { ...API.init(), method: "POST", body: JSON.stringify(values) },
      headers,
      throwError,
      showMessage,
    }),
  put: <T>({
    url,
    values = {},
    params = {},
    headers,
    throwError = false,
    showMessage = true,
  }: {
    url: string;
    values: any;
    params?: any;
    headers?: RequestInit["headers"];
    throwError?: boolean;
    showMessage?: boolean;
  }) =>
    API.responsible<T>({
      url,
      params,
      config: { ...API.init(), method: "PUT", body: JSON.stringify(values) },
      headers,
      throwError,
      showMessage,
    }),
  delete: <T>({
    url,
    params = {},
    headers,
    throwError = false,
    showMessage = true,
  }: {
    url: string;
    params?: any;
    headers?: RequestInit["headers"];
    throwError?: boolean;
    showMessage?: boolean;
  }) =>
    API.responsible<T>({
      url,
      params,
      config: { ...API.init(), method: "DELETE" },
      headers,
      throwError,
      showMessage,
    }),
};
