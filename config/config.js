let key = {};

if (process.env.NODE_ENV === "production") {
  key = {
    secretOrKey: "test",
    mongoURI: "mongodb+srv://root:root123@cluster0.yomhv.mongodb.net/?retryWrites=true&w=majority",
    port: 2053,
  };
} else {
  console.log("Set Development Config");
  key = {
    secretOrKey: "test",
    mongoURI: "mongodb+srv://root:root123@cluster0.yomhv.mongodb.net/?retryWrites=true&w=majority",
    port: 3002,
  };
}

export default key;
