# BakerWare Challenge -- Frontend

## Overview

This project is a Vue 3 Single Page Application that consumes the
Symfony API.\
It provides a clean interface for creating, editing, deleting,
filtering, and managing messages.

---

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Vuetify
- Axios

---

## Features

- Create message
- Update message
- Delete message (with confirmation dialog)
- Filter messages by type
- Snackbar feedback
- Basic client-side validation
- API integration
- Loading states

---

## Installation

npm install

---

## Running the Application

npm run dev

Default URL: http://localhost:5173

---

## API Configuration

The frontend expects the backend to run at: http://localhost:8000

If using HTTPS, update the API base URL accordingly.

---

## Project Structure

- components -- UI components
- pages -- Route-level views
- services -- API communication
- types -- TypeScript interfaces

---

## Integration Notes

The frontend consumes:

- Full message objects from GET `/api/messages`
- DTO-validated responses from backend
- Optional backend filtering support via query parameters

Filtering is currently performed client-side but can easily be switched
to API-level filtering.

---

## Design Considerations

- Clean separation between API layer and UI
- Reusable service layer using Axios
- Strong typing with TypeScript
- Reactive state management
- Minimal but structured UI
