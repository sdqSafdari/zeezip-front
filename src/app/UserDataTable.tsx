"use client"
import {useState, useEffect} from "react";

export default function UserDataTable(props){
    let [data,setData] = useState();
    useEffect(()=> {
        fetch("http://192.168.8.103/mock/student.json").then(res => res.json()).then(data => setData(data));
    },[]);
    return (
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