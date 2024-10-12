export default [
  {
    type: "function",
    function: {
      name: "create_new_file",
      description:
        "Create a new file in app directory. Remember the rule of nextjs to create new page, when we need to create new page in nextjs, we need to create new folder with given filename and then create a new file with page.js inside it. The content of the new file goes inside this [filename]/page.js file.",
      parameters: {
        type: "object",
        properties: {
          filename: {
            type: "string",
            description: "The name of the file to be created",
          },
          content: {
            type: "string",
            description: "The content of the file to be created",
          },
        },
        required: ["filename", "content"],
      },
    },
  },
];
