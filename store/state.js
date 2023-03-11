export default () => ({
  isUser: false,
  UserName: process.server ? "" : !!localStorage.getItem("userLogin"),
});
