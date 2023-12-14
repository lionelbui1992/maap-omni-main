# Hooks

# useSessionStorage

Hook that manages multiple sessionStorage keys.

```jsx
const sessionKey = 'userapp';
const [session, setSession] = useSessionStorage(sessionKey);

const viewProduct = (yourProductData) => {
    // Define scope key
    setSession('view_product', yourProductData);
};
```

# useMessage

React hook to monitor messages incoming and also allow you to post out. Utilising and simplifing the WebAPI for Window.postMessage() and Window: message event

```jsx
useWindowMessage({
    // `viewProduct` is a scope key to watch
    viewProduct: (event) => {
        // do something else
    },
    // `moreActionToWatch` is a scope key to watch
    moreActionToWatch: (event) => {
        // do something else
    },
});
```
