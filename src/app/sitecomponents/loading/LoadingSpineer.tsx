
import styles from './loading.module.css';
import {cn} from "@/lib/utils";
export default function LoadingSpinner({className}){
 return <span className={cn(styles.loader,'p-2 border-8 border-b-green-700 border-t-green-700',className)}/>
}