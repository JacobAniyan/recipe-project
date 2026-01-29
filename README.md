# Recipe Generator

## Repository Structure

- **Frontend**: [github.com/JacobAniyan/recipe-project](https://github.com/JacobAniyan/recipe-project)
- **Backend**: [github.com/Sameer-Gurung0602/RecipeGenerator](https://github.com/Sameer-Gurung0602/RecipeGenerator)

---

## Overview

Recipe Generator is a full-stack web application that takes in your available ingredients to find delicious recipes to make. Simply input what you have, and receive tailored recipe recommendations from our curated database. In addition to this, our AI-powered generate feature can create custom recipes specific to your ingredients and their quantities.

### Key Features

- **Smart Recipe Matching**: Discover recipes based on your available ingredients
- **Browse All Recipes**: Explore the complete recipe database
- **Favourites Management**: Save and access your favourite recipes
- **Dietary Filters**: Filter by 6 dietary restrictions including Vegan, Vegetarian, Gluten-Free, Dairy-Free, Keto, and Paleo
- **Advanced Sorting**: Sort by: Best match, Cook time, Difficulty, or Date added
- **AI Recipe Generation**: Generate custom recipes for your specific ingredients and quantities (Stretch Goal)
- **Accessibility First**: Fully compatible with screen readers
- **Desktop Optimised**: Designed for comfortable desktop use

---

## Project Goals

### Minimum Viable Product (MVP)

- ✅ Add/remove ingredients from available list
- ✅ Search recipes by ingredients with dietary filters and sorting
- ✅ Detailed recipe view with full instructions and metadata
- ✅ Save and retrieve favourite recipes
- ✅ Browse all recipes in the database
- ✅ Desktop-responsive user interface
- ✅ Recipe data persisted in SQL Server database

### Stretch Goals

- AI-powered interface for customised recipe generation
- Ingredient quantity considerations for more precise recipe suggestions

---

## User Stories

As a user, I want to...

- View and interact with the application on my desktop
- Click on individual recipes to see full details
- Add and remove ingredients from my available ingredients list
- Retrieve matching recipes based on my available ingredients
- Filter and sort recipes by various criteria
- Add and remove recipes from my favourites
- View all my favourited recipes in one place
- Navigate and read recipes comfortably using a screen reader
- Generate customised recipes using AI

---

## Tech Stack

### Front-End

- **React** with Vite for optimised build
- **React Router** for client-side routing
- **Axios** for API communication
- **ESLint** for code quality
- **CSS** for styling and responsive design

### Back-End

- **ASP.NET Core MVC** for RESTful API architecture
- **Entity Framework Core** for database ORM
- **SQL Server** for data persistence
- **Recipe dataset** for demonstration purposes

---

## Known Risks & Mitigation

### Front-End:

| Risk                                 | Mitigation Strategy                                          |
| ------------------------------------ | ------------------------------------------------------------ |
| Team's foundational CSS knowledge    | Focus on simple, clean styling; use CSS frameworks if needed |
| Basic React functionality experience | Prioritise core features; incremental learning approach      |

### Back-End:

| Risk                   | Mitigation Strategy                                                       |
| ---------------------- | ------------------------------------------------------------------------- |
| Limited C# experience  | Leverage documentation and tutorials; pair programming                    |
| AI feature scope creep | Keep AI as separate endpoint and UI route; treat as stretch goal, not MVP |

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- .NET 6.0 SDK or higher
- SQL Server (LocalDB or Express)

### Front-End Setup

```bash
# Clone the repository
git clone https://github.com/JacobAniyan/recipe-project.git
cd recipe-project

# Install dependencies
npm install

# Start development server
npm run dev
# The app will be available at http://localhost:5173
```

### Back-End Setup

```bash
# Clone the repository
git clone https://github.com/Sameer-Gurung0602/RecipeGenerator.git
cd RecipeGenerator

# Restore dependencies
dotnet restore

# Update database
dotnet ef database update

# Run the application
dotnet run
```

---
