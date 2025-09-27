# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Smart Expense Tracker App

A simple React-based expense tracking application that allows users to **add, edit, delete, filter, and sort expenses**, while also providing category-wise **charts** for better financial visualization.

---

## Features

- **Add Expense** – Title, Amount, Date, Category
- **Edit / Delete Expenses** – Update or remove entries
- **Filter & Sort** – Filter by category/date, sort by amount or date
- **Charts** – Pie & Bar charts for category-wise spending
- **Group by Date** – View daily grouped expenses **with recent entries first**
- **Toast Notifications** for user actions
- **Responsive UI** using Tailwind CSS
  **No Data Handling** – Shows `"No matches found"` when filter returns no results , `"No data available for chart"` when chart has no data
- **Default Sorting** – Sort by date is applied by default **with recent entries first**

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **State Management**: Context API
- **Form Handling**: Formik
- **Charts**: Recharts
- **Icons**: React Icons

---
