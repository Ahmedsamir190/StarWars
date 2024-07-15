import Image from "next/image";

export default function Home(props) {
  const categories = props.categories;
  console.log(categories);

  return (
    <main className={``}>
      <section>
        <div>
          <p>welcome to starwars </p>
          <ul>
            <li>
              {categories.map((category, index) => {
                return <li key={index}>{category}</li>;
              })}
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://swapi.dev/api");
  const data = await res.json();
  return {
    props: {
      categories: data,
    },
  };
}
