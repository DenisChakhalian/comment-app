<h1 align="center">API Usage Guide</h1>
This guide provides instructions on how to use the API to interact with posts data.

Server (websocket) -> wss://commentapp.onrender.com

If the connection request fails, follow this link and wait for the page to load [Link](https://commentapp.onrender.com)

This is a problem with render.com because it shuts down the server if it is idle


<h2 align="center">Prerequisites</h2>
Before using the API, ensure that you have the following:

- Node.js 18.15.0 installed (if you don't want to use Docker)
- Docker Desktop installed
- Make sure you have Hyper-V enabled (for Docker)

<h2 align="center">Getting Started with Docker</h2>

- Clone the repository and navigate to the project directory.
- Create .env file based on the .env.test template
``` bash
DB_URL="Your Postgres External Database URL in render.com"
PORT="443 - if you want deploy in render.com, any other if locally"
```
- Open Docker Desktop
- Run the command in your project terminal
``` bash
docker compose up --build
```
- The server is running locally
- If you wanna connect use this link ws://localhost:${your PORT}/

<h2 align="center">Getting Started with Node</h2>


- Clone the repository and navigate to the project directory.
- Create .env file based on the .env.test template
``` bash
DB_URL="Your Postgres External Database URL in render.com"
PORT="443 - if you want deploy in render.com, any other if locally"
```
- Install dependencies by running the following command:
``` bash
npm install
```

- Start the server by running the following command:

``` bash
npm run dev
```

The server will start running on ws://localhost:${your PORT}.

<h2>API Endpoints</h2>
The following endpoints are available in the API:

<h3>Get All Posts</h3>
<p>Description: Get a list of all posts with users in current page.</p>
<p>Request message:</p>

  ``` javascript
  ws.send(JSON.stringify({
    event: "comments",
    action: "get",
    payload: {
      sortBy: "creationDate", // 'creationDate' or 'email' or 'username'
      direction: "DESC", // 'DESC' or 'ASC'
      currentPage: 1, // or any existing one
    }
  }));
  ```
    
<p>Response with pagination:</p>

   ``` javascript
  {
    data: {
      comments: [{
          content: "Content",
          creationDate: "creationDate",
          fileUrl: "fileUrl", // fileUrl or null
          id: "comment_id",
          parentId: "parentId", // parentId or null
          user: {
            email: "email",
            homepage: "homepage", // homepage or null
            id: "user_id",
            username: "username",
          }
          userId: "user_id"
        },
        ...
      ],
      count: number, // current number of all posts in db
      pages: number, // current number of pages
      currentPage: number, // current page
    },
    type: "comments"
  }
  ```

<h3>Get childs of the post</h3>
<p>Description: Get all childs of the post by post id.</p>
<p>Request message:</p>

  ``` javascript
  ws.send(JSON.stringify({
    event: "comments",
    action: "getChilds",
    payload: {
      parentId: "parentId" // post id
    }
  }));
  ```
    
<p>Response:</p>

   ``` javascript
  {
    comments: [{
        content: "Content",
        creationDate: "creationDate",
        fileUrl: "fileUrl", // fileUrl or null
        id: "comment_id",
        parentId: "parentId", // parentId
        user: {
          email: "email",
          homepage: "homepage", // homepage or null
          id: "user_id",
          username: "username",
        },
        userId: "user_id"
      },
      ...
    ],
    type: "getChilds"
  }
  ```
    
<h3>Create a post</h3>
<p>Description: Create a new post.</p>
<p>Request message:</p>

  ``` javascript
  ws.send(JSON.stringify({
    event: "comments",
    action: "post",
    payload: { 
      username: "username", 
      email: "email", 
      content: "content", 
      parentId: "parentId", // parentId or null
      homepage: "homepage", // homepage or null
      fileUrl: "fileUrl" // fileUrl or null
    }
  }));
  ```
    
<p>Response:</p>

   ``` javascript
  {
    comment: {
      content: "Content",
      creationDate: "creationDate",
      fileUrl: "fileUrl", // fileUrl or null
      id: "comment_id",
      parentId: "parentId", // parentId or null
      user: {
        email: "email",
        homepage: "homepage", // homepage or null
        id: "user_id",
        username: "username",
      },
      userId: "user_id"
    },
    type: "add"
  }
  ```

<h2>Example Usage</h2>
Here is an example of how to use the API:

- Create new WebSocket

``` javascript
const ws = new WebSocket("wss://commentapp.onrender.com");
```

<h3>Get all posts for first page:</h3>

``` javascript
ws.send(JSON.stringify({
  event: "comments",
  action: "get",
  payload: {
    sortBy: "creationDate",
    direction: "DESC",
    currentPage: 1,
  }
}));
```

<h3>Get childs of the post:</h3>

``` javascript
ws.send(JSON.stringify({
  event: "comments",
  action: "getChilds",
  payload: {
    parentId: "c143adff-9ed6-414a-afaa-80a9a82c59d6" // parentId
  }
}));
  ```

<h3>Create a new post:</h3>

  ``` javascript
  ws.send(JSON.stringify({
    event: "comments",
    action: "post",
    payload: { 
      username: "username123", 
      email: "email@email.com", 
      content: "New post!", 
      parentId: null, // parentId or null
      homepage: null, // homepage or null
      fileUrl: null // fileUrl or null
    }
  }));
  ```
  - or

   ``` javascript
  ws.send(JSON.stringify({
    event: "comments",
    action: "post",
    payload: { 
      username: "username123", 
      email: "email@email.com", 
      content: "<strong>Hello!</strong>", 
      parentId: "ec65119b-9300-47e7-8e3d-4e8274de7024", // parentId or null
      homepage: "https://www.google.com.ua/", // homepage or null
      fileUrl: "https://randomwordgenerator.com/img/picture-generator/g09c51d6247f88abd6e9145c1fc2af08348ea95ceb3334a3ac87087f6c92fdb3c25a4ea29f42ede7b17dbb77aca344108_640.jpg" // fileUrl or null
    }
  }));
  ```

Feel free to explore and use the API endpoints based on your needs!
