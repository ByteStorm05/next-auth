// app/page.tsx
"use client";
import Header from "./components/header"; // Adjust path if necessary
import FirebaseUI from "./firebase/page";


export default function Page() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h1>Welcome to the Page</h1>
        
      </main>
    </div>
  );
}
