import Button from "../components/Button";
import styles from "@/app/css/shimmer.module.css"

function reviewSkeleton() {
  return (
    <div>
      <div className="flex">
        <div>
          <Button className={`btn btn-primary my-3 btn-disabled ${styles.shimmer}`}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Button>
        </div>
        
        <div>
          <Button type="loading" className={`ms-3 btn btn-accent mt-3 btn-disabled ${styles.shimmer}`}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
          </Button>
        </div>
      </div>

      <div>

        <div className={`bg-slate-200 p-4 rounded-md w-[80%] mx-auto h-64 ${styles.shimmer}`}>
          
        </div>


      </div>
    </div>
  );
}

export default reviewSkeleton
