const Footer = () => {
  const d = new Date();
  const year = d.getFullYear();
  return (
    <div className="bg-sand w-full p-3 text-center text-metal">
      {year} Copyright Metamatch
    </div>
  );
};

export default Footer;
