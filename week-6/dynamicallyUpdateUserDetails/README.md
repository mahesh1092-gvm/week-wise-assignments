# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Handling Events

- calling non-parameterized event handler
- calling parameterized event handler

# component

-smallest part of the webpage.
-should contain state and return react element
-> using jsx

# rendering

preparing the component.

# displaying

presenting the component.

# StrictMode

->while developing, it checks the purity of the component.so we get two times in console.

# state

-state changes overtime/eventually.

->for parameterized function calling in onClick should be in calling functions as argument

# useEffect hook

useEffect(()=>{
//use effect ex and dependency array
})
initial render -> display -> API call -> re-render -> display

# API calls

->minimum 3 :
-data
-loading
-err

# Form Validation And Submissions

-React
-reack-hook-form or formik
=>npm install-react-form-hook if not installed-> npm install --force react-hook-form
=>import {useForm} from 'react-form-hook'
register,handleSubmit,fromState:{error}

# trim()->remove wide spaces on either sides.

# for printing in tables

       <tbody>
            {users.map((userObj, index) => (
              <tr key={index}>
                <td className="p-2">{userObj.firstName}</td>
                <td className="p-2">{userObj.email}</td>
                <td className="p-2">{userObj.dateOfBirth}</td>
              </tr>))}
