# Recipe Generator

## Repository Structure

- **Frontend**: [github.com/JacobAniyan/recipe-project](https://github.com/JacobAniyan/recipe-project)
- **Backend**: [github.com/Sameer-Gurung0602/RecipeGenerator](https://github.com/Sameer-Gurung0602/RecipeGenerator)

---

## Overview

Recipe Generator is a full-stack web application that transforms your available ingredients into delicious recipes . Simply input what you have in your kitchen, and receive personalised recipe recommendations from our curated database. You can even use our AI-powered feature to generate custom recipes tailored specific to your ingredients and their quantities.

### Key Features

- **Smart Recipe Matching**: Enter your available ingredients and discover recipes you can make right now
- **Favourites Management**: Save your favourite recipes for quick access later
- **Advanced Filtering**: Sort recipes by preparation time, difficulty level, or date added
- **AI Recipe Generation**: Get custom recipes generated specifically for your ingredients and quantities (Stretch Goal)
- **Accessibility First**: Fully compatible with screen readers for an inclusive experience
- **Desktop Optimised**: Designed for comfortable desktop browsing and cooking

---

## Project Goals

### Minimum Viable Product (MVP)

- ✅ Users can input ingredients and receive matching recipes from the database
- ✅ Recipe data persisted in SQL Server database
- ✅ Save and retrieve favourite recipes
- ✅ Desktop-responsive user interface
- ✅ Detailed recipe view (ingredients, instructions, cooking time, difficulty)
- ✅ Add/remove ingredients from user's available list
- ✅ Filter recipes by date, time, and difficulty

### Stretch Goals

- AI-powered interface for customised recipe generation
- Ingredient quantity considerations for more precise recipe suggestions

---

## User Stories

As a user, I want to...

- View and interact with the application on my desktop
- Click on individual recipes to see full details (instructions, ingredients, cooking time, difficulty)
- Add and remove ingredients from my available ingredients list
- Retrieve matching recipes based on my available ingredients
- Filter recipes by date, preparation time, and difficulty level
- Add and remove recipes from my favourites
- View all my favourited recipes in one place
- Navigate and read recipes comfortably using a screen reader
- Generate customised recipes using AI based on my specific ingredients and quantities

---

## Tech Stack

### Front-End

- **React** with Vite for fast development and optimised build
- **React Router** for client-side routing
- **Axios** for API communication
- **Prettier & ESLint** for code quality
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
