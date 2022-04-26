import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const fetchMessage = useCallback(({ msg }) => {
        return setErrorMessage(msg);
    }, []);
    useEffect(() => {
        const authenticate = () => {
            localStorage.getItem("token") == null || localStorage.getItem("user") == null
                ? setIsAuthenticated(false)
                : setIsAuthenticated(true)
        };
        (async () => {
            await authenticate();
        })();
    }, [fetchMessage]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, errorMessage }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};
