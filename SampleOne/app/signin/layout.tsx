import React, { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
    return (
        <>
        <div className="border-b text-center">
            20% off for the next 3 days
        </div>
        { children }
        </>
    );
}
    