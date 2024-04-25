import styles from "@/app/css/loading.module.css"

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )
}

export default Loading
