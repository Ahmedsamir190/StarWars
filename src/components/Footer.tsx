function Footer() {
  let date = new Date().getFullYear();
  return (
    <footer className="bg-slate-700 text-white py-3 text-center border-t">
      <span>&copy;</span> {date} StarWars- All rights reserved
    </footer>
  );
}

export default Footer;
