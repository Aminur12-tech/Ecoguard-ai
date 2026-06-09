import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";



export default function AdminDashboard() {
    return (
        <>
            <div className="w-full">
                <Navbar role="admin" userName="Aminur" />
                <div className="p-4 sm:p-6">Admin dashboard content</div>
            </div>
        </>
    )
}