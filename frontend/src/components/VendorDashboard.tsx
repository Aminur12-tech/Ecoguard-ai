import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";



export default function VendorDashboard() {
    return (
        <>
            <div className="w-full">
                <Navbar role="vendor" userName="Aminur" />
                <div className="p-4 sm:p-6">Vendor dashboard content</div>
            </div>
        </>
    )
}