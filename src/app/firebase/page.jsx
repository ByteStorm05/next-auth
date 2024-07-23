"use client";

import { useState, useEffect } from 'react';
import { useAuth } from "@clerk/nextjs";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, updateDoc, doc, query, where, getDocs, Timestamp } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNAtlCZCK44VfCD-wVvj1fKnwRibKCa9E",
  authDomain: "hackathon-project-3a9c3.firebaseapp.com",
  projectId: "hackathon-project-3a9c3",
  storageBucket: "hackathon-project-3a9c3.appspot.com",
  messagingSenderId: "22031051113",
  appId: "1:22031051113:web:d403cf4cb67506e98435f8",
  measurementId: "G-4139CZRM3X"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

console.log("Firebase app:", app);
console.log("Firestore DB:", db);

export default function FirebaseUI() {
  const { getToken, userId, isSignedIn } = useAuth();
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [userForms, setUserForms] = useState([]);
  const [editingForm, setEditingForm] = useState(null);

  // Sign in with Clerk
  const signInWithClerk = async () => {
    try {
      const token = await getToken({ template: "integration_firebase" });
      if (token) {
        await signInWithCustomToken(auth, token);
      } else {
        console.error("Failed to get token.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingForm) {
        await updateDoc(doc(db, "forms", editingForm.id), {
          ...formData,
          updatedAt: new Date(),
        });
        setEditingForm(null);
      } else {
        await addDoc(collection(db, "forms"), {
          ...formData,
          userId: userId,
          createdAt: Timestamp.now(),
        });
      }
      setFormData({ title: '', description: '' });
      fetchUserForms(); // Fetch after form submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  // Fetch user forms from Firestore
  const fetchUserForms = async () => {
    if (!userId) return;
    try {
      console.log('Fetching user forms...');
      const q = query(collection(db, "forms"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt instanceof Timestamp) ? doc.data().createdAt.toDate() : new Date()
      }));
      console.log('Fetched data:', data); // Log fetched data
      setUserForms(data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  // Handle form editing
  const handleEdit = (form) => {
    setEditingForm(form);
    setFormData({ title: form.title, description: form.description });
  };

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log('User authenticated:', user.uid); // Log authenticated user
        fetchUserForms();
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch forms when userId changes
  useEffect(() => {
    if (userId) {
      fetchUserForms();
    }
  }, [userId]);

  return (
    <main style={styles.container}>
      <h1 style={styles.header}>Firebase Integration</h1>
      {!isSignedIn ? (
        <button onClick={signInWithClerk} style={styles.button}>Sign In</button>
      ) : (
        <>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.formTitle}>{editingForm ? 'Edit Form' : 'Submit New Form'}</h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
              style={styles.input}
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
              style={styles.textarea}
            />
            <button type="submit" style={styles.submitButton}>
              {editingForm ? 'Update Form' : 'Submit Form'}
            </button>
          </form>

          <div style={styles.formsContainer}>
            <h2 style={styles.subHeader}>Your Forms</h2>
            {userForms.length > 0 ? (
              userForms.map((form) => (
                <div key={form.id} style={styles.formCard}>
                  <h3 style={styles.formTitle}>{form.title}</h3>
                  <p style={styles.formDescription}>{form.description}</p>
                  <p style={styles.formDate}>Created at: {new Date(form.createdAt).toLocaleString()}</p>
                  <button onClick={() => handleEdit(form)} style={styles.editButton}>Edit</button>
                </div>
              ))
            ) : (
              <p>No forms found.</p>
            )}
          </div>
        </>
      )}
    </main>
  );
}

// Styles for the component
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    fontFamily: "'Arial', sans-serif",
    color: "#333"
  },
  header: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    marginBottom: "1rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
  form: {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
  },
  formTitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  textarea: {
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    minHeight: "100px",
  },
  submitButton: {
    padding: "0.75rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
  formsContainer: {
    width: "100%",
    maxWidth: "600px",
    marginTop: "2rem",
  },
  formCard: {
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)"
  },
  formDescription: {
    marginBottom: "0.5rem",
  },
  formDate: {
    fontSize: "0.875rem",
    color: "#666",
  },
  editButton: {
    padding: "0.5rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#ffc107",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
  subHeader: {
    fontSize: "1.25rem",
    marginBottom: "1rem",
  }
};
