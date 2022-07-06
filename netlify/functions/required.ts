import { Handler } from "@netlify/functions";
const fetch = require('node-fetch');

const handler: Handler = async (event, context) => {
 const data = await fetch(`https://google.com`);
 const text = await data.json();
 console.log(JSON.stringify(text,null,4));
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };

// Endpoint
// https://site-name.netlify.app/functions/required
