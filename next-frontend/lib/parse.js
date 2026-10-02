import Parse from "parse/dist/parse.min.js";

const appId = process.env.NEXT_PUBLIC_PARSE_APP_ID;
const jsKey = process.env.NEXT_PUBLIC_PARSE_JS_KEY;

Parse.initialize(appId, jsKey);
Parse.serverURL = "https://parseapi.back4app.com";

export default Parse;