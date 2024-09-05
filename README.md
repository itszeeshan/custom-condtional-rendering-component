# Custom Condtional Rendering Component
This is a custom conditional rendering component that you can use in your Nextjs or Reactjs project.
To understand read this blog at [@zeesek](https://medium.com/@zeesek/custom-conditional-rendering-component-in-reactjs-nextjs-cd8e92a7110a)

# Info

In react to do conditional rendering you would do use statements like `{condition && code}` or `{condition ? this : that}`, where you may have to use fragments 
```react.js
  <>
   <ChildA />
    <ChildB />
    <ChildC />
  </>
```
or
```react.js
  <React.fragment>
    <ChildA />
    <ChildB />
    <ChildC />
  </React.fragment>
```
sometimes to get rid of errors. Like below:
```tsx
import React from 'react';

const Problem = () => {
  return (
    <>
      {true && <h1>It is True</h1>}
      {false ? <h1>It is True</h1> : <h1>It is False</h1>}
      {true && (
      <>
        <h1>
          Fragments are important here
        </h1>
        <p>
          Why? Because its not your call to make :D
        </p>
      </>
      )}
    </>
  )
}
```

A better approach would be to create a conditional component, which can help you structure your code more cleanly and efficiently.

## Conditional Component
```tsx
import React, { Children, ReactNode } from 'react';

interface ShowProps {
    children: ReactNode;
}

interface IfProps {
    isTrue: boolean;
    children: ReactNode;
}

interface ElseProps {
    render: boolean;
    children: ReactNode;
}


const Show = (props: ShowProps) => {
    let when: ReactNode = null;
    let otherwise = null;

    Children.forEach(props.children, (child) => {
        if (React.isValidElement(child)) {
            if (!child.props.isTrue) {
                otherwise = child;
            } else if (!when && child.props.isTrue) {
                when = child;
            }
        }
    });
    return when || otherwise;
}
Show.If = ({ isTrue, children }: IfProps) => {
    return isTrue && children;
}
Show.Else = ({ render, children }: ElseProps) => {
    return render && children;
}
export default Show;
```
Here’s a breakdown of what’s happening:

- The Show component iterates over its children using Children.forEach from React.
- It checks each child to determine whether its isTrue prop is true or false.
- If a child with isTrue prop set to true is found, it assigns that child to when.
- If a child with isTrue prop set to false is found, it assigns that child to otherwise.
- Finally, it returns either the when child if it exists (and is true), or the otherwise child if when is null.

## Use this conditional component:
Now to use this component, you can just import the component in your code, where ever you’d like to add conditional rendering and just add your conditions in isTrue prop:
```tsx
import React from "react";
import Show from "./Show";

const UseShow = () => {
  return (
        <>
        <Show>
            <Show.If isTrue={true}>
                <div>True</div>
            </Show.If>
            <Show.Else>
                <div>False</div>
            </Show.Else>
        </Show>
        </>
    );
}
```
The `Show.Else` is totally optional!
