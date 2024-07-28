import cookies from "react-cookies";

/**
 * Extracts search parameters from a URL query string and converts them into an object.
 *
 * @param searchUrl - The URL query string.
 * @returns An object containing the search parameters.
 */
export const getParams = (
  searchUrl: string
): Record<string, string | string[]> => {
  const params = new URLSearchParams(searchUrl);

  const queryObject: Record<string, string | string[]> = {};

  params.forEach((value, key) => {
    if (key.endsWith("[]")) {
      const cleanKey = key.slice(0, -2);

      if (!queryObject[cleanKey]) {
        queryObject[cleanKey] = [];
      }

      (queryObject[cleanKey] as string[]).push(value);
    } else {
      queryObject[key] = value;
    }
  });

  return queryObject;
};

export const setAccessToken = (token: string | null) => {
  console.log({ token });
  if (token) {
    cookies.save("accessToken", token, {
      path: "/",
      expires: undefined,
    });
  } else {
    cookies.remove("accessToken");
    const d = new Date();
    d.setTime(d.getTime() + -1 * 24 * 60 * 60 * 1000);
    document.cookie = `role=;expires=${d.toUTCString()};path=/`;
  }
};
