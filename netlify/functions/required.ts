import { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import { ManagementClient } from "@kentico/kontent-management";

const handler: Handler = async (event, context) => {
  // Create a new instance of the client
  let projectId = "";
  let projectKey = "";
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

  if (!body["projectId"] || !body["itemId"]) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "No project id or item id or key found",
      }),
    };
  }

  projectId = body.projectId;
  projectKey = projectId.split("-").join("_");

  if (!process.env[projectKey]) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "No project id or item id or key found",
      }),
    };
  }

  const client = new ManagementClient({
    projectId: projectId,
    apiKey: process.env[projectKey] as string,
  });
   
  const isRequired = client.viewContentItem().byItemId(body.itemId).toPromise().then(res=> {
    return res.data;
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      processKey: process?.env[projectKey],
      projectKey: projectKey,
    }),
  };
};

export { handler };

// Endpoint
// https://site-name.netlify.app/functions/required

//- Removing your Function's "package.json" and adding the dependencies to the project's top-level "package.json" instead.
//This is the fastest and safest solution.
// Only run on node-fetch@2

//rewrites key set value and property
