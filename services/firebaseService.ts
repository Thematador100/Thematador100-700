
import { db } from '../firebase';
import { 
    doc, 
    setDoc, 
    getDoc, 
    collection, 
    getDocs, 
    deleteDoc,
} from 'firebase/firestore';
import { Project, SovereignAgent } from '../types';

// Helper for Local Storage Keys
const LOCAL_PROJECTS_KEY = (userId: string) => `local_projects_${userId}`;
const LOCAL_WORKFORCE_KEY = (userId: string) => `local_workforce_${userId}`;

// --- Projects ---

export const saveProjectToFirestore = async (userId: string, project: Project) => {
    // 1. Firebase Mode
    if (db && userId) {
        try {
            const projectRef = doc(db, 'users', userId, 'projects', project.id);
            await setDoc(projectRef, project);
            return;
        } catch (error) {
            console.error("Firebase save failed, falling back to local:", error);
        }
    }

    // 2. Local Storage Mode (Fallback)
    try {
        const key = LOCAL_PROJECTS_KEY(userId || 'guest');
        const existing = localStorage.getItem(key);
        const projects = existing ? JSON.parse(existing) : [];
        
        // Update or Add
        const index = projects.findIndex((p: Project) => p.id === project.id);
        if (index >= 0) {
            projects[index] = project;
        } else {
            projects.push(project);
        }
        
        localStorage.setItem(key, JSON.stringify(projects));
        console.log("Project saved to Local Storage");
    } catch (e) {
        console.error("Local Storage save failed", e);
    }
};

export const getProjectsFromFirestore = async (userId: string): Promise<Project[]> => {
    let firebaseProjects: Project[] = [];
    let localProjects: Project[] = [];

    // 1. Fetch from Firebase
    if (db && userId) {
        try {
            const projectsRef = collection(db, 'users', userId, 'projects');
            const querySnapshot = await getDocs(projectsRef);
            querySnapshot.forEach((doc) => {
                firebaseProjects.push(doc.data() as Project);
            });
        } catch (error) {
            console.warn("Could not fetch from Firebase (offline mode active)");
        }
    }

    // 2. Fetch from Local Storage
    try {
        const key = LOCAL_PROJECTS_KEY(userId || 'guest');
        const existing = localStorage.getItem(key);
        if (existing) {
            localProjects = JSON.parse(existing);
        }
    } catch (e) {
        console.error("Local Storage read failed", e);
    }

    // 3. Merge (Prefer Local if ID conflicts for offline editing, but generally just combine)
    // For simplicity in this hybrid model, we return a combination, removing duplicates by ID
    const allProjects = [...firebaseProjects, ...localProjects];
    const uniqueProjects = Array.from(new Map(allProjects.map(item => [item.id, item])).values());

    return uniqueProjects.sort((a, b) => b.timestamp - a.timestamp);
};

export const deleteProjectFromFirestore = async (userId: string, projectId: string) => {
    // 1. Try Firebase
    if (db && userId) {
        try {
            const projectRef = doc(db, 'users', userId, 'projects', projectId);
            await deleteDoc(projectRef);
        } catch (error) {
            console.warn("Firebase delete failed or skipped");
        }
    }

    // 2. Try Local Storage
    try {
        const key = LOCAL_PROJECTS_KEY(userId || 'guest');
        const existing = localStorage.getItem(key);
        if (existing) {
            let projects = JSON.parse(existing);
            projects = projects.filter((p: Project) => p.id !== projectId);
            localStorage.setItem(key, JSON.stringify(projects));
        }
    } catch (e) {
        console.error("Local delete failed", e);
    }
};

// --- Agents / Command Center ---

export const saveAgentsToFirestore = async (userId: string, agents: SovereignAgent[]) => {
    // 1. Firebase Mode
    if (db && userId) {
        try {
            const workforceRef = doc(db, 'users', userId, 'data', 'workforce');
            await setDoc(workforceRef, { agents: agents }, { merge: true });
        } catch (error) {
            console.error("Firebase agent save failed", error);
        }
    }

    // 2. Local Storage Mode
    try {
        const key = LOCAL_WORKFORCE_KEY(userId || 'guest');
        localStorage.setItem(key, JSON.stringify(agents));
    } catch (e) {
        console.error("Local agent save failed", e);
    }
};

export const getAgentsFromFirestore = async (userId: string): Promise<SovereignAgent[]> => {
    // 1. Try Firebase
    if (db && userId) {
        try {
            const workforceRef = doc(db, 'users', userId, 'data', 'workforce');
            const docSnap = await getDoc(workforceRef);
            if (docSnap.exists()) {
                return docSnap.data().agents as SovereignAgent[];
            }
        } catch (error) {
            console.warn("Firebase agent fetch failed, trying local");
        }
    }

    // 2. Try Local Storage
    try {
        const key = LOCAL_WORKFORCE_KEY(userId || 'guest');
        const existing = localStorage.getItem(key);
        if (existing) {
            return JSON.parse(existing) as SovereignAgent[];
        }
    } catch (e) {
        console.error("Local agent read failed", e);
    }

    return [];
};
