---
title: Rust likes variable shadowing?
date: 2021-01-23T12:06:32.169Z
---

Day 2, let's go!

This morning I was reading this post on how to [create a text editor in Rust](https://www.philippflenker.com/hecto), and at [some point](https://www.philippflenker.com/hecto-chapter-2) it said that Rust supports variable shadowing, and not only that, it was referred to as "immensely useful".

🤔

That got me curious! I work with TypeScript mostly, for React Native projects, and variable shadowing is a "bad" thing in JS and friends, here's the [eslint rule](https://eslint.org/docs/rules/no-shadow) for it too. Normally it's something to be avoided in JS, since it can have weird unexpected side-effects. See this code below:

```ts
const name = "alice"
if (true) {
	const name = "bette"
	if (true) {
		console.log(name)
	}
}
console.log(name)
```

(You can play with the code above [here](https://www.typescriptlang.org/play?#code/MYewdgzgLgBGCGBbApjAvDARPANgS2GUwCg8AzGACigCcBXZAShgG9iBIUSWBFdLAEbIoUIh3JVaDZm3adwEEDmQA6HCADmlXkw4BfYga6LlazdqTIgA).)

In this code, first of all, notice that typescript complains about the shadowing. Even with that complaint, it will let you run, so hit `Run` on top, and if you open your browser console you will see the following printed:

```
bette
alice
```

Variables are declared in scopes and accessed that way. The nested `console.log` will look for a `name` in the inner `if` scope. There is none, so it will go one up, and find the `name` with the value `"bette"` and print that out. The bottom `console.log` will look in its scope, which is the global, outermost scope. It will find the `name` with value `"alice"`, and print that one out.

Let's check what Rust does:

```rust
let name = "alice";
if true {
	let name = "bette";
	if true {
		println!("{}", name);
	}
}
println!("{}", name);
```
(You can play with this code [here](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=132fd25d73a6b8971836c510e4eaf4b2).)

If we run this, we will see that it does.. exactly the same?! Hm. So why the same exact code a "bad" thing in JS and an "immensely useful" thing in Rust?

After reading a bit more about the usage of shadowing in Rust, it seems that it is mostly used for doing some processing on an immutable variable without having to make it mutable. Let's check!

```rust
let name = "chloe";
let name = name.to_string().to_uppercase();
// name = "dana"; // => this would produce error[E0384]: cannot assign twice to immutable variable `name`.
// let name = "dana"; // => this would work.
println!("{}", name);
```
(Available [here](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=5720a2aa93c46a7feb557c7c3fc7e443).)

We can see here that we declare `name`, assign `"chloe"` to it, and then we shadow it and make the value uppercase. This code will print out `CHLOE`, **and** it will complain if we try to assign anything else to `name`, unless we explicitly shadow it again.

Let's try the same in TS 😬.

```ts
// const name = "chloe"
// const name = name.toUpperCase() // We can't do that!

let name = "chloe"
name = name.toUpperCase()
name = "dana"; // => this will work, so our `name` is not immutable!
console.log(name)
```
(Available [here](https://www.typescriptlang.org/play?#code/PTAEGMHsDsGcBdTQIYFsCmoC8oBE4ALAG0nVwCgQIYEk1McUMA6eSAVQAdP0AnAYWSx0ACgCU5ckXSImDPIRJlyc7HRZsuPAUNETVOXABNkKXAG5QVLAD5Q8AgEtYoAO6OiRN5F4BrADSgsJCgkACuvKAABnJRoM5IkIiOqKhh8MgARtIAhORQcJDSzCQA5iJyEkA).)

We can't do it! The only way we can make this work is by making `name` mutable, but then it stays mutable. Forever mutable. Forever easy to break! Ok, a bit dramatic, but you get what I mean. We lose immutability on `name`.

Under that new light, it does make sense that Rust *wants* and *likes* to have variable shadowing. It takes something that could result to funkiness and uses it for good!

If we wanted to do the same in TS, it would be a bit roundabout, using something like the following, which works, but uses extra variables.

```ts
let namePreparation = "chloe"
namePreparation = namePreparation.toUpperCase()
const name = namePreparation
// name = "dana" // => this would produce a TS error
console.log(name)
```
([Here](https://www.typescriptlang.org/play?#code/DYUwLgBAdghgtiACgJxABxsmYCWB7KCAXggCIBjAC2DxFIChYEV1Nt9CSmlUMtcCAOjB4AqmjQhkAYRgBnEAAoAlPXIE5kbsWjwerfh3oB6Y7oQ7SAExixSEU8QB8EMJRxyIAdzwBXYFYQaMh4Vr7kIBAwEAAqAMoQUiHIahp4oII0AOaK3MpAA).)

I'm sure it could be done in an inline function to avoid the extra variable. Let's try.

```ts
const name = (() => {
    let namePreparation = "chloe"
    return namePreparation.toUpperCase()
})()
```
([Here](https://www.typescriptlang.org/play?ssl=4&ssc=5&pln=1&pc=1#code/MYewdgzgLgBGCGBbApjAvDAFJglOgfDAN4BQM5MANsrAigAoBOyADvI-FAJbjowBEwABaUQyfmQrMoAV0Zg4SZE1btOPMADooIAKosWyRgGF4EZLhIBfHJYD0dxSj78AJvAT8YDgjChCuCBgAdxAZSlcYFkYQVxlgVHgYABUAZRgjGMYSUEgQak1RAHNMOmQcIA).)

That's cool that we can do it, but it is obvious that the simplicity of Rust's code is nice to look at.

```rust
let name = "chloe";
let name = name.to_string().to_uppercase();
```

Wow, this turned out to be a way longer post than I thought. Cool.
