// import { SanityClient, createClient } from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";

// export const client = createClient({
//   projectId: "vyaeq742",
//   dataset: "production",
//   apiVersion: "2020-02-20",
//   useCdn: true,
//   token:
//     "sk1Lm2lskBVpLfuZImmX7CTjBUOyiYf4yPYg8aTyS3pUXCpyx3JoyEMPhGYV9NJ6WMQ0UZagFy0zMwNt1DraoKgIxnXLDIgR0UH2ypwl9ddPLfNAFhyXKh8CFr8xi961Olb8dMXuAuitMiuiiaT4qSQG0dB9mBb06uhhwSVa1Om3S3c4Ne6e",
// });

// const builder = imageUrlBuilder(client);

// export const urlFor = (source) => builder.image(source);

import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "vyaeq742",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
  token:
    "sk68ZkkPY47XkqiaARorLn8H79hzIjIV5DWFDNHcxl4aaoyru6JTt4ywYGfXrvC8UNtGIokjKPOfuDJRNfCM4CfzH7c7vLSv6xuAc8XLz54gq8T3bHhiQDi8WgmJrfuTqa2L8695W9FksuDOY0ZTBvEA41A6XixHcH8BtqNuPH4ktM0bVpKZ",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
