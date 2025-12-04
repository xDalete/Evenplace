//TODO: Type this config object
const AuthConfig = {
  meEndpoint: "/auth/me",
  loginEndpoint: "/auth/login",
  registerEndpoint: "/jwt/register",
  storageTokenKeyName: "accessToken",
  userDataKeyName: "userData",
  onTokenExpiration: "refreshToken" // logout | refreshToken
};

export default AuthConfig;
