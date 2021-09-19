import {ParallaxBanner, ParallaxProvider} from 'react-scroll-parallax';
import styles from "../styles/homepage.module.css";
const parallax = () => {
  return (
    <body className={styles.homepage1}>
      <ParallaxProvider>
      <ParallaxBanner
    className="your-class"
    layers={[
        {
            image: 'https://via.placeholder.com/500.png',
            amount: 0.6,
        }
    ]}
    style={{
        height: '500px',
    }}
>
    <h1>Banner Children</h1>
</ParallaxBanner>
</ParallaxProvider>
<h1>Banner Children</h1>

<h1>Banner Children</h1>

<h1>Banner Children</h1>
<h1>Banner Children</h1>
<h1>Banner Children</h1>
<h1>Banner Children</h1>
<h1>Banner Children</h1>
<h1>Banner Children</h1>
<h1>Banner Children</h1>
<h1>Banner Children</h1>
<h1>Banner Children</h1>
<h1>Banner Children</h1>
<h1>Banner Children</h1>
<h1>Banner Children</h1>
<h1>Banner Children</h1>
<h1>Banner Children</h1>
<h1>Banner Children</h1>

    </body>
  );
}

export default parallax;