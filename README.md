# Fanvue's Fullstack challenge

## Notes

Here is a description for each relevant source file.

About the file structure, I tend to not create extra files or nest folders when I don't need to. So I'm hoping the flat file structure is not interpreted as lack of experience, but as pragmatism. (this is not a Nest or Angular project after all)

I recommend reading in this order:

### Backend

#### [schema.ts](./server/schema.ts)

Schema definitions for the API

In a real project, I would use [Drizzle](https://orm.drizzle.team/) for ORM.

I would also consider using Prisma, but Theo said it's too heavy and don't play well running on the edge.

#### [service.ts](./server/service.ts)

Fetch functions for the API.

Note the support for pagination, which enables infinite scroll on `feed` and `vault` pages.

I was asked to leave comments on how to make the back end better, but to be honest, given the simplicity of the model, I'm not very critical of the functionalities. Here are some comments about it anyway:

- I noticed that jsonplaceholder supports pagination via query params and that return relevant headers, so that is good.

- I **would not** choose graphql for such a data model, as it is really the perfect use-case for REST-style API, and to transfer to GraphQL would require a lot of boilerplate on the resolvers, specifically the cumbersome data loaders to avoid [N+1 query problem](https://www.freecodecamp.org/news/n-plus-one-query-problem/).

- It could be improved by returning only the fields used on frontend, but with such a small model I would say that's nitpicking.

- Maybe it's worth mentioning that the API don't support user auth, which in a real Next project I would use NextAuth, and handle the tRPC context accordingly.

- The only functionality that is really missing is some live-updates, which would require websockets or polling if we stay with simple REST. Otherwise, if real-time is a big requirement I would consider using [supabase](https://supabase.com/) for the project.


#### [router.ts](./server/router.ts)

The api router for the project. I'm using tRPC as I mentioned.

Not much to mention here, just mounting the service on enpoints

All the other files on server folder are just tRPC boilerplate.

#### [utils/trpc.ts](./utils/trpc.ts)

The trpc client to be used by the frontend

NOTE: I initially tried using the official TRPCNext client, which in turn uses `@tanstack/react-query`, but I was running in an error with the infinite scrolling feature that I implemented in feed and vault pages, after wasting some time debugging I decided to fallback to the normal tRPC client because of the time limitations.

### Frontend

#### [feed.tsx](./pages/feed.tsx)

As mentioned before, the enpoints for posts and photos are paginated, so I load the first page on server side, and load subsequent pages on scroll.

This can be desired from SEO perspective, as a part of the content is immediately available.

I provided just a hint of **Head tags** that could be included, in a real project, I would include the necessary ones for Social cards (`og:*` and `twitter:*` meta tags).

**About a11y**, MUI Button component has tab navigation support out of the box, it could be argued that the Post Box should have a tabIndex too, and maybe the handler for opening comments, but I was satified with the default behavior.

Of course not all considerations were taken, as there is a big checklist to be followed at https://www.w3.org/WAI/ARIA/apg/patterns/feed/, and the time was short for it.

#### [vault.tsx](./pages/vault.tsx)

Just like the feed page, the first page is loaded on server, and the rest on client scroll.

The Head tags was also the same as feed.tsx

**About a11y**, each image thumbnail is navigable by tab, and the image can be opened by pressing Enter of Space. 

#### [Photo.tsx](./components/Photo.tsx), [PhotoGrid.tsx](./components/PhotoGrid.tsx), [Post.tsx](./components/Post.tsx) 

The components used by the page.

I tend to like having simple components in the `components` folder, and for the proper full page that uses them, I just use the `pages` folder of NextJS. Some people may prefer to have the complete page somewhere else, but given that the page files are easily accesible for tests and alike, I don't see the need. Whatever is the preference of the team, I'm open to adopt.

Some basic testing could be added but since these components mostly use library components, I would prioritize testing the pages and having storybook for these components.

There is some housekeeping that should be done with the imports, specifically, these files import the schema, which should not be accessed by the components, I used to save time. Using the inferred return from tRPC would be an option that I would consider in a real project, so that the schema wouldn't be repeated but still would always be type-synced with the models.

### Workflow, Devops and misc

- Logging should be used for errors and send to Sentry or similar

- I would use [bun](https://bun.sh/) for the project, as it is already on 1.0 and I see it used all the time even by the [Vercel team](https://www.youtube.com/@VercelHQ) on NextJS videos

- In the absence of bun, I added `tsx` to quickly check some functions, like when I was creating the service file and wanted to sanity-check the API. In my experience this is as fundamental as unit testing.

- I had prettier setup on my editor (~~VIM btw~~), so I didn't feel the need to setup a formatter, in a real project, I would, sharing the configuration and the recommended extension on `.vscode` folder

- the default linter was good enough for this project, and I tend to add rules on demand instead of on first setup

- database could be setup by a local docker and docker-compose file

- I tend to use `.github/workflows` setup to put automatic testing on branches, and deploy on merge main

## Instructions

Setup the project:

Make sure you install all the dependencies (currently yarn, but you can opt-out) and start the solution in dev mode.

There is a simple homepage with links to the tasks below.

First Task:

- in the "feed" page, show a centered column of posts (use https://jsonplaceholder.typicode.com/ to get the data) which are simple boxes with the title and body properties returned
- for each post, fetch its relative comments and show the counter, or nothing if there are no comments
- when clicking on the comment counter, the comments appear below it

Second Task:

- create a "vault" page, showing a responsive grid of square pictures (use https://jsonplaceholder.typicode.com/ to get the data) which are simple thumbnails
- when clicking on a thumbnail, the fullscreen image opens

Touch base on the following:

- SSR considerations, if you have time, implement a simple server-side rendering
- Type the responses from the API calls
- create meaningful tags in the head of each page, or any other SEO consideration
- add the favicon stealing it from fanvue.com ;)
- a11y considerations

Note:

- Styling is not required, you should use MUI5 components out-of-the box, check docs here https://mui.com/material-ui/
- You can install your favourite fetch library, but you can also use the built-in fetch API
