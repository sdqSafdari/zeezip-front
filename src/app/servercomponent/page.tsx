import {promises as fs} from 'fs';
export default async function serverComponent() {
    const data = await fetch("http://192.168.8.103/mock/student.json").then(res => res.json());
    const doc= await fs.readFile('README.md');
    return (
        <>
            <h2>React Server Component!</h2>
            <button className="border">{data.name}</button>
        </>
    );
}