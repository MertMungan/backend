const getCustomHeaders = (header, customChar = "x") => {
  const userId = header["x-userid"];
  const userName = header["X-UserName".toLowerCase()];
  const userRealm = header["X-UserRealm".toLowerCase()];
  const userAccess = header["X-UserAccessToken".toLowerCase()];

  const filtered2 = Object.fromEntries(
    Object.entries(header).filter(([key]) => key.charAt(0) === customChar)
  );
  console.log(filtered2);
  return filtered2;
};

module.exports.getCustomHeaders = getCustomHeaders;
