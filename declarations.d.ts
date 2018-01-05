// For <ComponentName>.component.html imports:
declare module '*.html' {
  const content: string;
  export default content;
}

// For <ComponentName>.component.scss imports:
declare module '*.scss' {
  const content: string;
  export default content;
}
