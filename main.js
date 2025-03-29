import kaplay from "./kaplay.mjs";

kaplay()


const obj = add([
    // this is a component that draws a rectangle
    rect(32, 32),
]);


onUpdate(() => {
    console.log("update")
})


onKeyPress("e", () => {
    console.log("e pressed")
});