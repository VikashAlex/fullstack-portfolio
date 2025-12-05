import Image from "next/image"
import Link from "next/link"
function Logo() {
  return (
    <Link href="/">
    <Image src='/Logo.png' width={54} height={54} property="true" alt="vikashDev-logo"/>
    </Link>
  )
}

export default Logo