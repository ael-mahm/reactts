import './FooterStyle.css';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      {year} &nbsp; &copy; &nbsp; FT_Trencendance
    </footer>
    
  )
}

export default Footer


