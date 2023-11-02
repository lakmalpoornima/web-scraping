import React from "react";

export default function Table(){
    return (
        <div>
            <h1>Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Postal Code</th>
                        <th>About</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Rows with 12 columns go here */}
                </tbody>
            </table>
        </div>
    );
}