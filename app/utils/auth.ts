import Cookies from "js-cookie";

export const setAuthTokens = (token0: string, token1: string) => {

  Cookies.set("sb-ginjmrvsyfbvxccpdqhq-auth-token.0", token0, {
    path: "/",
    secure: true,
    sameSite: "strict",
  });

  Cookies.set("sb-ginjmrvsyfbvxccpdqhq-auth-token.1", token1, {
    path: "/",
    secure: true,
    sameSite: "strict",
  });
};

export const getAuthTokens = () => {
  return {
    token0: Cookies.get("sb-ginjmrvsyfbvxccpdqhq-auth-token.0"),
    token1: Cookies.get("sb-ginjmrvsyfbvxccpdqhq-auth-token.1"),
  };
};

export const removeAuthTokens = () => {
  Cookies.remove("sb-ginjmrvsyfbvxccpdqhq-auth-token.0");
  Cookies.remove("sb-ginjmrvsyfbvxccpdqhq-auth-token.1");
};
