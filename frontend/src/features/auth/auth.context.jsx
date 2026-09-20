import { createContext , useState ,useEffect} from "react";
import { getme } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    return  (
        //Everything inside this Provider can access these values."
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {/* //children is a special React prop that represents whatever you put between the opening and closing tags of a component */}
            {children}
        </AuthContext.Provider>
    )
}

//code meaning
// AuthContext
//      │
//      │ provides
//      ▼
// ┌─────────────────────────┐
// │ user                    │
// │ setUser                 │
// │ loading                 │
// │ setLoading               │
// └─────────────────────────┘
//      │
//      ▼
//    children