import { memo } from 'react';
import styles from './Logo.module.css';

export const Logo = memo(() => {
  return (
    <div className={styles.logoWrapper}>
      <svg
        className={styles.logoIcon}
        viewBox="0 0 235 235"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-describedby="companyLogoTitle companyLogoDescription"
      >
        <title id="companyLogoTitle">Company logo</title>{' '}
        <desc id="companyLogoDescription">FakeShop logo presenting a shopping basket.</desc>
        <path d="M193.324 58.75H173.726V68.5264C173.726 79.3125 164.959 88.125 154.127 88.125C143.341 88.125 134.528 79.3584 134.528 68.5264V58.75H95.377V68.5264C95.377 79.3125 86.6104 88.125 75.7784 88.125C64.9922 88.125 56.1797 79.3584 56.1797 68.5264V58.75H36.6729C36.6729 156.651 26.8965 235 26.8965 235H203.147C203.101 235 193.324 156.651 193.324 58.75V58.75ZM75.8242 78.3486C81.2403 78.3486 85.6006 73.9883 85.6006 68.5723V48.9736C85.6006 32.7256 98.7276 19.5986 114.976 19.5986C131.224 19.5986 144.351 32.7256 144.351 48.9736V68.5723C144.351 73.9883 148.711 78.3486 154.127 78.3486C159.543 78.3486 163.903 73.9883 163.903 68.5723V48.9736C163.949 21.9395 142.01 0 114.976 0C87.9414 0 66.002 21.9395 66.002 48.9736V68.5723C66.0479 73.9424 70.4082 78.3486 75.8242 78.3486V78.3486Z" />
      </svg>

      <div className={styles.logoText}>
        <h1 className={styles.logoHeading}>
          <span className={styles.logoHeadingHighlight}>Fake</span>
          Shop
        </h1>
        <p className={styles.logoSubheading}>by Sebastian Matysiak</p>
      </div>
    </div>
  );
});
