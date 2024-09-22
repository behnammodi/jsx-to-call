# jsx-to-call

### converting JSX syntax to a function call.

Sometimes we want to have isolated parts of our code to be used as a React Component but in a non React environment.

### How?

jsx-to-call is a library that converts JSX syntax to a function call. It's like React.createElement but for different environment.

### Installation

```bash
npm install jsx-to-call
```

### Configuration

Add the following to your tsconfig.json file.

````json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "JSX.createCall",
    "jsxFragmentFactory": "JSX.Fragment"
  }
}

### Usage

```tsx
import JSX from "jsx-to-call";

function ComponentA() {
  console.log("ComponentA");
}

function App() {
  return <ComponentA />;
}
````

### why?

When we have a non React environment and we want to have reusable parts of our code. We can use jsx-to-call to create components and reuse them in different places.

### Why not a simple function?

A simple function can be used but it's not as readable as JSX syntax. JSX syntax is more readable and easier to understand.

### Why not React?

React is a great library for building UIs but not for non UI parts of the code. jsx-to-call is for non UI parts of the code.

### Example

ex:
This is a K6 test script to test a website. a non React environment.

```ts
import http from "k6/http";
import {check} from "k6";

export default function (){
    const homePageRes = http.get("https://exmaple.com/");
    check(homePageRes, {
        "status is 200": (r) => r.status === 200 && r.body.includes("Welcome to Example")
    });

    if(homePageRes.status !== 200){
        return;
    }

    const headerRes = http.get("https://exmaple.com/api/v1/header");

    function validateHeaderMenu(menu){
        return menu.includes("Home") && menu.includes("About") && menu.includes("Contact");

    check(headerRes, {
        "status is 200": (r) => r.status === 200 && validateHeaderMenu(r.json().menu)
    });

    const heroBannerRes = http.get("https://exmaple.com/api/v1/hero-banner");

    function validateHeroBanner(banners){
        // should have a title, description, and a image.
        return banners.length > 0 && banners[0].title && banners[0].description && banners[0].image;
    }

    check(heroBannerRes, {
        "status is 200": (r) => r.status === 200 && validateHeroBanner(r.json().banners)
    });

    const articlesRes = http.get("https://exmaple.com/api/v1/articles");

    function validateArticles(articles){
        return articles.length === 5 && articles.every(article => article.title && article.description && article.image);
    }

    check(articlesRes, {
        "status is 200": (r) => r.status === 200 && validateArticles(r.json().articles)
    });

    const footerRes = http.get("https://exmaple.com/api/v1/footer");

    function validateFooterMenu(menu){
        return menu.includes("English") && menu.includes("Spanish") && menu.includes("French") && menu.includes("Facebook") && menu.includes("Twitter") && menu.includes("Instagram");
    }

    check(footerRes, {
        "status is 200": (r) => r.status === 200 && validateFooterMenu(r.json().menu)
    });
}
```

So imagine we have the above code in something like a React environment. We can create components for each part of the page and reuse them in different places.

```tsx
import JSX from "jsx-to-call";
import HomePage from "./page/HomePage";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import Articles from "./components/Articles";
import Footer from "./components/Footer";

export default function () {
  return (
    <HomePage>
      <Header />
      <HeroBanner />
      <Articles />
      <Footer />
    </HomePage>
  );
}
```

And let check the Header component.

```ts
import http from "k6/http";
import {check} from "k6";

export default function Header() {
    const headerRes = http.get("https://exmaple.com/api/v1/header");

    function validateHeaderMenu(menu){
        return menu.includes("Home") && menu.includes("About") && menu.includes("Contact");

    check(headerRes, {
        "status is 200": (r) => r.status === 200 && validateHeaderMenu(r.json().menu)
    });
}
```

So we have a Header component that we can reuse in different places. like a React component.

### Props

We can pass props to the components like in React.

ex:

```tsx
import http from "k6/http";
import { check } from "k6";

function Articles({ maxArticles }: { maxArticles: number }) {
  const articlesRes = http.get(
    "https://exmaple.com/api/v1/articles?maxArticles=" + maxArticles
  );

  function validateArticles(articles) {
    return (
      articles.length === maxArticles &&
      articles.every(
        (article) => article.title && article.description && article.image
      )
    );
  }

  check(articlesRes, {
    "status is 200": (r) =>
      r.status === 200 && validateArticles(r.json().articles),
  });
}
```

and then use it like this

```tsx
<Articles maxArticles={5} />
```

Like a React component.
