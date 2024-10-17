"use client"
import {useState, useEffect} from "react";
import {QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";

export default function UserDataTable(props){
    console.log("USER_DATA_TABLE re-renders!");
    const queryClient:QueryClient = useQueryClient();
    const {data} = useQuery({
        queryKey: ['userData'],
        queryFn: () => fetch("http://192.168.8.103/mock/student.json",{cache:'no-store'}).then(res => res.json())
    });
    return (
        <>
        <table className="table-auto border border-slate-900">
            <thead>
            <tr>
                <th>name</th>
                <th>age</th>
                <th>level</th>
            </tr>
            </thead>
            <tbody>
            {generateTableRow(data)}
            </tbody>
        </table>
        <div>
            {queryClient.getQueryCache().getAll().map((value, index, array) => <h2
                key={value.queryHash}>{JSON.stringify(value)}</h2>)}
        </div>
        </>
    );
}

function generateTableRow(userData){
    if (userData){
      return (<tr>
          <td>{userData.name}</td>
          <td>{userData.age}</td>
          <td>{userData.level}</td>
      </tr>);
    } else {
        return null;
    }
}