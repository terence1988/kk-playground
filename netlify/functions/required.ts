import { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import { ManagementClient } from "@kentico/kontent-management";

const handler: Handler = async (event, context) => {
   // Create a new instance of the client
  let projectId = "";
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = JSON.parse(event.body || "");

  if (!body) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "No body" }),
    };
  }

  if (body.hasProperty("projectId")) {
    projectId = body.projectId;
  }

  const projectKey=projectId.split("-").join("_");
  console.log(process?.env[projectKey]);

  //const client = new ManagementClient({}); 

  return {
    statusCode: 200,
    body: JSON.stringify({ message: body }),
  };
};

export { handler };

// Endpoint
// https://site-name.netlify.app/functions/required

//- Removing your Function's "package.json" and adding the dependencies to the project's top-level "package.json" instead.
//This is the fastest and safest solution.
// Only run on node-fetch@2

//rewrites key set value and property
