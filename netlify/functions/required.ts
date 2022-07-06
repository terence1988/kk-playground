import { Handler } from "@netlify/functions";
import fetch from 'node-fetch';
import {ManagementClient} from '@kentico/kontent-management'

const handler: Handler = async (event, context) => {
  const projectId = context?.clientContext?.projectId;
  console.log(projectId);
  //const client = new ManagementClient({});  // Create a new instance of the client
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };

// Endpoint
// https://site-name.netlify.app/functions/required

//- Removing your Function's "package.json" and adding the dependencies to the project's top-level "package.json" instead.
//This is the fastest and safest solution.
// Only run on node-fetch@2

//rewrites key set value and property