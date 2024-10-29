const Header = () => {
  const currentDate = new Date();
  const dateString = `${currentDate.getFullYear()} - ${
    currentDate.getMonth() + 1
  } - ${currentDate.getDate()}`;

  return (
    <div>
      <h1>오늘은</h1>
      <h3>{dateString}</h3>
    </div>
  );
};

export default Header;
