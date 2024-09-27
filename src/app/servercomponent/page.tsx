import {promises as fs} from 'fs';
import sanitizeHtml from 'sanitize-html';
import {marked} from 'marked';
export default async function serverComponent() {
    const data = await fetch("http://localhost/mock/student.json",{cache:'no-store'}).then(res => res.json());
    const doc= await fs.readFile('src/app/servercomponent/README.md');

    return (
        <>
            <h2>React Server Component!</h2>
            <button className="border">{data.name}</button>
            <div dangerouslySetInnerHTML={{__html: sanitizeHtml(marked.parse(doc.toString()))}}></div>
        </>
    );
}