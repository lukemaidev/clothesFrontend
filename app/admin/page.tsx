"use client"

import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export default function AdminPage() {
    
    const { userName, userinfo} = useAppContext();
    useEffect(() => {
        // This is a side effect, it will run when the component mounts
        // You can use this to fetch data, set up subscriptions, or manually change the DOM
        // You can also return a function to clean up the side effect
        // This is called a cleanup function
        
        
        return () => {
            // This is the cleanup function
            // It will run when the component unmounts
            // You can use this to clean up subscriptions, or any other side effects
        };
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {userinfo.userType === "admin" ? <div>Welcome, {userName}</div> : <div>Sorry, you are not authorized to view this page</div>}
      </main>
    );
}