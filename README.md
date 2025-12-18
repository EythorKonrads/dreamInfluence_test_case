# nuxt-technical-case

# What's the meaning of the case?
You are able to try out building something with our tech setup, and we can afterwards have a constructive talk about how you approached a technical implementation/problem.


# What is the case?
We need some way of showing all of our campaigns horizontally. But there may be too many for the users screen, meaning we need to introduce some smart way of showing them.


Even though there is tons of libraries solving this, try solving it without adding anything new to package.json ;)

*Tip: nuxt.js auto imports using filename of the file in the `components`*

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run start

```
Running on node v22

For detailed explanation on how things work in nuxt, check out the [documentation](https://nuxtjs.org).

## Fetching data
We have implemented a simple GET REST service that resolves dummy campaign information, this endpoint is available at https://technical-case.dreaminfluencers.com/ .

## Design
We have a Figma design available that shows how the design could look.
Try and make the design of the campaign component and slider look as close as possible to the figma.

https://www.figma.com/file/AaLshtmpoOV9ynUwXNUVsn/Code-Task-(Swimlane)?node-id=1%3A3058 (If you have issues inspecting design information, try logging into figma)

[![figma](https://r2.dreaminfluencers.com/campaigns.png "figma")](https://r2.dreaminfluencers.com/campaigns.png "figma")


## Input
1. Not all users know how to scroll horizontally using mouse/mouse-pad
2. Make the scroll-buttons disable/enabled accordingly
3. Solving with scroll bar would be a too big of difference design
4. Drag would be super cool for mobil ;)