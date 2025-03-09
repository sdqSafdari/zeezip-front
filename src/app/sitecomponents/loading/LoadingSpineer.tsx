
import styles from './loading.module.css';
import {cn} from "@/lib/utils";
export default function LoadingSpinner({className}){
 return <span className={cn(styles.loader,'p-2 border-8',className)}/>
}