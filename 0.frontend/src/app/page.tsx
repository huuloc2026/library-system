import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const socials = [{ id: 1, name: "Facebook",url:'/facebook' },
    { id: 2, name: "Youtube", url: '/youtube' }, { id: 3, name: "Tiktok", url: '/tiktok' }
  ]
  return (
    <>
      {socials.map((social) => {
        return <ul>
          <li key={social.id}>
            <Link href={social.url}>{social.name}</Link>
          </li>
        </ul>
      })}
    </>
  );
}
