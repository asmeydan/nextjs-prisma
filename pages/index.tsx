import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import axios from "axios";

export default function Home({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className=" h-screen flex flex-col justify-around items-center bg-sky-200">
      <form
        className=" flex flex-col gap-2 w-full px-5 sm:px-20 md:px-40 lg:px-60"
        onSubmit={(e) => {
          axios
            .post("nextjs-prisma-inky.vercel.app/api/users", {name: name, email: email})
            .then((response) => console.log(response.data))
            .catch((error) => console.error(error));
        }}
      >
        <input
          type="text"
          placeholder="name"
          className=" px-3 rounded-xl h-8 md:h-16 w-full border-2 border-black"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          className=" px-3 rounded-xl h-8 md:h-16 w-full border-2 border-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className=" bg-violet-300 rounded-xl h-8 md:h-16 w-full border-2 border-black"
        >
          Kullanıcı Ekle
        </button>
      </form>

      <ul className=" w-full h-1/2 overflow-auto flex flex-col items-center px-5 sm:px-20 md:px-40 lg:px-60 gap-5">
        {users.map((e) => (
          <li
            key={`${e.id}`}
            className={`w-full h-8 md:h-16 rounded-xl md:rounded-3xl flex items-center justify-center shrink-0 text-xl font-bold border border-black`}
            style={{background:`hsl(${Math.floor(Math.random() * 360)} 100% 75%)`}}
          >
            {e.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

type Users = {
  address: string | null;
  email: string;
  id: string;
  name: string;
};

export async function getStaticProps() {
  const res = await fetch("nextjs-prisma-inky.vercel.app/api/users");
  const users: Users[] = await res.json();

  return {
    props: {
      users: users,
    },
  };
}
