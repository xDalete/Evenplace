//TODO: Type this config object
const AuthConfig = {
  loginEndpoint: "/auth/login",
  meEndpoint: "/auth/me",
  onTokenExpiration: "refreshToken", // logout | refreshToken
  registerEndpoint: "/jwt/register",
  storageTokenKeyName: "accessToken",
  userDataKeyName: "userData"
};

export default AuthConfig;
