# Recipe Generator

## Overview

Recipe Generator is a full-stack web application that takes in your available ingredients to find delicious recipes to make. Simply input what you have, and receive recipe recommendations from our curated database.

## Repository Structure

- **Frontend**: [github.com/JacobAniyan/recipe-project](https://github.com/JacobAniyan/recipe-project)
- **Backend**: [github.com/Sameer-Gurung0602/RecipeGenerator](https://github.com/Sameer-Gurung0602/RecipeGenerator)

---

## Key Features

- **Smart Recipe Matching**: Discover recipes based on your available ingredients
- **Browse All Recipes**: Explore the complete recipe database
- **Favourites Management**: Save and access your favourite recipes
- **Dietary Filters**: Filter by 6 dietary restrictions including Vegan, Vegetarian, Gluten-Free, Dairy-Free, Keto, and Paleo
- **Advanced Sorting**: Sort by: Best match, Cook time, Difficulty, or Date added
- **AI Recipe Generation**: Generate custom recipes for your specific ingredients and quantities (Stretch Goal)
- **Accessibility First**: Fully compatible with screen readers
- **Desktop Optimised**: Designed for comfortable desktop use

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

- Ingredient quantity considerations for more precise recipe suggestions
- User sign-in functionality (currently no authentication, and hardcoded user ID to 1 to demo favourites functionality)
- AI-powered interface for customised recipe generation

---

## Tech Stack

### Front-End

- **React** with Vite for optimised build
- **React Router** for client-side routing
- **Axios** for API communication
- **ESLint** for code quality
- **CSS** for styling and responsive design

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

# Build for production
npm run build
```
