import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

class FirestoreService {
  async getAll(collectionName, filters = {}) {
    try {
      const collectionRef = collection(db, collectionName);
      let q = collectionRef;

      // Apply filters
      const constraints = [];
      
      if (filters.published !== undefined) {
        constraints.push(where('published', '==', filters.published));
      }
      
      if (filters.language) {
        constraints.push(where('language', '==', filters.language));
      }
      
      if (filters.tag) {
        constraints.push(where('tags', 'array-contains', filters.tag));
      }

      // Default ordering by creation date
      constraints.push(orderBy('createdAt', 'desc'));

      if (filters.limit) {
        constraints.push(limit(filters.limit));
      }

      if (constraints.length > 0) {
        q = query(collectionRef, ...constraints);
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error getting ${collectionName}:`, error);
      throw error;
    }
  }

  async getBySlug(collectionName, slug) {
    try {
      const q = query(
        collection(db, collectionName),
        where('slug', '==', slug),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      console.error(`Error getting ${collectionName} by slug:`, error);
      throw error;
    }
  }

  async getById(collectionName, id) {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }
      
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } catch (error) {
      console.error(`Error getting ${collectionName} by ID:`, error);
      throw error;
    }
  }

  async create(collectionName, data) {
    try {
      const docData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, collectionName), docData);
      return docRef.id;
    } catch (error) {
      console.error(`Error creating ${collectionName}:`, error);
      throw error;
    }
  }

  async update(collectionName, id, data) {
    try {
      const docRef = doc(db, collectionName, id);
      const updateData = {
        ...data,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(docRef, updateData);
      return true;
    } catch (error) {
      console.error(`Error updating ${collectionName}:`, error);
      throw error;
    }
  }

  async delete(collectionName, id) {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error(`Error deleting ${collectionName}:`, error);
      throw error;
    }
  }
}

export default new FirestoreService();
