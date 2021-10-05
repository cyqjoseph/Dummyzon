import Link from "next/link";
import { useRouter } from "next/router";
function Settings() {
  const router = useRouter();
  console.log(router);
  const path = router.pathname;
  return (
    <div className="dummy">
      <Link href={`${path}/change-password`}>Change Password</Link>
      <Link href={`${path}/update-information`}>Update information</Link>
    </div>
  );
}

export default Settings;
