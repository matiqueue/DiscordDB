import { type SayHelloProps } from "./types"

export function sayHello({ fisrtName, lastName, age }: SayHelloProps) {
  console.log(
    `Hello, ${fisrtName} ${lastName || ""}!${
      age ? ` You are ${age} years old.` : ""
    }`
  )
}
